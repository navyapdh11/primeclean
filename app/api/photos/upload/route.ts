export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { z } from 'zod';

const uploadSchema = z.object({
  bookingId: z.string().uuid().optional(),
  type: z.enum(['before', 'after', 'staff_verification', 'quality_report', 'damage_report']).default('after'),
  altText: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bookingId = formData.get('bookingId') as string | undefined;
    const type = formData.get('type') as string || 'after';
    const altText = formData.get('altText') as string | undefined;
    const notes = formData.get('notes') as string | undefined;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File must be less than 10MB' }, { status: 400 });
    }

    const validated = uploadSchema.parse({ bookingId, type, altText, notes });
    const imageBuffer = Buffer.from(await file.arrayBuffer());

    const photoRecord = {
      booking_id: validated.bookingId || null,
      staff_id: user.id,
      type: validated.type,
      status: 'processing' as const,
      file_name: file.name,
      file_size: imageBuffer.length,
      mime_type: file.type,
      alt_text: validated.altText,
      notes: validated.notes,
      uploaded_by: user.id,
    };

    const { data: photo, error: insertError } = await supabase
      .from('photos')
      .insert(photoRecord)
      .select()
      .single();

    if (insertError || !photo) {
      return NextResponse.json({ error: 'Failed to create photo record' }, { status: 500 });
    }

    try {
      // Dynamic import of sharp for runtime only
      const sharp = (await import('sharp')).default;

      const optimized = await sharp(imageBuffer)
        .rotate()
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, progressive: true })
        .toBuffer();

      const thumbnail = await sharp(optimized)
        .resize(400, 400, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toBuffer();

      const metadata = await sharp(optimized).metadata();

      const mainPath = `${user.id}/${photo.id}.jpg`;
      const thumbPath = `${user.id}/${photo.id}-thumb.jpg`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(mainPath, optimized, { contentType: 'image/jpeg', upsert: true });
      if (uploadError) throw uploadError;

      const { error: thumbError } = await supabase.storage
        .from('photos')
        .upload(thumbPath, thumbnail, { contentType: 'image/jpeg', upsert: true });
      if (thumbError) throw thumbError;

      const { data: mainUrlData } = supabase.storage.from('photos').getPublicUrl(mainPath);
      const { data: thumbUrlData } = supabase.storage.from('photos').getPublicUrl(thumbPath);

      await supabase
        .from('photos')
        .update({
          url: mainUrlData.publicUrl,
          thumbnail_url: thumbUrlData.publicUrl,
          file_size: optimized.length,
          width: metadata.width,
          height: metadata.height,
          mime_type: 'image/jpeg',
          status: 'ready',
        })
        .eq('id', photo.id);

      return NextResponse.json({
        success: true,
        photo: {
          id: photo.id,
          url: mainUrlData.publicUrl,
          thumbnail_url: thumbUrlData.publicUrl,
          file_size: optimized.length,
          width: metadata.width,
          height: metadata.height,
          type: validated.type,
          alt_text: validated.altText,
        },
      });
    } catch (processingError) {
      await supabase
        .from('photos')
        .update({ status: 'failed', notes: (processingError as Error).message })
        .eq('id', photo.id);

      return NextResponse.json({ error: 'Photo processing failed', photo_id: photo.id }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }
    console.error('Photo upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

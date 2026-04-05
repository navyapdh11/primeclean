export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { z } from 'zod';

const editSchema = z.object({
  photoId: z.string().uuid(),
  crop: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }).optional(),
  rotation: z.number().optional(),
  flipHorizontal: z.boolean().optional(),
  flipVertical: z.boolean().optional(),
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

    const body = await request.json();
    const validated = editSchema.parse(body);

    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('*')
      .eq('id', validated.photoId)
      .single();

    if (fetchError || !photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    const response = await fetch(photo.url);
    const imageBuffer = Buffer.from(await response.arrayBuffer());

    const sharp = (await import('sharp')).default;

    let pipeline = sharp(imageBuffer);
    if (validated.flipHorizontal) pipeline = pipeline.flop();
    if (validated.flipVertical) pipeline = pipeline.flip();
    if (validated.rotation) pipeline = pipeline.rotate(validated.rotation);
    if (validated.crop) {
      const { x, y, width, height } = validated.crop;
      pipeline = pipeline.extract({
        left: Math.round(x),
        top: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
      });
    }

    const edited = await pipeline.jpeg({ quality: 90, progressive: true }).toBuffer();
    const thumbnail = await sharp(edited).resize(400, 400, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
    const metadata = await sharp(edited).metadata();

    const editedPath = `${user.id}/${photo.id}-edited-${Date.now()}.jpg`;
    const thumbPath = `${user.id}/${photo.id}-edited-thumb-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(editedPath, edited, { contentType: 'image/jpeg', upsert: true });
    if (uploadError) throw uploadError;

    const { error: thumbError } = await supabase.storage
      .from('photos')
      .upload(thumbPath, thumbnail, { contentType: 'image/jpeg', upsert: true });
    if (thumbError) throw thumbError;

    const { data: mainUrlData } = supabase.storage.from('photos').getPublicUrl(editedPath);
    const { data: thumbUrlData } = supabase.storage.from('photos').getPublicUrl(thumbPath);

    const editConfig = {
      crop: validated.crop,
      rotation: validated.rotation,
      flip_horizontal: validated.flipHorizontal,
      flip_vertical: validated.flipVertical,
      edited_at: new Date().toISOString(),
      edited_by: user.id,
    };

    await supabase
      .from('photos')
      .update({
        url: mainUrlData.publicUrl,
        thumbnail_url: thumbUrlData.publicUrl,
        file_size: edited.length,
        width: metadata.width,
        height: metadata.height,
        edit_config: editConfig,
      })
      .eq('id', validated.photoId);

    return NextResponse.json({
      success: true,
      photo: {
        id: validated.photoId,
        url: mainUrlData.publicUrl,
        thumbnail_url: thumbUrlData.publicUrl,
        file_size: edited.length,
        width: metadata.width,
        height: metadata.height,
        edit_config: editConfig,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }
    console.error('Photo edit failed:', error);
    return NextResponse.json({ error: 'Edit failed' }, { status: 500 });
  }
}

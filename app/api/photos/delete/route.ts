export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('photoId');

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 });
    }

    const { data: photo } = await supabase
      .from('photos')
      .select('url, thumbnail_url')
      .eq('id', photoId)
      .eq('uploaded_by', user.id)
      .single();

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete from Supabase Storage (best effort)
    try {
      const paths: string[] = [];
      if (photo.url) {
        const path = photo.url.split('/').pop();
        if (path) paths.push(`${user.id}/${path}`);
      }
      if (photo.thumbnail_url) {
        const path = photo.thumbnail_url.split('/').pop();
        if (path) paths.push(`${user.id}/${path}`);
      }
      if (paths.length > 0) {
        await supabase.storage.from('photos').remove(paths);
      }
    } catch {
      // Best effort deletion
    }

    await supabase.from('photos').delete().eq('id', photoId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Photo delete failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getFileStream, getFile } from '@/lib/drive';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // First get metadata to set proper headers
    const metadata = await getFile(id);
    const stream = await getFileStream(id);
    
    // Set headers for download
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(metadata.name)}"`);
    headers.set('Content-Type', metadata.mimeType || 'application/octet-stream');
    if (metadata.size) {
      headers.set('Content-Length', metadata.size);
    }

    return new NextResponse(stream as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`[GET /api/files/[id]] Error:`, error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}

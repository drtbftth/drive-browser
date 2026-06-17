import { NextResponse } from 'next/server';
import { getFiles } from '@/lib/drive';

export const revalidate = 60; // Cache for 60 seconds (ISR)

export async function GET() {
  try {
    const data = await getFiles();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/files] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
  }
}

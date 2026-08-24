import { NextResponse } from 'next/server';
import { getStoredMemories } from '@/lib/serverStore';

export async function GET() {
  try {
    const memories = await getStoredMemories();
    return NextResponse.json({ success: true, data: memories });
  } catch (error) {
    console.error('Failed to fetch memories', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch memories' }, { status: 500 });
  }
}

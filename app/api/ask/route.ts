import { NextResponse } from 'next/server';
import { getQAResponse } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Question string is required' },
        { status: 400 }
      );
    }

    const qaResult = getQAResponse(question);

    return NextResponse.json({
      success: true,
      data: qaResult
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process question query' },
      { status: 500 }
    );
  }
}

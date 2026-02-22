// API Route for debate execution
import { NextRequest, NextResponse } from 'next/server';
import { DebateOrchestrator } from '@/lib/orchestrator';

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json();

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const orchestrator = new DebateOrchestrator();
    const result = await orchestrator.runDebate(topic);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Debate execution error:', error);
    return NextResponse.json(
      { error: 'Failed to execute debate' },
      { status: 500 }
    );
  }
}

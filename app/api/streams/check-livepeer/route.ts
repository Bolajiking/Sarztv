import { NextResponse } from 'next/server';
import { getLivepeerStreams } from '@/lib/video/livepeer-data';

// Prevent caching for this route to ensure fresh status checks
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/streams/check-livepeer
 * Lightweight endpoint for client-side polling of stream status.
 * Returns { isActive: boolean }
 */
export async function GET() {
  try {
    const streams = await getLivepeerStreams();
    // Check if ANY stream is active
    const activeStream = streams.find((s) => s.isActive);
    
    return NextResponse.json({ 
      isActive: !!activeStream,
      streamId: activeStream?.livepeerStreamId || null
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('[API] Stream status check failed:', error);
    return NextResponse.json({ isActive: false, error: 'Check failed' }, { status: 500 });
  }
}


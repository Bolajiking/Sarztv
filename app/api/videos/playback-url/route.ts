import { NextRequest, NextResponse } from 'next/server';
import { getPlaybackUrl, getPlaybackInfoFromAsset, getPlaybackSrc } from '@/lib/video/livepeer-utils';
import type { Src } from '@livepeer/react';

/**
 * GET /api/videos/playback-url?playbackId={playbackId}
 * Fetches the actual playback URL from Livepeer API
 * 
 * Accepts either:
 * - A playback ID (short string like "c266jdxxnqeipqpx")
 * - An asset ID (UUID like "c26606e4-3b0f-4724-a180-2029b2c98bae")
 * 
 * If an asset ID is provided, it will fetch the asset first to get the playback ID.
 */
export async function GET(request: NextRequest) {
  // Set CORS headers for better network compatibility
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=60', // Cache for 60 seconds
  };

  try {
    const searchParams = request.nextUrl.searchParams;
    const playbackIdOrAssetId = searchParams.get('playbackId');
    
    console.log('[Playback URL API] Request received:', { playbackIdOrAssetId });
    
    if (!playbackIdOrAssetId) {
      return NextResponse.json(
        { error: 'playbackId is required' },
        { status: 400, headers }
      );
    }
    
    // Check if this looks like an asset ID (UUID format)
    const isAssetId = playbackIdOrAssetId.includes('-') && playbackIdOrAssetId.length > 20;
    
    let actualPlaybackId = playbackIdOrAssetId;
    let playbackUrl: string | null = null;
    
    if (isAssetId) {
      console.log('[Playback URL API] Detected asset ID, fetching playback info from asset:', playbackIdOrAssetId);
      try {
        const { playbackId, playbackUrl: urlFromAsset } = await getPlaybackInfoFromAsset(playbackIdOrAssetId);
        
        if (playbackId) {
          actualPlaybackId = playbackId;
          console.log('[Playback URL API] Extracted playback ID from asset:', actualPlaybackId);
          
          // If we got the URL from the asset, use it
          if (urlFromAsset) {
            console.log('[Playback URL API] Got playback URL from asset:', urlFromAsset.substring(0, 100));
            const src = await getPlaybackSrc(actualPlaybackId);
            return NextResponse.json({ playbackUrl: urlFromAsset, src });
          }
        } else {
          console.warn('[Playback URL API] Could not extract playback ID from asset:', playbackIdOrAssetId);
        }
      } catch (assetError: any) {
        console.warn('[Playback URL API] Error fetching asset:', {
          error: assetError?.message || String(assetError),
        });
        // Continue to try using the ID directly as playback ID
      }
    }
    
    // Try to get playback sources using the (possibly extracted) playback ID
    console.log('[Playback URL API] Fetching playback sources for:', actualPlaybackId);
    const src = await getPlaybackSrc(actualPlaybackId);
    
    // Prioritize returning the full src array (which includes WebRTC, HLS, MP4, etc.)
    if (src && src.length > 0) {
      console.log('[Playback URL API] Successfully fetched', src.length, 'playback sources');
      
      // Try to extract a playback URL from the sources for backward compatibility
      const hlsSource = src.find((s: any) => 
        s.type === 'application/vnd.apple.mpegurl' || 
        s.type === 'application/x-mpegURL'
      );
      playbackUrl = hlsSource?.src || null;
      
      return NextResponse.json({ src, playbackUrl }, { headers });
    }
    
    // No valid sources - return direct CDN fallbacks as last resort
    console.warn('[Playback URL API] No valid playback sources, returning CDN fallbacks for:', actualPlaybackId);
    const fallbackSources: Src[] = [
      { src: `https://livepeercdn.studio/hls/${actualPlaybackId}/index.m3u8`, type: 'hls' },
    ];
    
    return NextResponse.json(
      { 
        src: fallbackSources,
        playbackUrl: fallbackSources[0].src,
        note: 'Using direct CDN fallback URLs',
      },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('[Playback URL API] Error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : String(error),
      },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}


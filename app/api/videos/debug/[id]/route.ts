import { NextRequest, NextResponse } from 'next/server';
import { getLivepeerAsset, getPlaybackInfoFromAsset, getPlaybackSrc } from '@/lib/video/livepeer-utils';
import { getSupabaseAdmin } from '@/lib/supabase/server';

/**
 * Debug endpoint to check video playback status
 * GET /api/videos/debug/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    // 1. Check Supabase record
    const { data: videoRecord, error: dbError } = await supabase
      .from('videos')
      .select('*')
      .or(`id.eq.${id},livepeer_asset_id.eq.${id}`)
      .maybeSingle();

    if (dbError) {
      return NextResponse.json({
        error: 'Database error',
        details: dbError.message,
      }, { status: 500 });
    }

    if (!videoRecord) {
      return NextResponse.json({
        error: 'Video not found in database',
        id,
      }, { status: 404 });
    }

    // 2. Check Livepeer Asset
    let livepeerAsset = null;
    let assetError = null;
    try {
      livepeerAsset = await getLivepeerAsset(videoRecord.livepeer_asset_id);
    } catch (e: any) {
      assetError = e.message || String(e);
    }

    // 3. Check Playback Info
    let playbackInfo = null;
    let playbackError = null;
    try {
      playbackInfo = await getPlaybackInfoFromAsset(videoRecord.livepeer_asset_id);
    } catch (e: any) {
      playbackError = e.message || String(e);
    }

    // 4. Try to generate playback sources
    let playbackSources = null;
    let sourcesError = null;
    if (playbackInfo?.playbackId) {
      try {
        playbackSources = await getPlaybackSrc(playbackInfo.playbackId);
      } catch (e: any) {
        sourcesError = e.message || String(e);
      }
    }

    // Build diagnostic report
    return NextResponse.json({
      videoId: id,
      database: {
        found: true,
        status: videoRecord.status,
        title: videoRecord.title,
        livepeer_asset_id: videoRecord.livepeer_asset_id,
        thumbnail_url: videoRecord.thumbnail_url,
        is_free: videoRecord.is_free,
        created_at: videoRecord.created_at,
      },
      livepeerAsset: livepeerAsset ? {
        found: true,
        id: livepeerAsset.id,
        status: livepeerAsset.status?.phase || livepeerAsset.status,
        hasPlaybackId: !!(livepeerAsset.playbackId || livepeerAsset.playbackIds),
        playbackIds: livepeerAsset.playbackIds || livepeerAsset.playbackId,
      } : {
        found: false,
        error: assetError,
      },
      playbackInfo: playbackInfo ? {
        found: true,
        playbackId: playbackInfo.playbackId,
        hasPlaybackUrl: !!playbackInfo.playbackUrl,
      } : {
        found: false,
        error: playbackError,
      },
      playbackSources: playbackSources ? {
        found: true,
        count: playbackSources.length,
        types: playbackSources.map((s: any) => s.type),
      } : {
        found: false,
        error: sourcesError,
      },
      diagnosis: getDiagnosis(videoRecord, livepeerAsset, playbackInfo, playbackSources),
    });
  } catch (error: any) {
    return NextResponse.json({
      error: 'Debug endpoint error',
      message: error.message || String(error),
      stack: error.stack,
    }, { status: 500 });
  }
}

function getDiagnosis(
  videoRecord: any,
  livepeerAsset: any,
  playbackInfo: any,
  playbackSources: any
): string {
  if (!livepeerAsset) {
    return '❌ CRITICAL: Livepeer asset not found. Video may have been deleted from Livepeer. Try re-uploading.';
  }

  const assetStatus = livepeerAsset.status?.phase || livepeerAsset.status;
  if (assetStatus !== 'ready' && assetStatus !== 'completed') {
    return `⏳ PROCESSING: Video is still being processed by Livepeer (status: ${assetStatus}). Wait 2-5 minutes and try again.`;
  }

  if (!playbackInfo || !playbackInfo.playbackId) {
    return '⚠️ WARNING: Livepeer asset is "ready" but has no playback ID. This is unusual. Check Livepeer dashboard or try re-uploading.';
  }

  if (!playbackSources || playbackSources.length === 0) {
    return '⚠️ WARNING: Playback ID exists but no playback sources are available. The video may need more processing time, or there may be an issue with the Livepeer API.';
  }

  return '✅ OK: Video should be playable. If playback still fails, check browser console for network errors (timeouts, CORS, etc.).';
}


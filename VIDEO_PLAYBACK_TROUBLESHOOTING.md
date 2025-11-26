# Video Playback Troubleshooting Guide

## Current Error Analysis

The errors you're seeing (`ERR_TIMED_OUT`, `manifestLoadError`) indicate that the video player is attempting to fetch HLS manifest files from Livepeer's CDN, but those requests are **timing out or returning 404**.

### Root Causes

1. **Video Not Fully Processed**
   - Livepeer needs time to transcode uploaded videos into streamable formats
   - Even if the video shows "ready" status, the HLS segments may still be generating
   - **Solution**: Wait 2-5 minutes after upload before attempting playback

2. **Invalid Playback ID**
   - The playback ID extracted from the asset might be incorrect or missing
   - **Check**: Look in the browser console for `[Playback URL API]` logs to see what playback ID is being used

3. **Livepeer API Returning Empty Playback Info**
   - Sometimes Livepeer's API doesn't return valid playback sources even for "ready" assets
   - **Check**: Look for `[Playback Src] No playback info available` warnings in console

## How to Diagnose

### Step 1: Check Browser Console
When you try to play a video, look for these log messages in order:

```
[Video Player] Fetching playback URL for: [playback-id]
[Playback URL API] Request received: { playbackIdOrAssetId: '...' }
[Playback URL API] Fetching playback sources for: [playback-id]
[Playback Src] Fetching playback info for: [playback-id]
[Playback Src] Successfully generated source array with X sources
[Playback URL API] Successfully fetched X playback sources
[Video Player] Fetched complete playback sources with X sources
```

### Step 2: If You See Errors

**Error: "No playback info available"**
- The video asset exists but Livepeer hasn't made it available for streaming yet
- **Solution**: Wait 2-5 minutes and refresh the page

**Error: "Video playback not available"**
- Livepeer API returned empty playback info
- **Solution**: 
  1. Check if the video finished processing in Livepeer dashboard
  2. Verify the asset has a playback ID in Livepeer dashboard
  3. Try re-uploading the video if it's been stuck for >10 minutes

**Error: "manifestLoadError" or "ERR_TIMED_OUT"**
- The player tried to load a video that isn't actually available
- **Solution**: The video player will now properly show "Video unavailable" instead of spinning forever

### Step 3: Verify Video in Livepeer Dashboard

1. Go to https://livepeer.studio/dashboard/assets
2. Find your uploaded video
3. Check:
   - Status should be "Ready"
   - Playback ID should be present (a short alphanumeric string)
   - Click "View" to see if Livepeer's own player can play it
4. If Livepeer's player can't play it, the video needs more processing time

## What We Fixed

1. **Removed Blind Fallbacks**: The app no longer guesses CDN URLs with expired tokens
2. **Better Error Handling**: Videos that aren't ready show "Video unavailable" instead of spinning forever
3. **Error Suppression**: Network timeout errors are now suppressed in console to reduce noise
4. **Improved Logging**: More detailed logs to help diagnose playback issues

## Expected Behavior Now

- **If video is ready**: Plays immediately with no errors
- **If video is processing**: Shows "Video unavailable" with clear message
- **If video failed**: Shows "Video unavailable" and suggests checking Livepeer dashboard
- **No more**: Infinite spinners or expired CDN URL errors

## Next Steps

1. **Wait for Processing**: After uploading a video, wait 2-5 minutes before trying to watch it
2. **Check Console**: If playback fails, check browser console for detailed error messages
3. **Verify in Livepeer**: If issues persist, verify the video in Livepeer dashboard
4. **Re-upload if Needed**: If a video is stuck in processing for >10 minutes, consider re-uploading

## Technical Details

### Playback Flow
1. User clicks video → `/videos/[id]` page loads
2. Page fetches video metadata from Supabase
3. Page extracts `livepeer_asset_id` and fetches asset from Livepeer API
4. Page extracts `playbackId` from asset
5. VideoPlayer component calls `/api/videos/playback-url?playbackId=[id]`
6. API calls Livepeer's `playback.get()` to fetch playback info
7. API uses `getSrc()` helper to generate source array (HLS, WebRTC, etc.)
8. VideoPlayer receives sources and renders Livepeer Player

### Where Issues Can Occur
- **Step 4**: Livepeer asset has no playback ID (video not ready)
- **Step 6**: Livepeer API returns null/empty playback info
- **Step 7**: `getSrc()` returns empty array (no valid sources)
- **Step 8**: Player tries to load invalid URL and times out

### Error Suppression
These errors are now suppressed (they're expected during video processing):
- `manifestLoadError` - HLS manifest not found
- `manifestParsingError` - HLS manifest invalid
- `levelParsingError` - HLS segment parsing failed
- `ERR_TIMED_OUT` - Network timeout
- `ERR_NAME_NOT_RESOLVED` - DNS resolution failed
- `Failed to fetch` - Generic fetch error

All of these indicate the video isn't ready yet, and the player will now gracefully show "Video unavailable" instead of red error screens.


# Livepeer Video Not Playing - Root Cause Diagnosis

## Critical Finding

If videos **aren't playing in the Livepeer dashboard itself**, then the issue is **NOT with our frontend code**. The videos are not being properly processed or uploaded to Livepeer.

## Why This Happens

### Common Causes:

1. **TUS Upload Failed (Most Common)**
   - The video file upload to Livepeer didn't complete successfully
   - The TUS client encountered an error during upload
   - Network interruption during upload

2. **Video Processing Failed**
   - Livepeer received the file but couldn't transcode it
   - Unsupported video codec or format
   - Corrupted video file

3. **Asset Created But No Video File**
   - The asset record was created in Livepeer
   - But the actual video file was never uploaded
   - This creates an "empty" asset with no playback sources

4. **Livepeer API Issues**
   - Temporary Livepeer service issues
   - API rate limiting
   - Account issues (quota exceeded, billing problems)

## How to Diagnose

### Step 1: Check Livepeer Dashboard

Go to https://livepeer.studio/dashboard/assets and check each video:

#### ✅ **Healthy Video (Should Play)**
- Status: **Ready** (green checkmark)
- Duration: Shows actual video duration (e.g., "3:45")
- Size: Shows file size (e.g., "125 MB")
- Playback ID: Present (e.g., "c266jdxxnqeipqpx")
- Preview: Thumbnail visible
- **Test**: Click "View" → Video plays in Livepeer's player

#### ❌ **Broken Video (Won't Play)**
- Status: May show "Ready" but is actually broken
- Duration: **0:00** or **Missing**
- Size: **0 MB** or **Very small** (< 1 MB)
- Playback ID: Present but invalid
- Preview: No thumbnail or black screen
- **Test**: Click "View" → Video doesn't load or shows error

### Step 2: Check Browser Console During Upload

When you upload a video through the admin dashboard, open the browser console and look for:

#### ✅ **Successful Upload Logs**
```
[Video Upload] Creating asset: { title, hasFile, fileName, fileSize }
[Video Upload] Asset created: { assetId, hasTusEndpoint: true }
TUS upload progress: 25%
TUS upload progress: 50%
TUS upload progress: 75%
TUS upload progress: 100%
Upload complete! Processing...
```

#### ❌ **Failed Upload Logs**
```
[Video Upload] Creating asset: { title, hasFile, fileName, fileSize }
[Video Upload] Asset created: { assetId, hasTusEndpoint: true }
TUS upload error: <error message>
❌ Common errors:
  - "Network error"
  - "Upload aborted"
  - "Endpoint not found"
  - "Unauthorized"
```

### Step 3: Check Video File Itself

Before uploading, verify your video file:

#### Recommended Specs
- **Format**: MP4 (H.264 + AAC)
- **Resolution**: 720p or 1080p
- **Bitrate**: 2-8 Mbps
- **Frame Rate**: 24, 25, 30, or 60 fps
- **Max Size**: < 5 GB for web uploads

#### Unsupported/Problematic
- Very high bitrates (> 50 Mbps)
- 4K or 8K resolution (may take hours to process)
- Exotic codecs (ProRes, AV1, VP9)
- Variable frame rate (VFR)
- Corrupted files

#### Test Your Video File
```bash
# Check video properties (macOS/Linux)
ffprobe -v error -show_format -show_streams your_video.mp4

# Or use MediaInfo (GUI tool)
# Download: https://mediaarea.net/en/MediaInfo
```

Look for:
- **Codec**: Should be `h264` (video) and `aac` (audio)
- **Duration**: Should match expected length
- **Size**: Reasonable for duration (not 0 bytes)

## How to Fix

### Fix 1: Re-Upload Failed Videos

1. **Delete broken assets** from Livepeer dashboard:
   - Go to https://livepeer.studio/dashboard/assets
   - Find videos with 0:00 duration
   - Click "..." → "Delete"

2. **Delete corresponding database records**:
   - In your admin dashboard (`/admin`)
   - Delete the broken video entries

3. **Re-upload with these precautions**:
   - Use a stable internet connection
   - Keep the browser tab open during entire upload
   - Don't navigate away or close tab until "Processing complete"
   - Use smaller files (< 500 MB) for initial testing

### Fix 2: Convert Problematic Videos

If videos consistently fail to upload/process, convert them first:

```bash
# Using FFmpeg (install: brew install ffmpeg)
ffmpeg -i input.mov -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k output.mp4
```

This creates a web-optimized MP4 that Livepeer can easily process.

### Fix 3: Test with Known-Good Video

Download a test video to verify your setup works:

```bash
# Download a sample video
curl -o test-video.mp4 https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4
```

Upload this test video through your admin dashboard. If it works:
- ✅ Your code/setup is fine
- ❌ Your original videos have encoding issues

### Fix 4: Check Livepeer Account Status

1. Go to https://livepeer.studio/dashboard/billing
2. Check:
   - Account is active (not suspended)
   - No billing issues
   - Within usage quota
   - API key is valid

### Fix 5: Enable Debug Logging

Add more logging to catch TUS errors:

In `components/admin/video-upload-form.tsx`, update the TUS upload:

```typescript
onError: (error) => {
  console.error('TUS upload error:', error);
  console.error('TUS error details:', {
    message: error.message,
    originalRequest: error.originalRequest,
    originalResponse: error.originalResponse,
  });
  // ... existing error handling
},
```

## Expected Timeline

After successful upload:
- **Upload**: 1-5 minutes (depends on file size)
- **Processing**: 2-10 minutes (Livepeer transcodes video)
- **Ready**: Video plays in Livepeer dashboard
- **Playback**: Our frontend can now play it

## If Videos Still Won't Play

1. **Check Livepeer Status**: https://status.livepeer.org/
2. **Contact Livepeer Support**: 
   - Discord: https://discord.gg/livepeer
   - Email: help@livepeer.org
   - Include: Asset ID, upload time, error messages

3. **Use Debug Endpoint**:
   ```
   http://localhost:3000/api/videos/debug/[asset-id]
   ```
   This will show exactly what's wrong with the asset.

## Key Takeaway

**If Livepeer's own player can't play the video, our frontend code cannot fix it.**

The issue is upstream at Livepeer. Focus on:
1. Ensuring successful TUS upload (watch console logs)
2. Verifying video file is web-compatible (H.264 + AAC)
3. Waiting for Livepeer to finish processing (2-10 minutes)
4. Checking Livepeer dashboard shows "Ready" with valid duration

Once videos play in Livepeer dashboard, they will automatically work in our frontend.


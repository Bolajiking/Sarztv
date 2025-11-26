# Fixing Livepeer Jitter Warnings

## What is Jitter?

**Jitter** occurs when your stream's bitrate (data rate) is too high for your internet upload speed or your computer's encoding capabilities. This causes the stream to stutter or buffer for viewers.

**Warning Message:**
> "There is a lot (501 ms) of jitter in the incoming data. This is usually a sign the quality of the stream is too high for either the connection speed and/or the broadcasting device's capabilities."

---

## Quick Fix: Lower Your Bitrate

### Step 1: Check Your Upload Speed

1.  Go to [speedtest.net](https://www.speedtest.net/) and run a test.
2.  Note your **Upload Speed** (e.g., "5 Mbps" or "10 Mbps").
3.  Your OBS bitrate should be **60-70% of your upload speed** to leave headroom.

**Example:**
- Upload Speed: 10 Mbps → Set OBS Bitrate to **6000 Kbps** (6 Mbps)
- Upload Speed: 5 Mbps → Set OBS Bitrate to **3000 Kbps** (3 Mbps)

---

## Step 2: Adjust OBS Settings

1.  Open OBS → **Settings** → **Output**.
2.  Change "Output Mode" to **Advanced**.
3.  Go to the **Streaming** tab.
4.  **Lower the Bitrate:**
    *   If currently **6000+ Kbps** → Try **4000 Kbps**
    *   If currently **4000 Kbps** → Try **3000 Kbps**
    *   If still jittery → Try **2500 Kbps**

5.  **Also Lower Resolution** (if bitrate alone doesn't fix it):
    *   Go to **Settings** → **Video**.
    *   Change **Output (Scaled) Resolution** from `1920x1080` to `1280x720`.
    *   Keep **Base (Canvas) Resolution** at `1920x1080` (so you can still see everything in OBS).

6.  Click **Apply** and **OK**.

---

## Recommended Settings by Upload Speed

| Upload Speed | Bitrate | Resolution | Notes |
|-------------|---------|------------|-------|
| 15+ Mbps | 6000 Kbps | 1080p (1920x1080) | Ideal for high-quality streams |
| 10 Mbps | 4000 Kbps | 1080p (1920x1080) | Good balance |
| 5-8 Mbps | 3000 Kbps | 720p (1280x720) | Most common setup |
| 3-5 Mbps | 2500 Kbps | 720p (1280x720) | Minimum for smooth streaming |
| < 3 Mbps | 2000 Kbps | 720p (1280x720) | May still have issues |

---

## Other Causes of Jitter

### 1. CPU Overload
If your computer is struggling to encode:
- Close other applications (browsers, video editors).
- In OBS → **Settings** → **Output** → **Streaming** → Change **Encoder** from `x264` to **Hardware** (`Apple VT H264` on Mac, `NVENC` on Windows with NVIDIA GPU).

### 2. Network Congestion
- Disconnect other devices from WiFi.
- Use a wired Ethernet connection instead of WiFi (more stable).
- Avoid streaming during peak hours if your internet is shared.

### 3. Multiple Streams
- Don't stream to multiple platforms simultaneously (e.g., YouTube + CCI TV at the same time) unless you have very fast upload.

---

## Testing Your Settings

1.  Start streaming in OBS.
2.  Wait 30 seconds.
3.  Check the Livepeer Dashboard for warnings.
4.  If jitter warning persists, lower bitrate by 500-1000 Kbps and try again.

---

## Quality vs. Stability Trade-off

**Remember:** A stable 720p stream is better than a stuttering 1080p stream. Your viewers will appreciate smooth playback over pixel-perfect quality.

---

## Still Having Issues?

If jitter persists even at low bitrates (2000 Kbps):
1.  Check for background uploads (cloud backups, file syncs).
2.  Test on a different network (mobile hotspot) to rule out ISP issues.
3.  Consider using a dedicated streaming PC or hardware encoder (e.g., ATEM Mini).


# CCI TV: OBS Sources & Scene Setup Guide

This guide explains how to set up your audio and video sources in OBS Studio for a professional church livestream.

---

## Understanding "Scenes" vs "Sources"

*   **Scenes:** Think of these as "layouts" or "presets" (e.g., "Pre-Service", "Worship", "Sermon"). You can switch between them with one click.
*   **Sources:** These are the individual elements inside a scene (e.g., Camera, Mic, Lyrics, Logo).

---

## Standard Church Setup (Recommended)

We recommend creating at least 3 scenes: **Starting Soon**, **Live Service**, and **Ending Soon**.

### 1. Setting up the "Live Service" Scene

This is your main scene where the camera and audio live.

#### Step 1: Add Video (Camera)
1.  In the **Sources** box (bottom center), click the **+** icon.
2.  Select **Video Capture Device**.
3.  Name it "Main Camera" and click OK.
4.  Select your camera (e.g., "Cam Link", "Webcam", or "ATEM Mini") from the **Device** dropdown.
5.  Click OK.

#### Step 2: Add Audio (Mixer/Mic)
*Crucial: Viewers will leave instantly if audio is bad.*
1.  Click the **+** icon in Sources.
2.  Select **Audio Input Capture**.
3.  Name it "Mixer Feed" or "Mic".
4.  Select your audio interface or USB mixer from the dropdown.
5.  Click OK.
    *   *Tip: Watch the "Audio Mixer" bars in the center. When someone speaks, it should hit the **Yellow** zone (-10 to -20 dB). If it hits Red, it's distorting.*

#### Step 3: Add Presentation/Lyrics (ProPresenter/PowerPoint)
1.  Click the **+** icon.
2.  Select **Window Capture** (if running on the same computer) or **Video Capture Device** (if using a second computer with a capture card).
3.  Select the window showing your lyrics or slides.
4.  Use **Alt + Drag** (Option + Drag on Mac) on the red box edges to crop out window borders if needed.

#### Step 4: Add Logo (Watermark)
1.  Click the **+** icon.
2.  Select **Image**.
3.  Browse for your church logo (PNG with transparent background).
4.  Resize it small and place it in a corner.

---

## 2. Setting up "Starting Soon" Scene

Use this for the 5-10 minutes before service starts.

1.  In the **Scenes** box (bottom left), click **+** and name it "Starting Soon".
2.  **Add Background:** Add an **Image** source (a nice welcome graphic).
3.  **Add Music:** Add a **Media Source** (looping video) or play music via Desktop Audio.
4.  **Add Countdown:** (Optional) Use a **Text (GDI+)** source to write "Service starts in 5 mins".

---

## Checklist Before Going Live

1.  **Audio Check:** Is the "Mixer Feed" bar moving? Is it too loud (Red)?
2.  **Video Check:** Is the camera focused?
3.  **Content Check:** Are your lyrics readable?
4.  **Start Stream:** Click "Start Streaming" in OBS 5 minutes early to ensure stable connection.


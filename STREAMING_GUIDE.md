# CCI TV Streaming Guide

This guide outlines the step-by-step process for an Admin user to start a live broadcast using **OBS Studio** (Open Broadcaster Software) and the CCI TV platform.

## Prerequisites

1.  **OBS Studio Installed:** Download from [obsproject.com](https://obsproject.com/).
2.  **Admin Access:** You must be logged into CCI TV as an admin user.

---

## Step 1: Create the Stream on CCI TV

1.  Navigate to the **Admin Dashboard** (`/admin`).
2.  Click on the **"Create Stream"** tab.
3.  Enter the **Title** (e.g., "Sunday Service - 9AM") and **Description**.
4.  Check **"Record this session"** if you want it saved to the Video Library automatically.
5.  Click **"Create Stream"**.

> **Result:** The system will generate a unique **RTMP URL** and **Stream Key**. Keep this page open.

---

## Step 2: Configure OBS Studio

*Do this once (or whenever you change computers).*

1.  Open **OBS Studio**.
2.  Go to **Settings** (bottom right) -> **Output**.
3.  Change "Output Mode" to **Advanced**.
4.  Configure the **Streaming** tab:
    *   **Rate Control:** `CBR`
    *   **Bitrate:** `4000 Kbps` (or higher if your internet allows, e.g., 6000 for 1080p)
    *   **Keyframe Interval:** `2 s` (**CRITICAL** - this prevents the "key frame" warning)
    *   **Profile:** `high` or `main`
    *   **Tune:** `zerolatency` (optional, good for interaction)
5.  Go to the **Stream** tab (left menu).
    *   **Service:** `Custom...`
    *   **Server:** (Paste the **RTMP URL** from the CCI TV Admin Dashboard)
    *   **Stream Key:** (Paste the **Stream Key** from the CCI TV Admin Dashboard)
6.  Click **Apply** and **OK**.

---

## Step 3: Start the Broadcast

1.  In OBS, set up your scenes (Camera, Mic, Slides) as usual.
2.  Click **"Start Streaming"** in OBS (bottom right).
3.  Check the bottom status bar in OBS:
    *   Look for a **Green square** (healthy connection).
    *   Ideally `0 dropped frames`.

---

## Step 4: Verify on CCI TV

1.  Go back to the **CCI TV Admin Dashboard**.
2.  In the "Broadcast Now" player section, wait about **10-20 seconds**.
3.  The video should appear.
    *   *Note: You might see a spinning circle or "Connecting..." initially. This is normal.*

---

## Step 5: Public Viewing

1.  Once you see the video in the Admin Dashboard, it is live for the public.
2.  Navigate to the **Home Page** or **Live Services** page (`/streams`).
3.  You should see the **"Live Service Now"** indicator.

---

## Step 6: Ending the Stream

1.  In OBS, click **"Stop Streaming"**.
2.  The CCI TV player will detect the stream has ended within ~10 seconds and update the status to "Offline" for all viewers.
3.  If you enabled recording, the video will appear in the **Past Services** list after Livepeer finishes processing it (usually a few minutes).


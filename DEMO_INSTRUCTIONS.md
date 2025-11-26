# CCI TV - Demo Instructions & User Journeys

This guide outlines the user journeys for both Administrators and End Users on the CCI TV platform. Use this to demonstrate the platform's capabilities.

---

## 🎬 Platform Overview

CCI TV is a ministry streaming platform designed for Celebration Church International. It features:
- **Live Services**: High-quality live streaming with chat and donations.
- **Video Library**: On-demand sermons, worship experiences, and conferences.
- **Ministry Hub**: Digital store for resources and giving.
- **User Profiles**: Personal accounts with mobile purse functionality.

---

## 🛠️ Admin User Journey

**Goal**: Manage content, broadcast live services, and oversee the platform.

### 1. Admin Login
1. Go to the homepage (`/`)
2. Click **"Sign In"** in the top right
3. Use the demo admin credentials (email or social login configured in `ADMIN_USER_IDS`)
4. Once logged in, click the **Profile Icon** (top right) → Select **"Admin Portal"**

### 2. Uploading a Video (Sermon/Worship)
1. In the Admin Dashboard, select the **"Upload Video"** tab
2. **Fill in Details**:
   - **Title**: e.g., "Sunday Service: The Power of Faith"
   - **Category**: Select "Sermon Series", "Worship Experiences", or "Conferences"
   - **Description**: Brief summary of the message
   - **Thumbnail**: Upload a 16:9 image (or let Livepeer generate one)
3. **Upload File**: Drag & drop an MP4 video file
4. Click **"Upload Video"**
5. **Wait**: Keep the tab open until you see "Upload Complete"
   - *Note: The video will appear in the "Content Manager" list below and on the homepage once processed.*

### 3. Starting a Live Stream
1. In the Admin Dashboard, select the **"Create Stream"** tab
2. **Stream Details**:
   - **Title**: e.g., "Sunday Celebration Service Live"
   - **Record Stream**: Checked (to save as VOD later)
3. Click **"Create Stream"**
4. **Configure OBS**:
   - Copy the **RTMP URL** and **Stream Key** provided
   - Open OBS Studio → Settings → Stream
   - Service: Custom
   - Server: Paste RTMP URL
   - Stream Key: Paste Stream Key
   - **Important Settings**: Output → Keyframe Interval = 2s, Bitrate = 4000 Kbps (CBR)
5. **Start Streaming**: Click "Start Streaming" in OBS
6. **Verify**: The "Broadcast Player" in the admin dashboard will show your stream after ~30 seconds

### 4. Managing Content
1. In the Admin Dashboard, scroll down to **"Content Manager"**
2. You can see all uploaded videos and recorded streams
3. **Edit**: Update titles or prices
4. **Delete**: Remove old or test content permanently

---

## 👤 End User (Viewer) Journey

**Goal**: Watch services, explore content, and engage with the ministry.

### 1. Visiting the Homepage
1. Go to the homepage (`/`)
2. **Hero Section**:
   - If **Live**: Shows "Live Now" indicator with the active stream. Click "Watch Now" to join.
   - If **Offline**: Shows the featured "Endless Celebration" banner.
3. **Video Carousels**:
   - Scroll down to see "Recent Uploads", "Worship Experiences", and "Sermon Series".
   - Horizontal scrolling allows browsing multiple videos.

### 2. Watching a Live Service
1. Click on the **"Live Now"** card or banner
2. **Stream Page**:
   - **Player**: Video starts automatically (muted). Click to unmute/play.
   - **Chat**: (Simulation) See messages from other viewers on the right.
   - **Giving**: Below the player, use the **Donation Panel** to give an offering (Simulated).
     - Click "$50" → "Give Now" → See success animation.

### 3. Watching On-Demand Video (VOD)
1. Click on any video thumbnail in the library or carousels
2. **Video Page**:
   - **Cinema Mode**: Large player with "Up Next" sidebar.
   - **Playback**: Smooth streaming with quality selection (Auto/1080p/720p).
   - **Details**: Read description, see category and release date.

### 4. Ministry Hub (Store)
1. Click **"Hub"** in the navigation
2. Browse resources (E-Books, Apparel, Guides)
3. **Purchase Flow**:
   - Click "Add to Cart" on an item (e.g., "Daily Walk Devotional")
   - **Checkout Modal**: Opens a simulated checkout
   - Click "Complete Purchase" → See "Order Confirmed" success message

### 5. User Profile & Wallet
1. Click the **Profile Icon** in the navigation
2. **Profile Popup**:
   - **My Profile**: See display name and email.
   - **Mobile Purse**: Click the "Mobile Purse" tab.
   - **Add Funds**: Select "$100" → "Add Funds" (Simulates adding crypto/stablecoins seamlessly).
   - Balance updates instantly.

---

## 📱 Mobile Experience

The platform is fully responsive:
- **Navigation**: Collapses into a bottom bar or hamburger menu (depending on device width).
- **Video Player**: Adapts to width, supports native fullscreen.
- **Chat**: Moves below the video on smaller screens.

---

## 🛑 Troubleshooting

- **Video won't play?**
  - *Reason*: It might still be processing in Livepeer.
  - *Fix*: Wait 5-10 minutes after upload.
- **"Stream Offline" message?**
  - *Reason*: OBS hasn't connected yet or stream was stopped.
  - *Fix*: Check OBS connection and ensure "Start Streaming" is active.
- **Login issues?**
  - *Reason*: Browser cookies/cache.
  - *Fix*: Refresh page or clear cookies.

---

*CCI TV Demo Instructions - Generated for Development & Testing*


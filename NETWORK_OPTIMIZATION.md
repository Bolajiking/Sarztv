# Network Optimization Guide for Video Playback

If you are experiencing issues where video playback only works when a VPN is active, it is highly likely that your Internet Service Provider (ISP) or local network settings are restricting access to the streaming delivery networks (CDNs).

To optimize your home network for seamless playback without a VPN, follow these steps to configure a faster and more reliable DNS server.

## Method 1: Change DNS Settings (Recommended)

Switching to Google DNS or Cloudflare DNS is the most effective way to resolve playback blocking issues.

### For Mac Users
1. Click the **Apple menu** > **System Settings** (or System Preferences).
2. Go to **Network**.
3. Click on your connected network (Wi-Fi or Ethernet) and click **Details...** (or Advanced).
4. Select the **DNS** tab.
5. Click the **+** button to add a new DNS server.
6. Enter the following addresses:
   - **8.8.8.8** (Google)
   - **8.8.4.4** (Google)
   - *Optional:* **1.1.1.1** (Cloudflare)
7. Click **OK** and then **Apply**.

### For Windows Users
1. Go to **Settings** > **Network & Internet**.
2. Select **Wi-Fi** or **Ethernet** (whichever you are using).
3. Click on **Hardware properties** (or "Change adapter options").
4. Click **Edit** next to "DNS server assignment".
5. Select **Manual**.
6. Turn on **IPv4**.
7. Enter **8.8.8.8** in "Preferred DNS" and **8.8.4.4** in "Alternate DNS".
8. Click **Save**.

### For Mobile (iOS)
1. Go to **Settings** > **Wi-Fi**.
2. Tap the **(i)** icon next to your connected network.
3. Scroll down to **Configure DNS**.
4. Change it from **Automatic** to **Manual**.
5. Add Server: **8.8.8.8** and **1.1.1.1**.
6. Tap **Save**.

## Method 2: Flush DNS Cache

If changing DNS doesn't work immediately, try clearing your computer's DNS cache.

- **Mac:** Open Terminal and run: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- **Windows:** Open Command Prompt and run: `ipconfig /flushdns`

## Method 3: Check Firewall / Antivirus

Sometimes strict firewall settings can block video streams.
- Temporarily pause your antivirus/firewall to check if playback works.
- If it works, add the website to your antivirus whitelist.


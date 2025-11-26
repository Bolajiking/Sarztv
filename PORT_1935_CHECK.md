# Port 1935 (RTMP) Connectivity Check

## Quick Test Methods

### Method 1: Using `nc` (netcat) - macOS/Linux

Open Terminal and run:

```bash
nc -zv rtmp.livepeer.studio 1935
```

**Expected Results:**
- ✅ **Success:** `Connection to rtmp.livepeer.studio port 1935 [tcp/*] succeeded!`
- ❌ **Blocked:** `Connection refused` or `Operation timed out`

---

### Method 2: Using `telnet` - macOS/Linux

```bash
telnet rtmp.livepeer.studio 1935
```

**Expected Results:**
- ✅ **Success:** You'll see `Connected to rmp.livepeer.studio` (then press Ctrl+C to exit)
- ❌ **Blocked:** `Connection refused` or hangs indefinitely

---

### Method 3: Using Online Port Checker

1.  Visit: [https://www.yougetsignal.com/tools/open-ports/](https://www.yougetsignal.com/tools/open-ports/)
2.  Enter **Remote Address:** `rtmp.livepeer.studio`
3.  Enter **Port Number:** `1935`
4.  Click **Check**

---

### Method 4: Test from OBS Directly

The most reliable test is actually trying to connect in OBS:

1.  Configure OBS with your RTMP URL and Stream Key.
2.  Click **"Start Streaming"**.
3.  Watch the bottom status bar:
    - ✅ **Green square** = Connected (port is open)
    - ❌ **Red square** = Failed (port likely blocked)

---

## What to Do If Port 1935 Is Blocked

### Option 1: Use a Different Network
- Switch to a **mobile hotspot** (temporarily) to confirm the issue.
- If it works on hotspot → Your main network is blocking RTMP.

### Option 2: Contact Your Network Administrator
- Corporate/Church networks often block RTMP.
- Ask them to **whitelist port 1935** for outbound connections to `rtmp.livepeer.studio`.

### Option 3: Use a VPN (Last Resort)
- Some VPNs allow RTMP, but this adds latency.
- Not recommended for live streaming.

---

## Firewall Check (macOS)

If you have a firewall enabled:

1.  Go to **System Settings** → **Network** → **Firewall**.
2.  Click **Options**.
3.  Ensure **"Block all incoming connections"** is **OFF** (or add OBS to allowed apps).

---

## Note

Port 1935 is an **outbound** connection (your computer → Livepeer). Most home networks allow this by default. The issue is more common on:
- Corporate networks
- School/church WiFi
- Public WiFi (coffee shops, etc.)


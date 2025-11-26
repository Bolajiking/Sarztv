# Cloudflare Setup Guide for CCI TV

Configuring Cloudflare helps improve performance, security, and reliability for your users regardless of their location. It also helps mitigate some network restrictions by routing traffic through Cloudflare's global network.

## Step 1: Add Your Domain to Cloudflare

1.  **Sign Up/Log In**: Go to [dash.cloudflare.com](https://dash.cloudflare.com) and create an account.
2.  **Add Site**: Click **+ Add a Site** and enter your domain name (e.g., `ccitv.com`).
3.  **Select Plan**: Choose the **Free** plan (sufficient for most needs) and click **Continue**.
4.  **DNS Review**: Cloudflare will scan your existing DNS records. Review them and click **Continue**.

## Step 2: Update Nameservers

Cloudflare will provide two nameservers (e.g., `bob.ns.cloudflare.com` and `alice.ns.cloudflare.com`).

1.  Log in to your **Domain Registrar** (GoDaddy, Namecheap, etc.).
2.  Navigate to **DNS Management** or **Nameservers** settings for your domain.
3.  Replace your current nameservers with the two Cloudflare nameservers.
4.  Save changes. It may take up to 24 hours to propagate (usually much faster).

## Step 3: Configure DNS for Vercel

Once your domain is active on Cloudflare:

1.  Go to the **DNS** section in Cloudflare dashboard.
2.  Add a **CNAME** record:
    *   **Type**: CNAME
    *   **Name**: `www` (or `@` for root)
    *   **Target**: `cname.vercel-dns.com`
    *   **Proxy status**: Ensure the **Orange Cloud** icon (Proxied) is ON.
3.  Add an **A** record (if using root domain):
    *   **Type**: A
    *   **Name**: `@`
    *   **IPv4 address**: `76.76.21.21` (Vercel's IP)
    *   **Proxy status**: Orange Cloud ON.

## Step 4: Security & Optimization Settings

To ensure no restriction issues:

1.  **SSL/TLS**: Set encryption mode to **Full (Strict)** if Vercel SSL is active (recommended), or **Full**. Do NOT use "Flexible".
2.  **Speed**: Go to **Speed > Optimization** and enable **Auto Minify** (HTML, CSS, JS) and **Brotli**.
3.  **Caching**: Go to **Caching > Configuration** and set **Browser Cache TTL** to "Respect Existing Headers".

## Advanced: Custom Domain for Video (Optional)

If users are still blocked from viewing videos because `livepeercdn.studio` is restricted in their region, you can set up a custom domain for video delivery (requires Livepeer Enterprise/Growth features or a custom proxy).

For standard setups, ensuring the **App** is on Cloudflare and users follow the [Network Optimization Guide](./NETWORK_OPTIMIZATION.md) (changing DNS) is usually sufficient.


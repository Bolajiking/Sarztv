# Privy Authentication Configuration Guide

This guide explains how to configure Privy authentication for CCI TV using environment variables and the Privy Dashboard.

## Prerequisites

1. **Privy Account**: Sign up at https://dashboard.privy.io/
2. **Create a Privy App**: Create a new app in the Privy Dashboard
3. **Get Your Credentials**: Copy your App ID and App Secret from the Privy Dashboard

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Privy App ID (Required)
# Get this from: Privy Dashboard → Your App → Settings → App ID
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here

# Privy App Secret (Required for server-side operations)
# Get this from: Privy Dashboard → Your App → Settings → App Secret
PRIVY_APP_SECRET=your_privy_app_secret_here
```

## Optional Configuration

### Login Methods

Control which authentication methods are available to users:

```env
# Comma-separated list of login methods
# Options: wallet, email, sms, google, apple, twitter, discord, github, linkedin, tiktok, farcaster
# Default: wallet,email,sms
NEXT_PUBLIC_PRIVY_LOGIN_METHODS=wallet,email,sms,google,apple
```

**Available Login Methods:**
- `wallet` - Web3 wallet connection (MetaMask, WalletConnect, etc.)
- `email` - Email/password authentication
- `sms` - SMS/phone number authentication
- `google` - Google OAuth
- `apple` - Apple Sign In
- `twitter` - Twitter/X OAuth
- `discord` - Discord OAuth
- `github` - GitHub OAuth
- `linkedin` - LinkedIn OAuth
- `tiktok` - TikTok OAuth
- `farcaster` - Farcaster authentication

### Appearance Customization

Customize the look and feel of Privy's authentication UI:

```env
# Theme: 'light' or 'dark' (default: 'dark')
NEXT_PUBLIC_PRIVY_THEME=dark

# Accent color (hex code without #, or with #)
# Default: #c5a059 (CCI TV gold)
NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059

# Logo path (relative to public folder or absolute URL)
# Default: /next.svg
NEXT_PUBLIC_PRIVY_LOGO=/logo.svg
```

### Embedded Wallets

Enable Privy's embedded wallet feature for seamless Web3 experiences:

```env
# Enable embedded wallets (true/false)
# Default: false
NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true
```

When enabled, Privy will automatically create wallets for users who don't have one, making it easier for non-crypto users to interact with Web3 features.

## Privy Dashboard Configuration

### 1. Configure OAuth Providers

If you want to use social logins (Google, Apple, etc.):

1. Go to **Privy Dashboard** → **Your App** → **Authentication**
2. Enable the OAuth providers you want (Google, Apple, Twitter, etc.)
3. Follow the setup instructions for each provider:
   - **Google**: Create OAuth credentials in Google Cloud Console
   - **Apple**: Configure Sign in with Apple in Apple Developer Portal
   - **Twitter**: Create an app in Twitter Developer Portal
   - etc.

### 2. Configure Allowed Origins

For production, add your domain to allowed origins:

1. Go to **Privy Dashboard** → **Your App** → **Settings** → **Allowed Origins**
2. Add your production domain (e.g., `https://ccitv.com`)
3. Add your development domain (e.g., `http://localhost:3000`)

### 3. Configure Redirect URLs

If using OAuth providers:

1. Go to **Privy Dashboard** → **Your App** → **Settings** → **Redirect URLs**
2. Add your callback URLs:
   - `http://localhost:3000` (development)
   - `https://ccitv.com` (production)

## Example Complete Configuration

```env
# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=clxxxxxxxxxxxxxxxxxxxx
PRIVY_APP_SECRET=your_secret_here

# Login Methods (wallet, email, sms, and social logins)
NEXT_PUBLIC_PRIVY_LOGIN_METHODS=wallet,email,sms,google,apple

# Appearance (matching CCI TV brand)
NEXT_PUBLIC_PRIVY_THEME=dark
NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059
NEXT_PUBLIC_PRIVY_LOGO=/logo.svg

# Embedded Wallets (optional, for better UX)
NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true
```

## Verification

After configuring, verify your setup:

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Check the browser console** for any Privy configuration warnings

3. **Test authentication**:
   - Click "Sign In" in the app
   - Verify that your configured login methods appear
   - Test logging in with each method

## Troubleshooting

### "Privy App ID not configured" Warning

- Ensure `NEXT_PUBLIC_PRIVY_APP_ID` is set in `.env.local`
- Restart your development server after adding environment variables
- Check that the variable name is exactly `NEXT_PUBLIC_PRIVY_APP_ID` (case-sensitive)

### Login Methods Not Appearing

- Verify the method names are spelled correctly in `NEXT_PUBLIC_PRIVY_LOGIN_METHODS`
- Check that OAuth providers are enabled in Privy Dashboard
- Ensure OAuth credentials are properly configured in the provider's dashboard

### OAuth Errors

- Verify redirect URLs are added in Privy Dashboard
- Check that OAuth credentials match between Privy and the provider
- Ensure allowed origins include your domain

### Embedded Wallets Not Working

- Verify `NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true` is set
- Check that embedded wallets are enabled in Privy Dashboard
- Ensure your Privy plan supports embedded wallets

## Additional Resources

- [Privy Documentation](https://docs.privy.io/)
- [Privy Dashboard](https://dashboard.privy.io/)
- [Privy React Auth SDK](https://docs.privy.io/guides/react/installation)


# Privy Dashboard Configuration Setup

This guide explains how to configure your Privy Dashboard to work with CCI TV's authentication system.

## Overview

CCI TV uses the following login methods:
- ✉️ **Email** - Email/password authentication
- 🔗 **Wallet** - Web3 wallet connection (MetaMask, WalletConnect, etc.)
- 🔵 **Google** - Google OAuth
- 🐦 **Twitter/X** - Twitter OAuth

The Privy Dashboard is the primary source of configuration for OAuth providers, branding, and security settings.

## Step 1: Access Your Privy Dashboard

1. Go to https://dashboard.privy.io/
2. Sign in to your account
3. Select your CCI TV app (or create a new one)

## Step 2: Configure OAuth Providers

### Enable Google OAuth

1. In Privy Dashboard, go to **Configuration** → **Login Methods**
2. Find **Google** in the list
3. Toggle it **ON**
4. Click **Configure** or **Settings**
5. Follow the setup wizard to:
   - Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/)
   - Add authorized redirect URIs:
     - `https://auth.privy.io/oauth/callback`
     - Your production domain (e.g., `https://ccitv.com`)
     - Development: `http://localhost:3000`
   - Copy Client ID and Client Secret to Privy Dashboard

### Enable Twitter/X OAuth

1. In Privy Dashboard, go to **Configuration** → **Login Methods**
2. Find **Twitter** in the list
3. Toggle it **ON**
4. Click **Configure** or **Settings**
5. Follow the setup wizard to:
   - Create an app in [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Set up OAuth 2.0 settings
   - Add callback URL: `https://auth.privy.io/oauth/callback`
   - Copy API Key and API Secret to Privy Dashboard

### Enable Email Authentication

1. In Privy Dashboard, go to **Configuration** → **Login Methods**
2. Find **Email** in the list
3. Toggle it **ON**
4. Configure email settings:
   - Email provider (default or custom SMTP)
   - Email templates (optional customization)

### Enable Wallet Authentication

1. In Privy Dashboard, go to **Configuration** → **Login Methods**
2. Find **Wallet** in the list
3. Toggle it **ON**
4. Configure wallet options:
   - MetaMask
   - WalletConnect
   - Coinbase Wallet
   - Other supported wallets

## Step 3: Configure Appearance (Optional)

While the app has default styling, you can customize in Privy Dashboard:

1. Go to **Configuration** → **Appearance**
2. Customize:
   - **Theme**: Light or Dark (default: dark)
   - **Accent Color**: Brand color (default: #c5a059 - CCI gold)
   - **Logo**: Upload your church logo
   - **Company Name**: "Celebration Church International"

**Note**: Environment variables in `.env.local` can override these settings locally.

## Step 4: Configure Allowed Origins

For security, add your domains:

1. Go to **Configuration** → **Settings** → **Allowed Origins**
2. Add:
   - `http://localhost:3000` (development)
   - `https://ccitv.com` (production)
   - Any other domains where the app is hosted

## Step 5: Configure Redirect URLs

1. Go to **Configuration** → **Settings** → **Redirect URLs**
2. Add callback URLs for each environment:
   - Development: `http://localhost:3000`
   - Production: `https://ccitv.com`

## Step 6: Test Your Configuration

After configuration:

1. Restart your development server
2. Go to your app
3. Click **Sign In**
4. You should see all 4 login options:
   - Continue with Email
   - Continue with Google
   - Continue with Twitter
   - Connect Wallet

5. Test each method to ensure they work

## Troubleshooting

### OAuth Provider Not Showing

**Possible causes**:
- Provider not enabled in Privy Dashboard
- OAuth credentials not configured correctly
- Redirect URLs not set up

**Solution**:
- Verify the provider is toggled ON in Privy Dashboard
- Double-check OAuth credentials (Client ID/Secret)
- Ensure redirect URLs match exactly (including https vs http)

### "OAuth Error" When Clicking Provider

**Possible causes**:
- OAuth credentials expired or invalid
- Redirect URL mismatch
- App not approved in provider's console

**Solution**:
- Re-enter OAuth credentials in Privy Dashboard
- Verify redirect URLs in both Privy and provider's console
- For Google: Check OAuth consent screen configuration
- For Twitter: Ensure app has proper permissions

### Wallet Connection Not Working

**Possible causes**:
- User doesn't have a Web3 wallet installed
- Wrong network selected in wallet
- Chain configuration mismatch

**Solution**:
- Prompt users to install MetaMask or use WalletConnect
- Configure the correct chain (Base mainnet, ID: 8453)
- Verify RPC URL is accessible

## Environment Variables

The app uses these environment variables (optional overrides):

```env
# Required
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
PRIVY_APP_SECRET=your_secret

# Optional (overrides Dashboard settings)
NEXT_PUBLIC_PRIVY_THEME=dark
NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059
NEXT_PUBLIC_PRIVY_LOGO=/logo.svg
NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true
```

**Note**: Login methods are hardcoded in the app (email, wallet, google, twitter) to match CCI TV requirements.

## Best Practices

1. **Test in Development First**: Configure and test all OAuth providers in development before deploying
2. **Use Production Credentials**: Use separate OAuth credentials for production and development
3. **Monitor Dashboard**: Check Privy Dashboard analytics to see which login methods users prefer
4. **Keep Credentials Secure**: Never commit OAuth secrets to version control
5. **Update Regularly**: Check Privy Dashboard for updates and new features

## Additional Resources

- [Privy Documentation](https://docs.privy.io/)
- [Google OAuth Setup](https://docs.privy.io/guides/oauth/google)
- [Twitter OAuth Setup](https://docs.privy.io/guides/oauth/twitter)
- [Privy Dashboard](https://dashboard.privy.io/)


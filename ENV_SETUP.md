# SARZ TV - Environment Variables Setup Guide

This guide will help you set up all the required environment variables for SARZ TV.

## Quick Start

1. **Create `.env.local` file** in the project root:
   ```bash
   touch .env.local
   ```

2. **Copy the template below** into your `.env.local` file

3. **Fill in your actual API keys and credentials** (see instructions below)

## Environment Variables Template

Copy this into your `.env.local` file:

```env
# ============================================
# SARZ TV - Environment Variables
# ============================================

# ============================================
# Livepeer Configuration
# ============================================
# Get your API key from: https://livepeer.studio/dashboard/developers
NEXT_PUBLIC_LIVEPEER_API_KEY=your_livepeer_api_key_here
LIVEPEER_API_KEY=your_livepeer_api_key_here

# ============================================
# Privy Authentication Configuration
# ============================================
# Get these from: https://dashboard.privy.io/
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
PRIVY_APP_SECRET=your_privy_app_secret_here
NEXT_PUBLIC_PRIVY_LOGIN_METHODS=wallet,email,sms,google,apple
NEXT_PUBLIC_PRIVY_THEME=dark
NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059
NEXT_PUBLIC_PRIVY_LOGO=/next.svg
NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=false

# ============================================
# Supabase Configuration
# ============================================
# Get these from: https://supabase.com/dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ============================================
# Admin Configuration
# ============================================
# Comma-separated list of Privy user IDs with admin access
# Leave empty initially, add after first login
ADMIN_USER_IDS=

# ============================================
# Blockchain Configuration (Optional)
# ============================================
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_CHAIN_NAME=base
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org

# ============================================
# App Configuration (Optional)
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step-by-Step Setup Instructions

### 1. Livepeer Setup

**Purpose:** Video uploads and livestreaming

1. Go to [https://livepeer.studio](https://livepeer.studio)
2. Sign up or log in
3. Navigate to **Dashboard → Developers → API Keys**
4. Copy your API key
5. Paste it into both:
   - `NEXT_PUBLIC_LIVEPEER_API_KEY`
   - `LIVEPEER_API_KEY`

**Note:** Use the same key for both variables.

### 2. Privy Setup

**Purpose:** User authentication (login/signup)

1. Go to [https://dashboard.privy.io](https://dashboard.privy.io)
2. Sign up or log in
3. Click **"Create App"** or select an existing app
4. Go to **Settings → App ID & Secret**
5. Copy:
   - **App ID** → `NEXT_PUBLIC_PRIVY_APP_ID`
   - **App Secret** → `PRIVY_APP_SECRET`
6. Configure login methods in Privy Dashboard:
   - Go to **Authentication → Login Methods**
   - Enable: Wallet, Email, SMS, Google, Apple (or your preferred methods)
   - Update `NEXT_PUBLIC_PRIVY_LOGIN_METHODS` to match

**Optional Privy Settings:**
- `NEXT_PUBLIC_PRIVY_THEME=dark` (matches SARZ TV theme)
- `NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059` (SARZ TV gold)
- `NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=false` (set to `true` if you want auto-wallet creation)

### 3. Supabase Setup

**Purpose:** Database for videos, streams, products, user data

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name:** `sarz-tv` (or your choice)
   - **Database Password:** (save this!)
   - **Region:** Choose closest to you
5. Wait 2-3 minutes for project creation
6. Once ready, go to **Settings → API**
7. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (click "Reveal") → `SUPABASE_SERVICE_ROLE_KEY`

**⚠️ Important:** The service_role key bypasses security - keep it secret!

#### Run Database Migrations

After setting up Supabase, you need to create the database tables:

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Open `supabase/migrations/001_initial_schema.sql` and run it
4. Open `supabase/migrations/002_row_level_security.sql` and run it
5. Continue with other migrations in order (003, 004, etc.)

### 4. Admin Setup

**Purpose:** Grant admin access to specific users

1. Start your dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Sign in with Privy
4. Check the browser console or network tab to find your Privy User ID
5. Add your User ID to `ADMIN_USER_IDS`:
   ```env
   ADMIN_USER_IDS=your_privy_user_id_here
   ```
6. Restart the dev server
7. You should now see the Admin Dashboard at `/admin`

**Note:** You can add multiple admin users by comma-separating IDs:
```env
ADMIN_USER_IDS=user_abc123,user_def456,user_ghi789
```

## Verification

After setting up all variables:

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Check for errors** in the terminal - missing variables will show warnings

3. **Test the app:**
   - Visit `http://localhost:3000`
   - Try signing in (Privy should work)
   - Check browser console for any errors

## Troubleshooting

### "Missing environment variables" Warning

- Ensure all required variables are set in `.env.local`
- Restart the dev server after adding variables
- Check for typos in variable names (they're case-sensitive)

### Privy Not Working

- Verify `NEXT_PUBLIC_PRIVY_APP_ID` and `PRIVY_APP_SECRET` are correct
- Check Privy Dashboard → Allowed Origins includes `http://localhost:3000`
- Ensure login methods are enabled in Privy Dashboard

### Supabase Connection Issues

- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (should end with `.supabase.co`)
- Check that migrations have been run
- Verify service_role key is correct (it's very long)

### Livepeer Upload/Stream Issues

- Verify API key is correct
- Check Livepeer Dashboard for API usage limits
- Ensure both `NEXT_PUBLIC_LIVEPEER_API_KEY` and `LIVEPEER_API_KEY` are set

### Admin Access Not Working

- Verify `ADMIN_USER_IDS` contains your Privy User ID
- User ID format should match exactly (check browser console)
- Restart dev server after updating `ADMIN_USER_IDS`

## Security Notes

- **Never commit `.env.local` to git** (it's in `.gitignore`)
- **Never share your service_role key** publicly
- **Never expose `PRIVY_APP_SECRET`** in client-side code
- Use different keys for development and production

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add all environment variables in your hosting platform's dashboard
2. Use production API keys (not development keys)
3. Update `NEXT_PUBLIC_APP_URL` to your production domain
4. Update Privy Dashboard → Allowed Origins with your production domain
5. Update Supabase → Settings → API → Allowed Origins if needed

## Need Help?

- Check the individual setup guides:
  - `LIVEPEER_SETUP.md` - Livepeer configuration
  - `PRIVY_CONFIGURATION.md` - Privy authentication setup
  - `SUPABASE_SETUP.md` - Supabase database setup


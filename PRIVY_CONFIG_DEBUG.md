# Privy Configuration Debug Guide

If your Privy configurations are not reflecting in the frontend, follow these steps:

## Step 1: Check Your Environment Variables

Make sure you have added the configuration variables to your `.env.local` file:

```env
# Required
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here
PRIVY_APP_SECRET=your_secret_here

# Optional - Customize these
NEXT_PUBLIC_PRIVY_LOGIN_METHODS=wallet,email,sms,google,apple
NEXT_PUBLIC_PRIVY_THEME=dark
NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059
NEXT_PUBLIC_PRIVY_LOGO=/logo.svg
NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true
```

## Step 2: Restart Your Development Server

**IMPORTANT**: Environment variables are only loaded when the server starts. After adding or changing environment variables:

1. **Stop your dev server** (Ctrl+C or Cmd+C)
2. **Start it again**:
   ```bash
   npm run dev
   ```

## Step 3: Clear Browser Cache

Sometimes the browser caches the old Privy configuration:

1. **Hard refresh** your browser:
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. Or **clear your browser cache** completely

## Step 4: Check Browser Console

Open your browser's developer console (F12) and look for:

```
🔐 Privy Configuration: { ... }
```

This will show you what configuration is actually being used.

## Step 5: Verify Environment Variables Are Loaded

Check that your environment variables are being read correctly:

1. Open browser console
2. Look for the Privy configuration log
3. Verify the values match what you set in `.env.local`

## Common Issues

### Issue: Changes not appearing after updating .env.local

**Solution**: Restart your dev server. Next.js only reads environment variables on startup.

### Issue: Login methods not showing

**Possible causes**:
1. The method name is misspelled (must be lowercase: `google`, not `Google`)
2. The OAuth provider is not enabled in Privy Dashboard
3. OAuth credentials are not configured

**Solution**: 
- Check spelling in `NEXT_PUBLIC_PRIVY_LOGIN_METHODS`
- Verify OAuth providers are enabled in Privy Dashboard
- Ensure OAuth credentials are set up correctly

### Issue: Theme or colors not changing

**Possible causes**:
1. Environment variable not set correctly
2. Server not restarted
3. Browser cache

**Solution**:
- Verify the variable name is exactly `NEXT_PUBLIC_PRIVY_THEME` (case-sensitive)
- Restart dev server
- Hard refresh browser

### Issue: Logo not showing

**Possible causes**:
1. Logo path is incorrect
2. Logo file doesn't exist in `public` folder
3. Logo path doesn't start with `/`

**Solution**:
- Ensure logo is in the `public` folder
- Use absolute path starting with `/` (e.g., `/logo.svg`)
- Or use full URL if hosting externally

## Quick Test

To quickly test if your configuration is working:

1. Add this to your `.env.local`:
   ```env
   NEXT_PUBLIC_PRIVY_THEME=light
   NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#ff0000
   ```

2. Restart dev server
3. Open the app and click "Sign In"
4. The Privy modal should have a light theme with red accent color

If this works, your configuration is being read correctly!

## Still Not Working?

1. **Check the browser console** for any errors
2. **Verify your `.env.local` file** is in the project root (same folder as `package.json`)
3. **Check for typos** in environment variable names (they're case-sensitive)
4. **Ensure variables start with `NEXT_PUBLIC_`** for client-side access
5. **Restart your dev server** after any changes


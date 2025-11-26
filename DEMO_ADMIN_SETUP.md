# Demo Admin Account Setup Guide

This guide will help you create a demo admin user account for testing and demonstration purposes.

## Prerequisites

- Privy account (sign up at https://dashboard.privy.io/)
- Supabase dashboard access
- Access to your `.env.local` file

## Step-by-Step Setup

### Step 1: Create a Test User via Privy

1. **Sign in to Privy Dashboard**
   - Go to https://dashboard.privy.io/
   - Select your project (CCI TV)

2. **Create a Test User**
   - Navigate to **"Users"** in the left sidebar
   - Click **"Create Test User"** or **"Add User"**
   - Choose authentication method:
     - **Email**: `demo@ccitv.com` (or any email you prefer)
     - **Or use a Google/Social account** for easier login

3. **Copy the User ID**
   - After creating the user, click on the user in the list
   - Copy the **User ID** (looks like: `did:privy:cm1234abcd5678efgh`)
   - This is your **Privy User ID**

### Step 2: Add Admin User ID to Environment Variables

1. **Open your `.env.local` file**

2. **Add or update the `ADMIN_USER_IDS` variable:**

```env
# In .env.local

# Existing variables...
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_secret
LIVEPEER_API_KEY=your_livepeer_key

# Add the demo admin user ID (from Step 1)
ADMIN_USER_IDS=did:privy:cm1234abcd5678efgh
```

**Multiple Admins:**
If you want multiple admin users, separate them with commas:
```env
ADMIN_USER_IDS=did:privy:cm1234abcd5678efgh,did:privy:another_admin_id
```

3. **Save the file**

### Step 3: Restart the Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Create User Profile in Supabase

1. **Sign in to the app using the demo account**
   - Go to http://localhost:3000
   - Click "Sign In"
   - Sign in with the email/method you used in Step 1

2. **Navigate to Profile Page**
   - Go to http://localhost:3000/profile
   - Fill in:
     - **Display Name**: "Demo Admin" (or any name)
     - **Email**: demo@ccitv.com
   - Click "Save Profile"

3. **Verify Admin Access**
   - Go to http://localhost:3000/admin
   - You should see the admin dashboard with:
     - Upload Video
     - Create Stream
     - Content Manager

## Verification Checklist

✅ **Test Admin Features:**

1. **Video Upload**
   - Go to `/admin` → "Upload Video" tab
   - Try uploading a test video
   - Verify it appears in the Video Library

2. **Stream Creation**
   - Go to `/admin` → "Create Stream" tab
   - Create a test stream
   - Verify you get RTMP URL and Stream Key

3. **Content Management**
   - Go to `/admin` → "Content Manager" tab
   - Verify you can see uploaded videos
   - Verify you can delete videos/streams

4. **Profile Management**
   - Go to `/profile`
   - Update display name and email
   - Verify changes save successfully

## Troubleshooting

### Issue: "Unauthorized: Admin access required"

**Solution:**
1. Check that `ADMIN_USER_IDS` in `.env.local` matches your Privy User ID exactly
2. Restart the dev server after changing `.env.local`
3. Sign out and sign back in

### Issue: Can't find Privy User ID

**Solution:**
1. Go to Privy Dashboard → Users
2. Click on the user you created
3. Look for "User ID" or "DID" (starts with `did:privy:`)
4. Copy the entire ID including `did:privy:` prefix

### Issue: Profile not saving

**Solution:**
1. Check Supabase dashboard → SQL Editor
2. Run this query to verify the profile exists:
```sql
SELECT * FROM user_profiles WHERE privy_user_id = 'did:privy:your_user_id';
```
3. If no results, the profile hasn't been created yet
4. Sign in to the app and visit `/profile` to create it

## Alternative: Quick SQL Setup (Advanced)

If you already have a Privy User ID, you can manually insert it into Supabase:

```sql
-- In Supabase SQL Editor

-- 1. Insert user profile
INSERT INTO user_profiles (privy_user_id, display_name, email)
VALUES ('did:privy:your_user_id', 'Demo Admin', 'demo@ccitv.com')
ON CONFLICT (privy_user_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  email = EXCLUDED.email;
```

Then add the User ID to `ADMIN_USER_IDS` in `.env.local` and restart.

## Demo Account Best Practices

1. **Use a memorable email**: `demo@ccitv.com` or `admin@ccitv.com`
2. **Document the credentials**: Keep a secure note of:
   - Email/login method
   - Privy User ID
   - Display name
3. **Test regularly**: Periodically test admin features to ensure they work
4. **Separate from production**: Never use demo accounts in production

## Security Notes

⚠️ **Important:**
- Demo accounts have **full admin access** (upload, delete, manage content)
- Do not share the User ID publicly
- Do not use demo accounts in production
- For production, use a secure authentication flow

## What Demo Admins Can Do

✅ **Full Access:**
- Upload videos to Livepeer
- Create live streams
- Delete videos and streams
- View all content
- Manage metadata (titles, descriptions, prices)
- Access admin dashboard

❌ **Cannot Do:**
- Change app configuration
- Access environment variables
- Modify other user accounts
- Access Supabase/Livepeer dashboards (unless you give them access)

## Next Steps

Once your demo admin is set up:
1. Upload a few test videos
2. Create a test livestream
3. Test the full user flow (sign in → watch video → donate)
4. Share the demo account credentials with your team (securely)

---

**Need Help?**
- Check the console logs at http://localhost:3000 (F12 → Console)
- Verify admin check at: http://localhost:3000/api/auth/check-admin?user_id=did:privy:your_user_id
- Should return: `{ "isAdmin": true }`


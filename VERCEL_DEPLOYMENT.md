# 🚀 Vercel Deployment Fix Guide

## Problem
Auth (login/signup/logout) works locally but fails on Vercel production deployment.

## Root Causes
1. **Missing Environment Variables** in Vercel
2. **Supabase Redirect URLs** not configured for production domain
3. **CORS/Site URL** settings in Supabase

---

## ✅ Solution Steps

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

**Get these values from your `.env.local` file**

4. Make sure to select **All** environments (Production, Preview, Development)
5. Click **Save**

### Step 2: Configure Supabase Auth Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**

#### Add Redirect URLs:
Add all these URLs to **Redirect URLs**:
```
http://localhost:3000/**
https://your-app-name.vercel.app/**
https://your-custom-domain.com/**
```

Replace `your-app-name.vercel.app` with your actual Vercel domain.

#### Set Site URL:
Set **Site URL** to your production domain:
```
https://your-app-name.vercel.app
```

Or if you have a custom domain:
```
https://your-custom-domain.com
```

### Step 3: Configure Email Settings (Important!)

Go to **Authentication** → **Email Templates** → **Settings**

For testing/development, you can:
- **Disable** "Enable email confirmations" (recommended for testing)
- Or set up proper email templates with your production domain

### Step 4: Check CORS Settings

Go to **Settings** → **API** → **API Settings**

Ensure your production domain is allowed:
- Usually this is handled automatically
- But verify no blocklist exists

### Step 5: Redeploy on Vercel

After making all changes:

1. Go to Vercel Dashboard → Deployments
2. Click on the latest deployment
3. Click the **︙** menu → **Redeploy**
4. Or push a new commit to trigger automatic deployment

---

## 🔍 Debug Checklist

If it still doesn't work, check these:

### On Vercel:
- [ ] Environment variables are set correctly
- [ ] Variables are available in all environments
- [ ] Latest deployment picked up the env vars (redeploy if needed)

### On Supabase:
- [ ] Production URL is in Redirect URLs list
- [ ] Site URL matches your production domain
- [ ] Email confirmation is disabled (for testing)
- [ ] Project is not paused (free tier auto-pauses after 7 days)

### In Browser Console (on production):
- [ ] Check for CORS errors
- [ ] Check for "Invalid API key" errors
- [ ] Look for Supabase auth errors
- [ ] Verify environment variables are loaded:
  ```javascript
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  ```

---

## 🧪 Test Your Deployment

Visit your production app and:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to sign up with a test email
4. Check console for errors
5. Look for successful auth logs

Expected console output:
```
[auth] Attempting signup for: test@example.com
[auth] Signup successful: <user-id>
```

---

## 🆘 Still Not Working?

### Common Issues:

#### 1. "Failed to fetch" Error
- **Cause**: Supabase project is paused
- **Fix**: Go to Supabase dashboard and unpause project

#### 2. "Invalid API key"
- **Cause**: Environment variables not loaded
- **Fix**: Redeploy after adding env vars, check for typos

#### 3. "Email not confirmed"
- **Cause**: Email confirmation required
- **Fix**: Disable in Supabase Auth settings

#### 4. Redirect to localhost after login
- **Cause**: Site URL still set to localhost
- **Fix**: Update Site URL in Supabase to production domain

---

## 📝 Quick Commands

### Check Vercel Environment Variables:
```bash
vercel env ls
```

### Pull production environment locally (for testing):
```bash
vercel env pull .env.production
```

### Force redeploy:
```bash
vercel --prod
```

---

## ✨ Success Indicators

You'll know it's working when:
- ✅ Signup creates user in Supabase Auth dashboard
- ✅ Login redirects to home page with prompts
- ✅ Logout clears session and redirects to login
- ✅ No CORS errors in console
- ✅ User profile shows in header

---

## 🔗 Useful Links

- Supabase Dashboard: https://supabase.com/dashboard
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Next.js Env Variables: https://nextjs.org/docs/basic-features/environment-variables

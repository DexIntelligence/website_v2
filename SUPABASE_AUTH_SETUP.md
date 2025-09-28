# Supabase Auth Configuration Guide

This guide walks through the required Supabase configuration to enable the full authentication lifecycle with password reset, email changes, and secure JWT verification.

## Prerequisites

- Access to your Supabase project dashboard
- Admin/Owner permissions in Supabase
- The following environment variables in Netlify:
  - `VITE_SUPABASE_URL` - Your Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
  - `SUPABASE_SERVICE_KEY` - Your Supabase service role key
  - `SUPABASE_JWT_SECRET` - Your Supabase JWT secret (see below)

## Step 1: Configure Site URL and Redirect URLs

1. Go to your Supabase Dashboard
2. Navigate to **Authentication → URL Configuration**
3. Set the following:

### Site URL
```
https://dexintelligence.ai
```
(Or your Netlify URL if not using custom domain yet)

### Redirect URLs (Add all of these)
```
https://dexintelligence.ai/client/reset-password
https://dexintelligence.ai/client/dashboard
https://dexintelligence.ai/client/verify-email
https://dexintelligence.ai/client/account
http://localhost:5173/client/reset-password
http://localhost:5173/client/dashboard
http://localhost:5173/client/verify-email
http://localhost:5173/client/account
```

**Important:** Include both production and localhost URLs for development.

## Step 2: Configure Email Templates

Navigate to **Authentication → Email Templates** and customize the following:

### Reset Password Email

**Subject:** Reset Your Password - Dex Intelligence

**Message:**
```html
<h2>Reset Your Password</h2>
<p>Hi there,</p>
<p>You requested to reset your password. Click the link below to create a new password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
<p>This link will expire in 1 hour.</p>
<p>If you didn't request this, please ignore this email.</p>
<p>Best regards,<br>The Dex Intelligence Team</p>
```

### Confirm Email Change

**Subject:** Confirm Your Email Change - Dex Intelligence

**Message:**
```html
<h2>Confirm Your Email Change</h2>
<p>Hi there,</p>
<p>Please confirm your new email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email Change</a></p>
<p>This link will expire in 24 hours.</p>
<p>If you didn't request this change, please contact support immediately.</p>
<p>Best regards,<br>The Dex Intelligence Team</p>
```

### Magic Link (Optional - if implementing passwordless)

**Subject:** Your Login Link - Dex Intelligence

**Message:**
```html
<h2>Login to Dex Intelligence</h2>
<p>Hi there,</p>
<p>Click the link below to log in to your account:</p>
<p><a href="{{ .ConfirmationURL }}">Log In</a></p>
<p>This link will expire in 1 hour and can only be used once.</p>
<p>If you didn't request this, please ignore this email.</p>
<p>Best regards,<br>The Dex Intelligence Team</p>
```

## Step 3: Get JWT Secret for Netlify Functions

1. Navigate to **Settings → API**
2. Find the **JWT Settings** section
3. Copy the **JWT Secret** value
4. Add it to Netlify environment variables as `SUPABASE_JWT_SECRET`

This is critical for verifying tokens in your Netlify functions.

## Step 4: Configure Auth Settings

Navigate to **Authentication → Providers → Email** and configure:

- **Enable Email Provider:** ✅ Enabled
- **Confirm Email:** ✅ Enabled (recommended for production)
- **Secure Email Change:** ✅ Enabled (requires confirmation from both emails)
- **Secure Password Change:** ✅ Enabled (requires re-authentication)

### Password Requirements (Optional but Recommended)

Set minimum password requirements:
- **Minimum Password Length:** 8 characters
- Consider enabling additional requirements based on your security needs

## Step 5: Configure Rate Limits (Security)

Navigate to **Authentication → Rate Limits** and configure:

- **Email Signup:** 5 per hour per IP
- **Password Reset:** 5 per hour per email
- **Magic Link:** 5 per hour per email
- **Token Refresh:** 30 per hour per user

Adjust these based on your expected usage patterns.

## Step 6: Enable Row Level Security (RLS)

For any tables that store user-specific data:

1. Navigate to **Database → Tables**
2. For each user table, click on the table
3. Enable RLS with the toggle
4. Create appropriate policies for user access

Example policy for user-owned data:
```sql
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON your_table
FOR SELECT USING (auth.uid() = user_id);
```

## Step 7: Test Your Configuration

### Test Password Reset Flow:
1. Go to `/client/login`
2. Click "Forgot your password?"
3. Enter email and submit
4. Check email for reset link
5. Click link and verify redirect to `/client/reset-password`
6. Set new password and verify login works

### Test Email Change Flow:
1. Log in and go to `/client/account`
2. Change email address
3. Check both old and new email for confirmation
4. Confirm change and verify new email works for login

### Test JWT Verification:
1. Check Netlify function logs for any JWT verification errors
2. Ensure protected routes properly validate tokens

## Environment Variables Checklist

Ensure these are set in Netlify:

- [ ] `VITE_SUPABASE_URL` - Your project URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Anonymous/public key
- [ ] `SUPABASE_SERVICE_KEY` - Service role key (keep secret!)
- [ ] `SUPABASE_JWT_SECRET` - JWT secret for verification
- [ ] `JWT_SECRET` - Your own JWT secret for Market Mapper tokens
- [ ] `NODE_ENV` - Set to "production" in Netlify

## Security Best Practices

1. **Never expose service role key** - Only use in server-side functions
2. **Always verify JWTs** - Don't trust client-provided tokens
3. **Use HTTPS everywhere** - Ensure all redirect URLs use HTTPS
4. **Regular token rotation** - Consider rotating JWT secrets periodically
5. **Monitor auth logs** - Check Supabase logs for suspicious activity
6. **Implement rate limiting** - Both in Supabase and your functions

## Troubleshooting

### Reset link not working
- Check redirect URLs are correctly configured
- Ensure Site URL matches your domain
- Verify email template uses `{{ .ConfirmationURL }}`

### JWT verification failing
- Ensure `SUPABASE_JWT_SECRET` is correctly set in Netlify
- Check token hasn't expired
- Verify you're using the correct Supabase project

### Emails not being sent
- Check Supabase email logs (Authentication → Logs)
- Verify email provider is enabled
- Check rate limits haven't been exceeded

### User can't log in after password reset
- Ensure password meets minimum requirements
- Check for any RLS policies blocking access
- Verify user email is confirmed

## Support

For issues specific to:
- **Supabase:** Check their [documentation](https://supabase.com/docs/guides/auth)
- **Your implementation:** Review the code in `/src/utils/auth.js` and Netlify functions
- **Netlify deployment:** Check function logs in Netlify dashboard
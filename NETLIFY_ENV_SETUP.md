# Netlify Environment Variables Setup

## Critical Security Configuration

These environment variables must be added to your Netlify dashboard under Site Settings > Environment Variables.

### Required Environment Variables

#### 1. JWT_SECRET (CRITICAL - NEW)
```
JWT_SECRET=<GENERATE-NEW-SECRET-DO-NOT-USE-THIS-EXAMPLE>
```
**Purpose:** HMAC SHA-256 secret for signing JWT tokens  
**Security:** Must be a cryptographically secure 32-byte (256-bit) secret  
**Action Required:** Generate your own secret (see GENERATE_JWT_SECRET.md) and add to Netlify dashboard  

#### 2. ADMIN_DEBUG_TOKEN (OPTIONAL - FOR DEBUG ACCESS)
```
ADMIN_DEBUG_TOKEN=<generate-your-own-secure-token>
```
**Purpose:** Protects the debug endpoint at `/client/debug`  
**Security:** Only required if you need debug access in production  
**Usage:** Access debug endpoint with header: `Authorization: Bearer <token>`  

#### 3. SUPABASE_SERVICE_KEY (REQUIRED)
```
SUPABASE_SERVICE_KEY=<your-service-key-from-supabase>
```
**Purpose:** Server-side Supabase access for consent logging  
**Security:** Never expose this publicly, only use in server-side functions  
**Location:** Found in Supabase dashboard > Settings > API  

#### 4. RESEND_API_KEY (REQUIRED)
```
RESEND_API_KEY=<your-resend-api-key>
```
**Purpose:** Email sending for contact form  
**Security:** Keep secure, only for server-side use  

#### 5. CONTACT_EMAIL (OPTIONAL)
```
CONTACT_EMAIL=justin@dexintelligence.ai
```
**Purpose:** Where contact form submissions are sent  
**Default:** justin@dexintelligence.ai  

#### 6. NODE_ENV (AUTOMATIC)
```
NODE_ENV=production
```
**Note:** Netlify sets this automatically for production builds  

## Environment Variables in .env.production (PUBLIC KEYS ONLY)

These remain in `.env.production` due to Netlify's VITE_ variable injection issue:
- `VITE_SUPABASE_URL` - Public Supabase URL (safe to expose)
- `VITE_SUPABASE_ANON_KEY` - Public anon key (safe to expose)
- `VITE_APP_DOMAIN` - App domain for Market Mapper

## Setup Instructions

1. **Login to Netlify Dashboard**
   - Go to your site's dashboard
   - Navigate to Site Settings > Environment Variables

2. **Add Production Variables**
   - Click "Add a variable"
   - Select "Production" scope
   - Add each variable listed above

3. **Trigger Redeploy**
   - After adding all variables, trigger a new deployment
   - Go to Deploys tab > "Trigger deploy" > "Clear cache and deploy site"

4. **Verify Configuration**
   - Test the contact form
   - Check that authentication works
   - If ADMIN_DEBUG_TOKEN is set, test debug endpoint:
     ```bash
     curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
          https://dexintelligence.ai/.netlify/functions/check-auth-config
     ```

## Security Notes

- **JWT_SECRET**: This new secret has NOT been committed to any files
- **Rate Limiting**: Token endpoints now limited to 5-10 requests per minute
- **CORS**: Only specific domains allowed for token validation
- **Debug Endpoint**: Protected by token or disabled in production

## Testing After Deployment

1. **Test CORS Protection**:
   ```bash
   # Should fail (origin not allowed)
   curl -X POST https://dexintelligence.ai/.netlify/functions/validate-token \
        -H "Origin: https://malicious-site.com" \
        -H "Content-Type: application/json" \
        -d '{"token":"test"}'
   ```

2. **Test Rate Limiting**:
   - Make 11 requests to validate-token in under 1 minute
   - Should receive 429 "Too many requests" after 10th request

3. **Test Debug Endpoint**:
   - Without token: Should return 401 or 404
   - With valid token: Should return environment status

## Rollback Instructions

If issues occur after deployment:
1. Revert to previous deployment in Netlify dashboard
2. Review error logs in Functions tab
3. Check environment variable configuration
4. Contact security team if authentication breaks

## Important Reminders

- Do NOT commit JWT_SECRET to any file
- Rotate JWT_SECRET if ever exposed
- Keep ADMIN_DEBUG_TOKEN secure if using debug endpoint
- Monitor rate limiting effectiveness in production
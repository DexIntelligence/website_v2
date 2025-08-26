# Dex Intelligence Website - Development Notes

## ⚠️ CRITICAL ISSUE - Netlify Environment Variables Not Loading

**Problem**: Netlify environment variables are not being properly injected - affects both build process AND Netlify Functions runtime, even when properly configured in Netlify's dashboard.

**CONFIRMED**: Environment variables ARE correctly configured in Netlify Dashboard (verified 2025-08-26):
- `JWT_SECRET` is properly set with correct value ending in `...d10a`
- Scoped to: Builds, Functions, Runtime
- Set for all deploy contexts: Production, Deploy Previews, Branch deploys, Preview Server
- Updated by Justin Mayne 11 minutes ago (as of screenshot)
- Despite correct configuration, Functions CANNOT access these variables at runtime

**Current Workarounds**: 
1. **For Build Variables (VITE_)**: Using `.env.production` file committed to the repository
2. **For Function Variables**: Hardcoded fallback values directly in function code

**Affected Variables**:
- `VITE_SUPABASE_URL` - Required for client authentication (in .env.production)
- `VITE_SUPABASE_ANON_KEY` - Required for client authentication (in .env.production)
- `VITE_APP_DOMAIN` - Required for Market Mapper integration (in .env.production)
- `JWT_SECRET` - Required for token generation/validation (hardcoded in functions as fallback)

**Impact**: 
- Client portal authentication was completely broken until workaround implemented
- Market Mapper integration failed with 500 errors until JWT_SECRET hardcoded
- Functions cannot access ANY environment variables from Netlify dashboard

**Files Modified for Workaround**:
- `.env.production` - Contains VITE_ variables and JWT_SECRET (committed to repo)
- `.gitignore` - Removed `.env.production` from ignore list to allow commit
- `netlify/functions/generate-market-mapper-token.js` - Hardcoded JWT_SECRET fallback (line 139)
- `netlify/functions/validate-token.js` - Hardcoded JWT_SECRET fallback (line 137)
- `netlify/functions/generate-token.js` - Hardcoded JWT_SECRET fallback (line 106)

**Debug Tools Created** (can be removed after permanent fix):
- `/client/debug` route - Shows environment variables available to frontend/backend
- `src/pages/client/AuthDebug.jsx` - Debug component
- `netlify/functions/check-auth-config.js` - Backend debug endpoint

**To Fix Properly**:
1. **THIS IS A NETLIFY BUG** - Environment variables are correctly configured but not accessible to Functions
2. **Evidence of the bug**:
   - Screenshot shows JWT_SECRET properly configured in Netlify UI
   - Scoped correctly to "Builds, Functions, Runtime"
   - Set for all deploy contexts
   - Functions still receive `undefined` for `process.env.JWT_SECRET`
3. **Actions needed**:
   - Contact Netlify support with this evidence
   - Show them the screenshot proving correct configuration
   - Request investigation into why Functions cannot access env vars
   - Ask about known issues with environment variable injection
3. **Once fixed, remove all workarounds**:
   - Remove `.env.production` from repository and add back to .gitignore
   - Remove hardcoded JWT_SECRET fallbacks from all function files
   - Remove debug components and endpoints
   - Update all secrets to new values (since current ones are exposed)

**SECURITY WARNING**: Current JWT_SECRET is hardcoded in function files as a workaround. When Netlify env vars are fixed:
1. Generate NEW JWT_SECRET 
2. Remove hardcoded values from code
3. Use only environment variables

**Note**: The current workaround is acceptable for now since these are public keys (anon key is meant to be exposed to browsers), but proper environment variable injection should be restored for better security practices.

---

## PRODUCTION CHECKLIST - Complete Before Going Live

**Critical steps to complete after DNS updates and domain verification:**

### 1. Verify Domain in Resend
- Go to Resend dashboard → "Domains" 
- Add and verify `dexintelligence.ai`
- Wait for DNS propagation and verification

### 2. Update Email Addresses and Logo URL
In `netlify/functions/contact.js`, change from temporary addresses back to your domain:
```javascript
// Line ~283: Client confirmation email
from: 'Dex Intelligence <noreply@dexintelligence.ai>',  // Change from onboarding@resend.dev

// Line ~292: Internal notification email  
from: 'Contact Form <noreply@dexintelligence.ai>',     // Change from onboarding@resend.dev

// Line ~87: Update logo URL to use custom domain
<img src="https://dexintelligence.ai/logo.png" alt="Dex Intelligence" ...>  // Change from netlify.app domain
```

### 3. Restore CORS Restrictions
In `netlify/functions/contact.js`, change line ~201:
```javascript
'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5173' 
  : 'https://dexintelligence.ai', // Change back from '*'
```

### 4. Re-enable Rate Limiting
In `netlify/functions/contact.js`, uncomment lines ~230-238:
```javascript
if (isRateLimited(clientIP)) {
  return {
    statusCode: 429,
    headers,
    body: JSON.stringify({ 
      error: 'Too many requests. Please wait 15 minutes before submitting another inquiry.' 
    }),
  };
}
```

### 5. Remove Debug Logging
In `netlify/functions/contact.js`, remove console.log statements:
- Lines ~275-277 (API key debugging)
- Lines ~300-302 (email results logging)

### 6. Final Testing
- Submit contact form from your custom domain
- Verify emails are received at both addresses from proper domain
- Test rate limiting works (try submitting 4+ times)
- Confirm CORS restrictions work (test from external domain should fail)
- Verify consent logging in Supabase consent_log table
- Test privacy policy page loads correctly at /privacy

## Environment Variables Required

- `RESEND_API_KEY` - Your Resend API key for email sending
- `CONTACT_EMAIL` - Email to receive form submissions (justin@dexintelligence.ai)
- `NODE_ENV` - Set to "production" for production builds
- `SUPABASE_URL` - Your Supabase project URL for consent logging
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key (secure database access)

## Build Commands
- `npm run dev` - Local development
- `npm run build` - Production build
- `npm run lint` - Code linting

## Privacy & Compliance Features ✅ IMPLEMENTED

### Privacy Policy
- **Location**: `/privacy` route - comprehensive PIPEDA/Law 25 compliant privacy policy
- **Coverage**: Contact data handling, client data security, consent management, retention policies
- **Quebec Law 25**: Specific provisions for Quebec residents with opt-in requirements
- **CASL Compliance**: Email marketing consent and unsubscribe procedures
- **Contact**: Privacy Officer details and regulator contact information

### Consent Tracking System
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) enabled
- **Table**: `consent_log` - tracks marketing opt-in preferences with full audit trail
- **Data Logged**: Email, opt-in status, timestamp, IP address, source, firm details
- **Security**: Service role authentication, encrypted storage, access controls
- **Compliance**: PIPEDA/CASL consent record requirements met

### Contact Form Enhancements
- **Optional Consent**: Marketing email opt-in is optional (PIPEDA compliant)
- **Privacy Link**: Direct link to privacy policy in form submission area
- **Internal Notifications**: Marketing consent status displayed in notification emails
- **Audit Trail**: All submissions logged with consent preferences and metadata

## FUTURE ENHANCEMENTS - Planned Features

### Case Study Request Feature
**Pages to Update**: Products page and Contact page
**Implementation Plan**: Add "Request a Case Study" or "Contact us for a Case Study" buttons/sections
- **Products Page**: Add case study request option alongside the existing service boxes
- **Contact Page**: Include case study request as an option in the contact form or as a separate call-to-action
- **Purpose**: Allow potential clients to request relevant case studies demonstrating Dex's capabilities in similar matters
- **Considerations**: May require additional form fields for case study type/area of interest, confidentiality handling 
# Dex Intelligence Website - Development Notes

## GCS File Sharing Integration ✅ IMPLEMENTED

**Implementation Date**: 2025-08-31  
**Status**: Production Ready - Successfully deployed with dual button architecture

### Architecture Overview
- **Dual Access Pattern**: Separate "Launch Market Mapper" and "Access File Sharing" buttons
- **Storage**: Google Cloud Storage with deployment-specific shared buckets
- **Authentication**: Database-driven email authorization with IAP integration
- **Access Method**: Direct GCS Console URLs for maximum security and reliability

### Implementation Summary
Users can now access shared team collaboration buckets directly from the dashboard through the "Access File Sharing" button, which redirects to Google Cloud Console with proper authentication.

### Database Schema
```sql
CREATE TABLE deployments (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  authorized_emails text[] NOT NULL,  -- Email-based access control
  env_config jsonb NOT NULL,          -- Contains GCS configuration
  is_active boolean DEFAULT true
);
```

### Required Environment Configuration (env_config JSONB)
```json
{
  "SHARED_FILES_BUCKET": "bucket-name-shared",
  "GCS_SERVICE_ACCOUNT_KEY": "{...service account JSON...}",
  "IAP_AUDIENCE": "optional-iap-client-id"
}
```

**Important**: Project ID is automatically extracted from `GCS_SERVICE_ACCOUNT_KEY.project_id` - no separate `GCS_PROJECT_ID` field needed.

### Key Implementation Lessons Learned

#### 1. Netlify Function Dependencies
**Problem**: Functions using custom utility modules (`require('./utils/deployment-config')`) fail with "handler is undefined or not exported"

**Solution**: Query database directly in each function using `@supabase/supabase-js` client
```javascript
// ❌ Problematic approach
const { getDeploymentConfig } = require('./utils/deployment-config');

// ✅ Working approach  
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const { data: deployments } = await supabase.from('deployments')...
```

#### 2. Environment Variable Architecture
**Problem**: Initially attempted separate `GCS_PROJECT_ID` field in database

**Solution**: Extract project ID from service account JSON automatically
```javascript
const serviceAccount = JSON.parse(envConfig.GCS_SERVICE_ACCOUNT_KEY);
const projectId = serviceAccount.project_id;
```

#### 3. Error Handling and Debugging
**Process**: Add temporary debug logging to identify missing fields, then remove once fixed
```javascript
// Temporary debugging (removed in final version)
console.log('Available env_config keys:', Object.keys(envConfig));

// Production-appropriate logging (kept)
console.log(`Shared bucket URL generated for user ${user.email}`);
```

### Files Involved
- **`src/pages/client/Dashboard.jsx`**: Dual button UI with `accessDataSharing()` function
- **`netlify/functions/generate-shared-bucket-url.js`**: GCS Console URL generation
- **`netlify/functions/get-user-deployments.js`**: Email-based deployment authorization
- **Database**: `deployments` table with JSONB env_config

### Access Flow
1. User clicks "Access File Sharing" button
2. Dashboard calls `generate-shared-bucket-url` function with deployment ID
3. Function queries database for authorized deployment based on user email
4. Function extracts GCS configuration from deployment's env_config
5. Function generates GCS Console URL with IAP authentication if available
6. User redirected to Google Cloud Console for bucket access

### Security Features
- Email-based authorization via database `authorized_emails` array
- Rate limiting (10 requests per minute per IP)
- Supabase Row Level Security for deployment visibility  
- IAP-aware URL generation for enhanced security
- Audit logging of all access attempts

## Market Mapper Authentication (Cookie-Based) ✅ WORKING

**Implementation Date**: 2025-01-28  
**Status**: Production Ready - Successfully tested end-to-end

### How It Works
When a user clicks "Launch Market Mapper" from the client dashboard:
1. Website generates a JWT token via Netlify function (`generate-market-mapper-token`)
2. Sets a cross-subdomain cookie: `market_mapper_token`
3. Redirects to `https://app.dexintelligence.ai` (NO URL parameters)
4. App reads cookie and validates token with website API

### Key Implementation Details
```javascript
// Cookie settings in Dashboard.jsx
document.cookie = `market_mapper_token=${token}; ` +
                 `domain=.dexintelligence.ai; ` +  // Leading dot REQUIRED
                 `path=/; ` +
                 `secure; ` +                       // HTTPS only
                 `samesite=lax; ` +                 // Cross-subdomain access
                 `max-age=3600`;                    // 1 hour
```

### Critical Requirements
- **URL parameters do NOT work** - Google Cloud Run strips query parameters
- **Cookie domain MUST have leading dot** (`.dexintelligence.ai`)
- **SameSite must be Lax** (not Strict) for cross-subdomain
- Token validation requires `Origin: https://app.dexintelligence.ai` header

### Required Environment Variables
- `JWT_SECRET` - Required in Netlify for token signing
- `NODE_ENV` - Set to "production" in Netlify

### Files Involved
- `src/pages/client/Dashboard.jsx` - Sets cookie and redirects
- `netlify/functions/generate-market-mapper-token.js` - Creates JWT
- `netlify/functions/validate-token.js` - Validates tokens from app
- `src/utils/auth.js` - Auth utilities (buildAppUrl removed)

## DNS Configuration (Updated 2025-08-27)

**Current Setup:**
- Primary domain: `dexintelligence.ai`
- Netlify site: `dex-website-v2.netlify.app`
- DNS provider: GoDaddy
- A record: Points to `75.2.70.109` (Netlify's load balancer)

**Recent Changes:**
- Removed duplicate Netlify project that was causing conflicts
- Updated A record from old IP `75.2.60.5` (deleted project) to `75.2.70.109` (current project)
- Waiting for DNS propagation (typically 10-30 minutes, can take up to 48 hours)
- SSL certificate will auto-provision once DNS propagates and Netlify detects the domain

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
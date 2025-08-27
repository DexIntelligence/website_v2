# Dex Intelligence Website - Development Notes

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
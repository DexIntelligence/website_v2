# Dex Intelligence Website - Development Notes

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

## Environment Variables Required

- `RESEND_API_KEY` - Your Resend API key for email sending
- `CONTACT_EMAIL` - Email to receive form submissions (justin@dexintelligence.ai)
- `NODE_ENV` - Set to "production" for production builds

## Build Commands
- `npm run dev` - Local development
- `npm run build` - Production build
- `npm run lint` - Code linting

# Privacy Considerations to Implement
- PIPEDA-compliant privacy policy on website
- make website conform with PIPEDA and the other laws 
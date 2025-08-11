# Dex Intelligence Website - Development Notes

## =¨ SECURITY REMINDERS - Before Production

**After deploying to custom domain (`dexintelligence.ca`), restore security settings:**

### 1. CORS Restrictions
In `netlify/functions/contact.js`, change line ~201:
```javascript
'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5173' 
  : 'https://dexintelligence.ca', // Change back from '*'
```

### 2. Rate Limiting
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

### 3. Test After Changes
- Submit contact form from your custom domain
- Verify emails are received at both addresses
- Test rate limiting works (try submitting 4+ times)

## Environment Variables Required

- `RESEND_API_KEY` - Your Resend API key for email sending
- `CONTACT_EMAIL` - Email to receive form submissions (justin@dexintelligence.ca)
- `NODE_ENV` - Set to "production" for production builds

## Build Commands
- `npm run dev` - Local development
- `npm run build` - Production build
- `npm run lint` - Code linting
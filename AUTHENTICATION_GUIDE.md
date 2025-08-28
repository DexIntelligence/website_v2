# Market Mapper Authentication Guide

## CRITICAL: Cookie-Based Authentication Only

**Important**: Query parameters (including authentication tokens) are stripped by Google Cloud Run's infrastructure before reaching the Streamlit application. This is a known limitation when using domain mapping.

**The ONLY working authentication method for production is cookie-based authentication.**

## Overview
**Last Updated**: 2025-01-28  
**Platform**: Google Cloud Run with domain mapping  
**Domain**: app.dexintelligence.ai  
**Architecture**: Redirect-based (NOT iframe)  
**Authentication Method**: Cookie-based ONLY

## Problem Description

When deployed to Google Cloud Run with domain mapping, the application encountered an authentication error:
- The `auth_handler.py` attempted to read browser storage using `st.components.v1.html()`
- This method internally calls `IframeMixin._html()` with arguments that are incompatible with the current Streamlit version
- The error prevented successful authentication even when valid tokens were available

## Technical Details

### Original Issue
```python
# This code caused the error:
state = st.components.v1.html(html_content, height=0)
```

The Streamlit components API has changed, and the HTML component method is no longer compatible with the way it was being used for browser storage access.

### Contributing Factors
1. **Streamlit Version**: Version 1.28.0+ has internal changes to component handling
2. **Security Context**: Browser storage access from iframe components is restricted
3. **Domain Mapping**: Additional security layers when using custom domains

## Solution Implemented

### 1. Removed All URL-Based Authentication
- Deleted `try_state_exchange()` method completely
- Removed `get_state_from_browser_storage()` method
- Removed `exchange_state_for_token()` method
- Cleaned up all pending token capture logic from app.py
- Removed URL parameter checking code

### 2. Cookie-Only Authentication
- `AuthenticationHandler` class now only uses:
  - **check_existing_session()**: Verify existing session state
  - **try_shared_cookie()**: Read and validate domain cookie
- No URL parameter fallback
- No browser storage access
- No state exchange mechanism

### 3. Simplified Authentication Flow
```python
# auth_handler.py authenticate_user() method:
auth_methods = [
    ('session', self.check_existing_session),
    ('cookie', self.try_shared_cookie),  # ONLY METHOD that works in production
]
```

## Required Authentication Approach

### For Production (Google Cloud Run)

**Cookie-based authentication is the ONLY working method**:

```javascript
// Website sets cookie before redirect
document.cookie = `market_mapper_token=${token}; domain=.dexintelligence.ai; secure; samesite=lax; max-age=3600`;

// Then redirect to app
window.location.href = 'https://app.dexintelligence.ai';
```

The cookie will be:
- Available across subdomains (`.dexintelligence.ai`)
- Secure (HTTPS only)
- Protected against CSRF (SameSite=Lax)
- Valid for 1 hour

### URL Tokens Do NOT Work

**CRITICAL**: Do not attempt to pass tokens via URL parameters:

```javascript
// THIS DOES NOT WORK IN PRODUCTION
// Query parameters are stripped by Cloud Run
window.location.href = `https://app.dexintelligence.ai?token=${token}`; // ❌ WILL NOT WORK
```

The token will never reach the application. Google Cloud Run's infrastructure strips all query parameters when using domain mapping.

## Website Implementation Requirements

### Required: Set Cookie Before Redirect

The website MUST set a cookie with the authentication token BEFORE redirecting to the app:

```javascript
// generate-market-mapper-token.js or similar
async function launchMarketMapper() {
    // 1. Generate JWT token
    const token = await generateJWT({
        userId: user.id,
        email: user.email,
        expires: Date.now() + 120000  // 2 minutes
    });
    
    // 2. Set cookie with proper domain
    document.cookie = `market_mapper_token=${token}; ` +
                     `domain=.dexintelligence.ai; ` +  // Note the leading dot
                     `path=/; ` +
                     `secure; ` +                       // HTTPS only
                     `samesite=lax; ` +                 // Allow cross-subdomain
                     `max-age=3600`;                    // 1 hour
    
    // 3. Redirect to app (NO token in URL)
    window.location.href = 'https://app.dexintelligence.ai';
}
```

### Cookie Requirements
- **domain**: Must be `.dexintelligence.ai` (with leading dot) for cross-subdomain
- **secure**: Must be true (HTTPS only)
- **samesite**: Should be `lax` to allow cross-subdomain
- **max-age**: Recommended 3600 seconds (1 hour)

### Token Validation Endpoint

The app validates tokens by calling:
```
POST https://dexintelligence.ai/.netlify/functions/validate-token
Headers:
  Content-Type: application/json
  Origin: https://app.dexintelligence.ai
Body:
  {"token": "<jwt-token>"}
```

**Required**: The validator MUST accept the Origin header.

## Testing the Fix

### Local Testing
```bash
streamlit run app.py
```
- URL parameters will work for testing
- Browser console should show no IframeMixin errors

### Production Testing
1. Deploy to Google Cloud Run:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

2. Test authentication flow:
   - Access via domain mapping
   - Check logs for authentication attempts
   - Verify no IframeMixin errors

3. Monitor logs:
   ```bash
   gcloud run services logs read market-mapper --region=us-central1 --limit=50
   ```

## Verification Checklist

- [ ] No `IframeMixin._html()` errors in logs
- [ ] Cookie set correctly by website (check browser DevTools > Application > Cookies)
- [ ] Cookie has correct domain (`.dexintelligence.ai`)
- [ ] Cookie authentication works on redirect
- [ ] Session persistence maintained on refresh
- [ ] Token validation successful with backend API
- [ ] No references to URL tokens in code
- [ ] No `pending_token` or `token_captured` in session state

## Complete Authentication Flow

### 1. User clicks "Launch Market Mapper" on website
```javascript
// Website generates token and sets cookie
document.cookie = `market_mapper_token=${token}; domain=.dexintelligence.ai; secure; samesite=lax`;
window.location.href = 'https://app.dexintelligence.ai';
```

### 2. App receives request (no URL params)
```python
# app.py - main()
# URL params are empty due to Cloud Run stripping
check_authentication()  # Calls auth_handler
```

### 3. AuthenticationHandler checks cookie
```python
# auth_handler.py - try_shared_cookie()
cookies = CookieController()
token = cookies.get('market_mapper_token')
if token:
    return self.validate_and_store_token(token)
```

### 4. Token validation
```python
# auth_handler.py - validate_and_store_token()
response = requests.post(
    "https://dexintelligence.ai/.netlify/functions/validate-token",
    json={'token': token},
    headers={'Origin': 'https://app.dexintelligence.ai'}
)
```

### 5. Session established
```python
st.session_state.authenticated = True
st.session_state.user_email = data.get('email')
# Cookie remains for future requests
```

## Common Issues and Solutions

### Issue: "Authentication Required" despite valid token
**Cause**: Cookie not set correctly by website  
**Solution**: Ensure cookie domain includes leading dot: `.dexintelligence.ai`

### Issue: Token validation returns 401
**Cause**: Missing Origin header  
**Solution**: Already fixed in auth_handler.py - verify deployment

### Issue: Session lost on refresh
**Cause**: Cookie not persisting  
**Solution**: Check cookie max-age and secure flags

### Issue: Works locally but not in production
**Cause**: Trying to use URL tokens  
**Solution**: URL tokens don't work - must use cookies only

## Deployment Notes

### Environment Variables NOT Needed
The authentication system doesn't require any environment variables:
- No `SUPABASE_URL` needed (state exchange removed)
- No `SUPABASE_ANON_KEY` needed (state exchange removed)
- No `JWT_SECRET` needed (validation done by website API)

### Required Streamlit Dependencies
```python
# requirements.txt
streamlit>=1.28.0
streamlit-cookies-controller>=0.0.4
requests>=2.31.0
```

### Cloud Run Configuration
- No special IAM configuration needed for auth
- Standard Cloud Run deployment
- Domain mapping to app.dexintelligence.ai
- No need for Secret Manager for auth tokens

## Support

For issues or questions:
- Check Cloud Run logs for detailed error messages
- Review Streamlit deployment guide for Cloud Run
- Contact development team with error logs and reproduction steps
# Cookie-Based Authentication Implementation

**Date**: 2025-01-28  
**Status**: ✅ COMPLETE - Cookie-only approach implemented  
**Important**: URL parameters do NOT work in production due to Cloud Run limitations

## ⚡ Quick Reference for Website Team

**What you need to do**: Set a cookie before redirecting to the app.
**Cookie name**: `market_mapper_token`
**Cookie domain**: `.dexintelligence.ai` (with leading dot)
**Then redirect to**: `https://app.dexintelligence.ai` (no URL params)

## 🎯 Current Implementation

### What the Website Does

When a user clicks "Launch Market Mapper" in the dashboard:

1. **Generates secure JWT token** via Netlify function
2. **Sets cookie** with proper cross-subdomain configuration
3. **Redirects** to app.dexintelligence.ai (NO token in URL)

### Code Flow (Dashboard.jsx)

```javascript
const launchMarketMapper = async () => {
  // 1. Get current user and session
  const currentUser = await authService.getUser();
  const session = await authService.getSession();
  
  // 2. Generate secure token via Netlify function
  const response = await fetch('/.netlify/functions/generate-market-mapper-token', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
    },
  });
  
  const { token } = await response.json();
  
  // 3. Set cookie with proper domain configuration
  document.cookie = `market_mapper_token=${token}; ` +
                   `domain=.dexintelligence.ai; ` +  // Leading dot for subdomains
                   `path=/; ` +
                   `secure; ` +                       // HTTPS only
                   `samesite=lax; ` +                 // Allow cross-subdomain
                   `max-age=3600`;                    // 1 hour
  
  // 4. Redirect (NO token in URL)
  window.location.href = 'https://app.dexintelligence.ai';
};
```

## ⏱️ Token & Session Management

### Token Expiry Times
- **JWT Token**: 2 minutes (120000 ms) - short-lived for security
- **Cookie**: 1 hour (3600 seconds) - allows multiple app refreshes
- **App Session**: Persists as long as cookie is valid

### Why Different Expiry Times?
- **Short JWT** (2 min): Minimizes risk if token is intercepted
- **Longer Cookie** (1 hour): User doesn't need to re-authenticate frequently
- **Validation**: App re-validates on each page load, ensuring token is still valid

### Session Refresh Flow
1. User accesses app → Cookie read → Token validated
2. If token expired but cookie valid → Website should generate new token
3. If cookie expired → User must return to dashboard

## 🍪 Cookie Configuration

### Required Settings
- **domain**: `.dexintelligence.ai` (leading dot is CRITICAL)
- **secure**: `true` (HTTPS only)
- **samesite**: `lax` (allows cross-subdomain)
- **max-age**: `3600` (1 hour)
- **path**: `/` (available to all paths)

### Why These Settings Matter
- **Leading dot** (`.dexintelligence.ai`) makes cookie available to all subdomains
- **SameSite=Lax** (not Strict) allows cookie to be sent on redirect
- **Secure flag** ensures HTTPS-only transmission
- **Max-age** provides automatic cleanup

## ⚠️ What NOT to Do

### ❌ Don't Use URL Parameters
```javascript
// THIS WILL NOT WORK IN PRODUCTION
window.location.href = `https://app.dexintelligence.ai?token=${token}`;
```
Cloud Run strips query parameters - they never reach the app.

### ❌ Don't Use localStorage/State Exchange
The state exchange pattern was removed because:
- Added unnecessary complexity
- Browser storage access caused Streamlit errors
- Cookies are more reliable in Cloud Run

### ❌ Don't Use SameSite=Strict
```javascript
// THIS BLOCKS CROSS-SUBDOMAIN COOKIES
document.cookie = `token=${token}; samesite=strict`; // Won't work
```

## ✅ What the App Receives

When the app loads at `app.dexintelligence.ai`:
- **Cookie**: `market_mapper_token` is available
- **URL**: Clean, no parameters
- **Validation**: App validates token with website API

### App-Side Cookie Reading (Streamlit)
```python
# auth_handler.py - try_shared_cookie()
from streamlit_cookies_controller import CookieController
cookies = CookieController()
token = cookies.get('market_mapper_token')

if token:
    # Validate with website API
    response = requests.post(
        'https://dexintelligence.ai/.netlify/functions/validate-token',
        json={'token': token},
        headers={'Origin': 'https://app.dexintelligence.ai'}  # Required!
    )
```

**Note**: The `Origin` header is REQUIRED for validation to work.

## 🔍 Troubleshooting Common Issues

### Issue: "Authentication Required" despite setting cookie
**Cause**: Cookie domain doesn't have leading dot
**Fix**: Ensure domain is `.dexintelligence.ai` not `dexintelligence.ai`

### Issue: Token validation returns 401/403
**Cause**: Missing or incorrect Origin header
**Fix**: App must send `Origin: https://app.dexintelligence.ai` header

### Issue: Cookie not visible in app
**Cause**: SameSite set to Strict instead of Lax
**Fix**: Use `samesite=lax` to allow cross-subdomain

### Issue: Works locally but not in production
**Cause**: Trying to use URL parameters
**Fix**: URL params don't work in Cloud Run - use cookies only

## 🧪 Testing

### Verify Cookie is Set
1. Open DevTools → Application → Cookies
2. Look for `dexintelligence.ai` domain
3. Should see `market_mapper_token` cookie
4. Check domain has leading dot: `.dexintelligence.ai`

### Test Authentication Flow
1. Login to dashboard
2. Click "Launch Market Mapper"
3. App should authenticate automatically
4. No URL parameters should be visible

## 📁 Files Changed

### Updated Files
- `src/pages/client/Dashboard.jsx` - Simplified to cookie-only approach
  - Sets cookie with proper domain configuration
  - Redirects WITHOUT token in URL
  - Added debug logging for verification
- `src/utils/auth.js` - Removed URL token code
  - Deleted `buildAppUrl` function that was adding tokens to URLs
  - Kept only essential auth methods

### Files Deleted (No Longer Needed)
- ✅ `src/utils/authState.js` - Was orphaned, not imported anywhere
- ✅ `netlify/functions/create-auth-state.js` - State exchange not used
- ✅ `netlify/functions/exchange-state.js` - State exchange not used  
- ✅ `supabase/migrations/` - No database tables needed for cookies
- ✅ Test files for state exchange
- ✅ Old documentation files for state exchange pattern

## ✅ Code Review Verification

**Consistency Check Results:**
- ✅ Dashboard.jsx only sets cookies, no URL tokens
- ✅ auth.js has no buildAppUrl or URL token functions
- ✅ authState.js is orphaned (not imported anywhere)
- ✅ No redirects include `?token=` parameters
- ✅ All `window.location.href` assignments use clean URLs
- ✅ No localStorage operations for auth tokens
- ✅ Cookie domain has leading dot: `.dexintelligence.ai`
- ✅ Cookie uses `samesite=lax` for cross-subdomain

## 🔧 Environment Variables Required

### Website (Netlify Functions)
- `JWT_SECRET` - For signing tokens
- `NODE_ENV` - Set to "production"

### App (Cloud Run)
- **None required for authentication!**
- Authentication is stateless via cookie validation
- No JWT_SECRET needed on app side (validation done by website API)

### NOT Required Anymore
- ~~SUPABASE_URL~~ (state exchange removed)
- ~~SUPABASE_SERVICE_KEY~~ (state exchange removed)
- ~~SUPABASE_ANON_KEY~~ (state exchange removed)

## 📊 Summary

| Method | Status | Notes |
|--------|--------|-------|
| Cookie Authentication | ✅ WORKING | Only method that works in production |
| URL Parameters | ❌ REMOVED | Stripped by Cloud Run |
| State Exchange | ❌ REMOVED | Unnecessary complexity |
| localStorage | ❌ REMOVED | Caused Streamlit errors |

## 🚀 Production Ready

The implementation is:
- **Simple**: One cookie, one redirect
- **Secure**: Proper cookie flags and JWT signing
- **Reliable**: Works in Cloud Run environment
- **Clean**: No unnecessary complexity

### Deployment Checklist

**Website Team**:
- [ ] Cookie domain has leading dot: `.dexintelligence.ai`
- [ ] Cookie has `samesite=lax` (not strict)
- [ ] Cookie has `secure=true` for HTTPS
- [ ] Redirect URL has no query parameters
- [ ] JWT token includes userId, email, exp claims
- [ ] Removed `buildAppUrl` function that adds tokens to URLs
- [ ] No token in redirect URL

**App Team**:
- [ ] Using `streamlit-cookies-controller` package
- [ ] Sending `Origin` header with validation requests
- [ ] NOT checking URL parameters for tokens
- [ ] Cookie name matches: `market_mapper_token`

## 🐛 Debugging Cookie Issues

### Changes Made (2025-01-28)

1. **Added Debug Logging** to Dashboard.jsx:
   ```javascript
   console.log('Setting cookie:', cookieString);
   console.log('All cookies after setting:', document.cookie);
   console.log('Redirecting to: https://app.dexintelligence.ai (no token in URL)');
   ```

2. **Removed URL Token Code** from auth.js:
   - Deleted `buildAppUrl` function that was adding `?token=` to URLs
   - This was causing tokens to appear in URLs even though Dashboard wasn't using it

### Testing Cookie Setting

1. **Clear Everything First:**
   - Clear all cookies for dexintelligence.ai
   - Clear localStorage
   - Log out and log back in

2. **Check Console Output:**
   When clicking "Launch Market Mapper", console should show:
   ```
   Setting cookie: market_mapper_token=eyJ...
   All cookies after setting: market_mapper_token=eyJ...
   Redirecting to: https://app.dexintelligence.ai (no token in URL)
   ```

3. **Verify in DevTools:**
   - Go to Application → Cookies → dexintelligence.ai
   - Should see `market_mapper_token` with domain `.dexintelligence.ai`

### If Cookie Is NOT Being Set

**Test in Console:**
```javascript
// Test if cookies work at all
document.cookie = "test=value; domain=.dexintelligence.ai; path=/";
console.log('Cookies:', document.cookie);

// Check secure context (required for secure cookies)
console.log('Secure context?', window.isSecureContext);

// Check current domain
console.log('Domain:', window.location.hostname);
```

**Common Issues:**
- **Not HTTPS**: Secure cookies only work on HTTPS (not http://localhost)
- **Domain mismatch**: Must be on dexintelligence.ai domain
- **Browser blocking**: Check cookie settings, try incognito mode
- **Cache**: Hard refresh (Ctrl+Shift+R) to clear cached JS

### If Token Still Appears in URL

1. **Check for cached code** - Hard refresh browser
2. **Search for other redirects** - Look for any code with `?token=`
3. **Verify deployment** - Ensure latest code is deployed
4. **Check browser network tab** - See if redirect has token

The website now does exactly what's needed for the app team's cookie-based authentication!
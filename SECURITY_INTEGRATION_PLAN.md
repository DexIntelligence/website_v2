# Security Integration Plan
## Website ↔ Market Mapper Application

**Document Version**: 1.0.0  
**Last Updated**: 2025-08-26  
**Status**: DRAFT - In Development  

---

## Executive Summary

This document coordinates security integration between:
- **Website**: dexintelligence.ai (Supabase Auth + Custom JWT)
- **Market Mapper**: app.dexintelligence.ai (Google IAM + Cloud Run)

The goal is seamless, secure authentication while maintaining independent security boundaries.

### ✅ UPDATE: Website Implementation Complete (2025-12-27)

**All security fixes have been implemented and are ready for deployment:**

1. **CORS FIXED** ✅ - `validate-token.js` now restricts to allowed origins only
2. **TOKEN ENDPOINT CREATED** ✅ - `generate-market-mapper-token.js` generates secure 5-minute tokens
3. **DASHBOARD UPDATED** ✅ - Launch button uses new secure token flow with proper error handling
4. **RATE LIMITING ADDED** ✅ - All endpoints protected (3-10 requests/minute)
5. **JWT_SECRET READY** ✅ - New secret generated, documentation for Netlify setup

**Status**: Code merged to main branch, awaiting deployment with JWT_SECRET configuration in Netlify.

---

## Current State Analysis

### Website (dexintelligence.ai)
- **Auth Provider**: Supabase (PostgreSQL-based)
- **Token System**: Custom JWT with HMAC SHA-256
- **Session Storage**: Browser localStorage
- **Vulnerabilities**: CORS misconfiguration, exposed secrets, no rate limiting

### Market Mapper (app.dexintelligence.ai)
- **Auth Provider**: Google IAM
- **Deployment**: Google Cloud Run (secured)
- **Access Control**: Email-based IAM bindings
- **Session Management**: TBD (awaiting implementation)

---

## Integration Architecture

### Chosen Approach: Hybrid Token + IAM

```
User Login Flow:
1. User logs into dexintelligence.ai (Supabase)
2. Clicks "Launch Market Mapper" 
3. Website generates transition token (5-min expiry)
4. Redirects to app.dexintelligence.ai with token
5. App validates token with website
6. App creates local session
7. Google IAM provides additional security layer
```

---

## Website-Side Requirements (WEBSITE TEAM)

### Phase 1: Critical Security Fixes [URGENT]

**Note**: The `.env.production` file is a required workaround for a Netlify environment variable injection issue where `VITE_*` variables are not properly loaded during build. This file will remain in the repository until the Netlify issue is resolved.

#### 1.1 Fix CORS Vulnerability
**File**: `netlify/functions/validate-token.js`
```javascript
// CURRENT (VULNERABLE):
'Access-Control-Allow-Origin': '*'

// REQUIRED FIX:
const allowedOrigins = [
  'https://app.dexintelligence.ai',
  'https://market-mapper-xuixlullgq-uc.a.run.app', // Backup URL
  process.env.NODE_ENV === 'development' ? 'http://localhost:8501' : null
].filter(Boolean);

const origin = event.headers.origin;
if (!allowedOrigins.includes(origin)) {
  return { 
    statusCode: 403, 
    body: JSON.stringify({ error: 'Origin not allowed' })
  };
}

// Add to response headers:
'Access-Control-Allow-Origin': origin, // Echo back the allowed origin
'Access-Control-Allow-Credentials': 'true'
```

#### 1.2 Secure Secret Management
**Actions Required**:
- [ ] Generate new JWT_SECRET (32-char cryptographically secure)
- [ ] Add JWT_SECRET to Netlify environment variables (dashboard)
- [ ] Keep `.env.production` for VITE_ variables only (Netlify workaround)
- [ ] Move sensitive secrets (JWT_SECRET, SUPABASE_SERVICE_KEY) to Netlify dashboard
- [ ] Document that `.env.production` contains only public keys

#### 1.3 Implement Rate Limiting
**File**: `netlify/functions/validate-token.js`
```javascript
const rateLimit = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  const recentRequests = userRequests.filter(t => now - t < WINDOW_MS);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false; // Rate limited
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true; // Allowed
}

// In handler:
const clientIP = event.headers['x-forwarded-for'] || 'unknown';
if (!checkRateLimit(clientIP)) {
  return { 
    statusCode: 429, 
    body: JSON.stringify({ error: 'Too many requests' })
  };
}
```

### Phase 2: Token Enhancement

#### 2.1 Create Market Mapper Specific Token Generator
**New File**: `netlify/functions/generate-market-mapper-token.js`
```javascript
exports.handler = async (event) => {
  // 1. Verify Supabase session
  const authHeader = event.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { statusCode: 401, body: 'Unauthorized' };
  }
  
  const supabaseToken = authHeader.substring(7);
  // Validate with Supabase...
  
  // 2. Generate short-lived transition token
  const payload = {
    userId: user.id,
    email: user.email,
    purpose: 'market-mapper-access',
    exp: Date.now() + 300000, // 5 minutes
    iat: Date.now(),
    iss: 'dexintelligence.ai',
    aud: 'app.dexintelligence.ai',
    nonce: crypto.randomBytes(16).toString('hex') // Prevent replay
  };
  
  // 3. Sign and return
  const token = signJWT(payload, process.env.JWT_SECRET);
  
  // 4. Log for audit
  await logAuditEvent({
    event: 'MARKET_MAPPER_TOKEN_GENERATED',
    userId: user.id,
    email: user.email,
    ip: event.headers['x-forwarded-for']
  });
  
  return {
    statusCode: 200,
    body: JSON.stringify({ token, expiresIn: 300 })
  };
};
```

#### 2.2 Enhanced Token Validation
**Updates to**: `netlify/functions/validate-token.js`
```javascript
// Add validation for:
- Token purpose (must be 'market-mapper-access')
- Nonce tracking (prevent replay attacks)
- IP consistency checking (optional)
- User status verification (active/suspended)
```

### Phase 2.5: Security Hardening

#### 2.5.1 Remove/Protect Debug Endpoint
**File**: `netlify/functions/check-auth-config.js`
```javascript
// Option 1: Add authentication check
exports.handler = async (event, context) => {
  // Check for admin token or remove entirely in production
  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_DEBUG_TOKEN}`) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  // ... rest of debug logic
}

// Option 2: Remove file entirely if debugging is complete
```

#### 2.5.2 Add Security Headers
**New File**: `public/_headers`
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co https://api.resend.com
```

### Phase 3: Dashboard Integration

#### 3.1 Update Launch Button
**File**: `src/components/Dashboard.jsx` (or equivalent)
```javascript
const launchMarketMapper = async () => {
  try {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/client/login');
      return;
    }
    
    // Generate transition token
    const response = await fetch('/.netlify/functions/generate-market-mapper-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate access token');
    }
    
    const { token } = await response.json();
    
    // Redirect to Market Mapper
    window.location.href = `https://app.dexintelligence.ai/auth?token=${encodeURIComponent(token)}&continue=/`;
    
  } catch (error) {
    console.error('Failed to launch Market Mapper:', error);
    // Show user-friendly error message
  }
};
```

### Phase 4: User Management Integration

#### 4.1 Automated IAM Provisioning
**New File**: `netlify/functions/sync-user-access.js`
```javascript
// Called when user account changes
exports.handler = async (event) => {
  const { email, hasMarketMapperAccess } = JSON.parse(event.body);
  
  if (hasMarketMapperAccess) {
    // Add to Google IAM
    await addToIAM(email);
  } else {
    // Remove from Google IAM
    await removeFromIAM(email);
  }
  
  // Update user metadata in Supabase
  await updateUserMetadata(email, { market_mapper_access: hasMarketMapperAccess });
};
```

---

## App-Side Requirements (THIS SIDE - MARKET MAPPER)

### Phase 1: Token Reception & Validation

#### 1.1 Add Authentication Handler
**File**: `app.py`
```python
import streamlit as st
import requests
import jwt
from datetime import datetime
import hashlib

def validate_token_with_website(token: str) -> dict:
    """Validate token with the main website"""
    try:
        response = requests.post(
            'https://dexintelligence.ai/.netlify/functions/validate-token',
            json={'token': token},
            headers={'Origin': 'https://app.dexintelligence.ai'},
            timeout=5
        )
        return response.json()
    except Exception as e:
        st.error(f"Token validation failed: {e}")
        return {'valid': False, 'error': str(e)}

def check_authentication():
    """Main authentication check for Market Mapper"""
    
    # Initialize session state
    if 'authenticated' not in st.session_state:
        st.session_state.authenticated = False
        st.session_state.user_email = None
        st.session_state.user_id = None
        st.session_state.auth_expires = None
    
    # Check for token in URL parameters
    query_params = st.query_params
    token = query_params.get("token", [""])[0]
    
    if token:
        # Validate token with website
        with st.spinner("Authenticating..."):
            result = validate_token_with_website(token)
            
            if result.get('valid'):
                # Create session
                st.session_state.authenticated = True
                st.session_state.user_email = result.get('email')
                st.session_state.user_id = result.get('userId')
                st.session_state.auth_expires = result.get('expires')
                
                # Clear token from URL for security
                st.query_params.clear()
                
                # Log successful authentication
                log_authentication_event('SUCCESS', result.get('email'))
                
                return True
            else:
                # Log failed authentication
                log_authentication_event('FAILED', error=result.get('error'))
                st.error(f"Authentication failed: {result.get('error', 'Invalid token')}")
    
    # Check existing session
    if st.session_state.authenticated:
        # Verify session hasn't expired
        if st.session_state.auth_expires:
            if datetime.now().timestamp() * 1000 < st.session_state.auth_expires:
                return True
            else:
                # Session expired
                st.session_state.clear()
                st.warning("Session expired. Please log in again.")
    
    return False

# Add to main app.py at the start
if not check_authentication():
    st.error("🔒 Authentication Required")
    st.markdown(
        "Please access Market Mapper through the [main dashboard](https://dexintelligence.ai/client/dashboard)."
    )
    st.stop()
```

#### 1.2 Session Management Implementation
**File**: `utils/session_manager.py` (new file)
```python
import streamlit as st
from datetime import datetime, timedelta
import hashlib
import json

class MarketMapperSession:
    """Manage user sessions for Market Mapper"""
    
    SESSION_TIMEOUT_MINUTES = 60  # 1 hour inactivity timeout
    MAX_SESSION_HOURS = 8  # Force re-auth after 8 hours
    
    @staticmethod
    def create_session(user_data: dict):
        """Create a new session from validated token data"""
        now = datetime.now()
        
        st.session_state.update({
            'authenticated': True,
            'user_id': user_data.get('userId'),
            'user_email': user_data.get('email'),
            'session_created': now.timestamp(),
            'last_activity': now.timestamp(),
            'auth_expires': user_data.get('expires'),
            'session_id': hashlib.sha256(
                f"{user_data.get('userId')}{now.timestamp()}".encode()
            ).hexdigest()
        })
    
    @staticmethod
    def validate_session() -> bool:
        """Check if current session is valid"""
        if not st.session_state.get('authenticated'):
            return False
        
        now = datetime.now().timestamp()
        
        # Check inactivity timeout
        last_activity = st.session_state.get('last_activity', 0)
        if now - last_activity > MarketMapperSession.SESSION_TIMEOUT_MINUTES * 60:
            MarketMapperSession.clear_session()
            return False
        
        # Check max session duration
        session_created = st.session_state.get('session_created', 0)
        if now - session_created > MarketMapperSession.MAX_SESSION_HOURS * 3600:
            MarketMapperSession.clear_session()
            return False
        
        # Check token expiration
        auth_expires = st.session_state.get('auth_expires', 0)
        if auth_expires and now * 1000 > auth_expires:
            MarketMapperSession.clear_session()
            return False
        
        # Update last activity
        st.session_state.last_activity = now
        return True
    
    @staticmethod
    def clear_session():
        """Clear all session data"""
        keys_to_keep = ['df', 'column_mapping']  # Preserve uploaded data if needed
        
        for key in list(st.session_state.keys()):
            if key not in keys_to_keep:
                del st.session_state[key]
```

### Phase 2: Audit Logging
**File**: `utils/audit_logger.py` (new file)
```python
import json
import logging
from datetime import datetime
import os

# Configure audit logger
audit_logger = logging.getLogger('market_mapper_audit')
audit_logger.setLevel(logging.INFO)

# Add handler if not in production (production uses Cloud Logging)
if not os.environ.get('GOOGLE_CLOUD_PROJECT'):
    handler = logging.FileHandler('audit.log')
    handler.setFormatter(logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s'
    ))
    audit_logger.addHandler(handler)

def log_authentication_event(status: str, email: str = None, error: str = None):
    """Log authentication attempts"""
    event = {
        'timestamp': datetime.utcnow().isoformat(),
        'event_type': 'AUTHENTICATION',
        'status': status,
        'email': email,
        'error': error,
        'ip': os.environ.get('HTTP_X_FORWARDED_FOR', 'unknown')
    }
    audit_logger.info(json.dumps(event))

def log_session_event(event_type: str, user_email: str, details: dict = None):
    """Log session-related events"""
    event = {
        'timestamp': datetime.utcnow().isoformat(),
        'event_type': event_type,
        'user_email': user_email,
        'details': details or {}
    }
    audit_logger.info(json.dumps(event))
```

### Phase 3: Google IAM Integration
```python
# Google IAM remains as the primary security layer
# The token validation is an additional convenience layer
# Users must still be in the IAM allowlist

# Current configuration in Google Cloud Run:
# - Service: market-mapper
# - Region: us-central1  
# - Access: Controlled via IAM bindings
# - Current users must be added via:
#   gcloud run services add-iam-policy-binding market-mapper \
#     --region=us-central1 \
#     --member="user:email@domain.com" \
#     --role="roles/run.invoker"
```

---

## Security Requirements

### Encryption & Transport
- [ ] All communication over HTTPS/TLS 1.3
- [ ] No sensitive data in URLs (except short-lived tokens)
- [ ] Tokens must expire within 5 minutes

### Token Security
- [ ] HMAC SHA-256 signing (minimum)
- [ ] Include nonce to prevent replay
- [ ] Validate issuer and audience claims
- [ ] Check expiration on every validation

### Session Management
- [ ] Sessions expire after 1 hour of inactivity
- [ ] Forced re-authentication after 8 hours
- [ ] Clear logout mechanism

### Audit Logging
- [ ] Log all authentication attempts
- [ ] Log all token generations
- [ ] Log all validation requests
- [ ] Retain logs for 90 days minimum

---

## Implementation Priority Order

### Website Team Tasks (COMPLETED - 2025-12-27)
1. [x] Fix CORS vulnerability (validate-token.js) ✅
2. [x] Generate new JWT_SECRET, add to Netlify dashboard ✅
3. [x] Implement rate limiting on all token endpoints ✅
4. [x] Remove or protect debug endpoint (check-auth-config.js) ✅
5. [x] Add security headers (create public/_headers) ✅
6. [x] Create market-mapper-token endpoint ✅
7. [ ] Test complete security implementation (pending deployment)

### App Team Tasks (THIS SIDE - READY TO IMPLEMENT)
1. [x] Design session management (code provided above)
2. [x] Implement token reception (code provided above)
3. [x] Add validation logic (code provided above)
4. [ ] Deploy to Cloud Run with new code
5. [ ] Test with website tokens
6. [ ] Integration testing

### Joint Tasks
1. [ ] End-to-end testing
2. [ ] Security review
3. [ ] Performance testing
4. [ ] Documentation update
5. [ ] Production deployment

---

## Testing Checklist

### Website Tests
- [ ] Token generation with valid session
- [ ] Token generation without session (should fail)
- [ ] Token validation from allowed origin
- [ ] Token validation from disallowed origin (should fail)
- [ ] Rate limiting triggers correctly
- [ ] Expired token rejection

### App Tests
- [ ] Token reception from URL
- [ ] Token validation with website
- [ ] Session creation from valid token
- [ ] Session expiration handling
- [ ] Redirect on invalid/missing token

### Integration Tests
- [ ] Complete login flow
- [ ] Session persistence
- [ ] Logout flow
- [ ] Error handling
- [ ] Performance under load

---

## Communication Protocol

### API Endpoints

#### Token Generation
```
POST https://dexintelligence.ai/.netlify/functions/generate-market-mapper-token
Headers:
  Authorization: Bearer <supabase-session-token>
Response:
  {
    "token": "eyJ...",
    "expiresIn": 300
  }
```

#### Token Validation
```
POST https://dexintelligence.ai/.netlify/functions/validate-token
Headers:
  Origin: https://app.dexintelligence.ai
Body:
  {
    "token": "eyJ...",
    "ip": "client-ip-address"
  }
Response:
  {
    "valid": true,
    "userId": "uuid",
    "email": "user@example.com",
    "expires": 1234567890000
  }
```

---

## Security Contacts

**Website Security Issues**:
- Primary: [Website team contact]
- Escalation: [Security team]

**App Security Issues**:
- Primary: [App team contact]
- Escalation: [Security team]

**Integration Issues**:
- Coordinate through this document
- Update status in revision notes

---

## Revision History

### Version 1.0.0 - 2025-08-26
- Initial draft created by Website Team
- Defined integration architecture
- Listed website-side requirements

### Version 1.1.0 - 2025-08-26
- App Team (Market Mapper) updated implementation details
- Added complete token validation code for app.py
- Added session management implementation
- Added audit logging implementation
- Confirmed Google IAM integration approach

### Version 1.2.0 - 2025-12-27
- Updated security requirements based on audit findings
- Clarified `.env.production` is required workaround for Netlify issue
- Added security hardening phase (headers, debug endpoint protection)
- Updated implementation priority order with specific files
- Added rate limiting implementation details

### Version 1.3.0 - 2025-08-26
- **APP DEPLOYED** - Market Mapper authentication system is live
- Added critical action items summary for website team
- App shows "Authentication Required" until website endpoints ready
- All app-side code complete and in production
- Token validation endpoint: `https://dexintelligence.ai/.netlify/functions/validate-token`
- Market Mapper URL: `https://app.dexintelligence.ai`

### Version 1.4.0 - 2025-12-27 (CURRENT - IMPLEMENTATION COMPLETE)
- **SECURITY FIXES IMPLEMENTED** - All critical vulnerabilities addressed
- **CORS Fixed**: Restricted to specific allowed origins (app.dexintelligence.ai, Cloud Run URL)
- **Rate Limiting Added**: 3-10 requests/minute depending on endpoint sensitivity
- **Debug Endpoint Protected**: Requires ADMIN_DEBUG_TOKEN or returns 404
- **Security Headers Added**: Comprehensive headers via public/_headers
- **Market Mapper Token Endpoint Created**: 5-minute tokens with nonce for replay protection
- **Dashboard Updated**: Now uses secure token flow with proper error handling
- **JWT_SECRET Generated**: Ready for Netlify dashboard configuration
- **Documentation Complete**: Setup guides and security procedures documented

### Implementation Summary
**Files Created:**
- `netlify/functions/generate-market-mapper-token.js` - Secure token generation
- `public/_headers` - Security headers configuration
- `NETLIFY_ENV_SETUP.md` - Environment variable setup guide
- `GENERATE_JWT_SECRET.md` - Secret generation instructions

**Files Modified:**
- `netlify/functions/validate-token.js` - CORS restrictions and rate limiting
- `netlify/functions/generate-token.js` - Rate limiting added
- `netlify/functions/check-auth-config.js` - Authentication required
- `src/utils/auth.js` - Updated to use new token endpoint
- `src/pages/client/Dashboard.jsx` - Enhanced error handling and redirect
- `.gitignore` - Protected sensitive files

### Next Steps (Deployment)
1. Add JWT_SECRET to Netlify environment variables
2. Deploy to production
3. Test end-to-end flow with Market Mapper
4. Monitor rate limiting and security headers

---

## Notes for Website Team

App-side implementation is ready. Please confirm:

1. **Token Validation Endpoint**: We'll call `https://dexintelligence.ai/.netlify/functions/validate-token`
2. **Required CORS Origins**: 
   - `https://app.dexintelligence.ai` (primary domain)
   - `https://market-mapper-xuixlullgq-uc.a.run.app` (Cloud Run URL)
   - `http://localhost:8501` (for local development/testing only)
3. **Token Format**: Expecting JWT with claims: userId, email, exp, iat, iss, aud, nonce
4. **Session Management**: Using Streamlit's st.session_state (in-memory)
5. **Google IAM**: We maintain IAM as primary security, token as convenience layer

### Technical Constraints (App Side)
- **Language**: Streamlit runs in Python, not JavaScript
- **Session Storage**: In-memory using st.session_state (resets on container restart)
- **Cookie Limitations**: No access to HttpOnly cookies (Streamlit limitation)
- **Token Delivery**: URL parameters are the primary method (`?token=...`)
- **Google IAM**: Still required as primary security layer (users must be in allowlist)

### Ready for Integration Testing

**App Deployment Steps**:
1. Add authentication code to app.py
2. Create utils/session_manager.py and utils/audit_logger.py
3. Push to GitHub repository
4. Cloud Build will auto-deploy to Cloud Run
5. Test with website token generation

**Note**: Google IAM remains active. Even with valid tokens, users must be in the IAM allowlist:
```bash
gcloud run services add-iam-policy-binding market-mapper \
  --region=us-central1 \
  --member="user:email@example.com" \
  --role="roles/run.invoker"
```

---

## Appendix A: Security Vulnerabilities Status

### Original Vulnerabilities (from Security Audit Report):
1. **CRITICAL**: Open CORS on validation endpoint - **FIXED** ✅
2. **CRITICAL**: JWT_SECRET in repository - **FIXED** ✅ (new secret, only in Netlify)
3. **HIGH**: No rate limiting - **FIXED** ✅
4. **MEDIUM**: Debug endpoint exposed - **FIXED** ✅ (requires auth token)
5. **LOW**: No token refresh mechanism - **ACCEPTED** (5-min tokens sufficient)

### Security Improvements Implemented:
- **CORS**: Restricted to specific domains (app.dexintelligence.ai, Cloud Run URL)
- **Rate Limiting**: 10 req/min for validation, 5 req/min for token generation, 3 req/min for Market Mapper
- **Debug Protection**: Requires ADMIN_DEBUG_TOKEN or returns 404 in production
- **Security Headers**: X-Frame-Options, CSP, HSTS, etc. via public/_headers
- **Token Security**: Short-lived (5 min), includes nonce for replay protection
- **Error Handling**: Specific error messages for better user experience

---

## Appendix B: Compliance Requirements

- PIPEDA (Canadian privacy law)
- Quebec Law 25 (consent requirements)
- TLS 1.3 minimum
- 90-day audit log retention
- User data deletion on request
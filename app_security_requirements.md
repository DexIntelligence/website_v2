Integration Requirements for Website Engineering Team

  Overview

  We need to integrate a Google Cloud Run application (Market Mapper) into a secure
  section of the website via domain mapping. The application is a Streamlit-based web
   tool that requires authentication before access.

  Current Application Status

  - Platform: Google Cloud Run (containerized Streamlit app)
  - Current URL: https://market-mapper-[hash].run.app (secured, not public)
  - Target URL: app.yourdomain.com or yourdomain.com/market-mapper
  - Session Management: Application maintains its own session state per user
  - Port: 8501 (Streamlit default)

  DNS Requirements

  Your team will need to:
  1. Create subdomain: app.yourdomain.com (recommended) or configure path-based
  routing
  2. Add CNAME record: Point to ghs.googlehosted.com (Google will provide exact
  value)
  3. SSL Certificate: Google auto-provisions this (no action needed)
  4. DNS Propagation: Allow 1-2 hours for changes to propagate

  Authentication Integration Options

  Option A: Token-Based Authentication (Recommended)

  Your website needs to:
  1. Authenticate users through existing login system
  2. Generate temporary access token (JWT or similar) with expiration
  3. Redirect to app with token:
  https://app.yourdomain.com?token=xyz123&expires=timestamp

  Example implementation:
  // After user authentication on main site
  const token = generateSecureToken({
      userId: user.id,
      email: user.email,
      expires: Date.now() + 3600000, // 1 hour
      signature: hmacSign(data, SECRET_KEY)
  });

  // Redirect to Streamlit app
  window.location.href = `https://app.yourdomain.com?token=${token}`;

  We will validate tokens by:
  - Checking signature authenticity
  - Verifying expiration
  - Optional: Call back to your API to validate

  Option B: Shared Session Cookie

  Your website needs to:
  1. Set authentication cookie with domain: .yourdomain.com (note the leading dot)        
  2. Include session identifier that we can validate
  3. Ensure cookie is HttpOnly and Secure

  Example cookie settings:
  res.cookie('auth_session', sessionId, {
      domain: '.yourdomain.com',  // Makes it accessible to subdomains
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600000
  });

  Option C: Iframe Embedding with PostMessage

  Your website needs to:
  1. Create secure page with iframe: <iframe src="https://app.yourdomain.com">
  2. Pass authentication via postMessage
  3. Handle bi-directional communication

  Example:
  // Parent page
  const iframe = document.getElementById('market-mapper-frame');
  iframe.onload = () => {
      iframe.contentWindow.postMessage({
          type: 'auth',
          token: userToken,
          userId: userId
      }, 'https://app.yourdomain.com');
  };

  Security Requirements

  Minimum Requirements

  - HTTPS only - All communication must be encrypted
  - Authentication required - No anonymous access
  - Token/Session validation - Must verify user authorization
  - Expiration handling - Sessions/tokens must expire

  Recommended Security Headers

  Add these headers to your secure section:
  X-Frame-Options: SAMEORIGIN (if using iframe)
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: frame-ancestors 'self' (if embedding)

  API Endpoint Requirements (If Using Token Validation)

  If you choose token-based auth, we may need an endpoint to validate tokens:

  POST https://yourdomain.com/api/validate-token
  Headers:
    Content-Type: application/json
  Body:
    {
      "token": "xyz123",
      "ip": "user-ip-address"
    }
  Response:
    {
      "valid": true,
      "userId": "12345",
      "email": "user@example.com",
      "expires": 1234567890
    }

  User Experience Flow

  1. User logs into main website
  2. Navigates to "Market Mapper" or "Analysis Tool" section
  3. Website validates user has appropriate permissions
  4. Website generates secure token/session
  5. User is redirected or iframe loads with authentication
  6. Streamlit app validates credentials and grants access
  7. Session persists for duration of token/cookie validity

  Technical Coordination Points

  We need from you:
  1. Subdomain or path where app will be accessible
  2. Authentication method preference (token vs cookie vs iframe)
  3. Format of authentication tokens/sessions
  4. Validation endpoint URL (if using token validation)
  5. List of authorized user roles/permissions
  6. Session timeout preferences

  You will receive from us:
  1. Exact DNS records to configure
  2. Health check endpoint for monitoring
  3. Usage metrics endpoint (if needed)
  4. Error handling specifications
  5. Test credentials for integration testing

  Testing Plan

  1. DNS Verification: Confirm subdomain resolves correctly
  2. Auth Flow Test: Test login → redirect → access flow
  3. Session Persistence: Verify sessions maintain state
  4. Timeout Handling: Test expired token behavior
  5. Error Scenarios: Test invalid tokens, network issues
  6. Load Testing: Verify multi-user concurrent access

  Monitoring & Support

  Health Check Endpoint: https://app.yourdomain.com/_stcore/health
  - Returns 200 OK when healthy
  - Can be monitored by your existing tools

  Logging:
  - Application logs available in Google Cloud Console
  - Can integrate with your centralized logging if needed

  Performance Metrics:
  - Response times typically <1s (after cold start)
  - Cold start: 10-15 seconds (first request)
  - Recommend keeping one instance warm if critical

  Timeline Considerations

  1. Domain verification: 10-30 minutes
  2. DNS propagation: 1-2 hours typically
  3. SSL certificate: 15-30 minutes (automatic)
  4. Integration development: Depends on auth complexity
  5. Testing: Allow 2-4 hours for thorough testing

  Contact for Technical Issues

  During integration, issues may arise with:
  - CORS policies (we can adjust on our end)
  - Cookie settings (may need SameSite adjustments)
  - Token format (we can adapt to your format)
  - Rate limiting (we can whitelist your IPs)

  Please provide a technical contact for coordination during the integration phase.
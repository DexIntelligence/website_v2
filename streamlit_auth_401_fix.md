# Fix: Streamlit shows “Authentication failed: HTTP 401” after dashboard launch

**Audience:** App engineer  
**Goal:** Make the app accept the dashboard token by sending the proper `Origin` header to the Netlify `validate-token` function, and remove the deprecation warning in Streamlit.

---

## TL;DR (do these now)

1. **Add `Origin: https://app.dexintelligence.ai`** to the POST your app makes to the Netlify `validate-token` function.
2. Replace `st.experimental_get_query_params()` with `st.query_params`, and **clear** query params after successful auth.
3. Verify with the curl tests below. If still 401, use the troubleshooting checklist at the end.

Why this works: Browsers include an `Origin` header automatically, but server-side calls (Python `requests`) **don’t**. Our validator enforces an origin allowlist; without the `Origin` header, it returns **401**.

---

## 1) Streamlit patch (Python)

**File:** wherever you validate the token in the app (e.g., `auth.py` or `app.py`).

### A) Add `Origin` header to the validator request

```python
import requests

VALIDATOR_URL = "https://dexintelligence.ai/.netlify/functions/validate-token"

def validate_token_with_website(token: str) -> dict:
    try:
        resp = requests.post(
            VALIDATOR_URL,
            json={"token": token},
            headers={
                "Content-Type": "application/json",
                "Origin": "https://app.dexintelligence.ai",  # required by validator CORS/origin check
                "User-Agent": "market-mapper/1.0"
            },
            timeout=8,
        )
        # Log-friendly parse: if not JSON, surface raw body
        if "application/json" in resp.headers.get("content-type", "").lower():
            data = resp.json()
        else:
            data = {"valid": False, "error": f"non_json_response", "raw": resp.text[:200]}
    except Exception as e:
        return {"valid": False, "error": f"request_error: {e}"}

    # Normalize on 200 + valid:true
    if resp.status_code != 200 or not data.get("valid"):
        return {"valid": False, "error": f"http_{resp.status_code}", "details": data}
    return data
```

### B) Replace deprecated query param API and clear on success

```python
import streamlit as st

# Old (remove):
# query_params = st.experimental_get_query_params()

# New:
query_params = st.query_params
token = query_params.get("token")
if isinstance(token, list):  # if coming in as list
    token = token[0]

if token:
    result = validate_token_with_website(token)
    if result.get("valid"):
        # Clear token from URL to avoid leaking in logs/referrers
        st.query_params.clear()
        # proceed to app...
    else:
        st.error(f"Authentication failed: {result.get('error')}")
        if result.get("details"):
            st.write(result["details"])  # optional: show debug while testing
else:
    st.warning("🔒 Authentication Required")
    st.markdown("[Go to Dashboard](https://dexintelligence.ai/)")
```

> Note: Only show detailed `result["details"]` during debugging; remove or guard behind a developer flag for production.

---

## 2) Quick verification (copy/paste)

Pick a *fresh* token from the URL when launching via the dashboard.

```bash
# Replace with a current token
TOKEN='<PASTE_TOKEN>'

# A) Without Origin (should fail with 401 if validator enforces origin)
curl -i -X POST https://dexintelligence.ai/.netlify/functions/validate-token   -H 'Content-Type: application/json'   --data "{"token":"$TOKEN"}"

# B) With Origin (should return 200 and {"valid": true, ...})
curl -i -X POST https://dexintelligence.ai/.netlify/functions/validate-token   -H 'Content-Type: application/json'   -H 'Origin: https://app.dexintelligence.ai'   --data "{"token":"$TOKEN"}"
```

If **A=401** and **B=200**, the Streamlit patch above fixes the app path.

---

## 3) Optional: tighten Streamlit UX

- After successful auth, we already **clear** the URL query (`st.query_params.clear()`).
- Consider hiding verbose errors behind a `DEBUG_AUTH` env flag.

---

## 4) Environment & claims sanity (if still 401)

If the patch doesn’t resolve it, check these in Netlify and token payload:

- **JWT secret alignment**
  - `JWT_SECRET` present in Netlify env (Production) and used by both **token generator** and **validator**.
- **Claims present and correct**
  - `iss: "dexintelligence.ai"`
  - `aud: "app.dexintelligence.ai"`
  - `purpose: "market-mapper-access"`
  - `exp` in the future (very short TTL by design)
- **Right generator function**
  - Dashboard uses the newer generator (with `purpose/aud/nonce`) not an older one.

---

## 5) After we move to IAP + Load Balancer

When IAP is enabled in front of the app:

- **Remove** temporary public access on Cloud Run (`allUsers` → `roles/run.invoker`) so IAP is the outer wall.
- This Streamlit validator flow remains unchanged; the `Origin` header is still required by the Netlify validator.

---

## 6) Minimal diff (for PR)

```diff
- query_params = st.experimental_get_query_params()
+ query_params = st.query_params

- resp = requests.post(VALIDATOR_URL, json={"token": token}, timeout=8)
+ resp = requests.post(
+     VALIDATOR_URL,
+     json={"token": token},
+     headers={
+         "Content-Type": "application/json",
+         "Origin": "https://app.dexintelligence.ai",
+         "User-Agent": "market-mapper/1.0",
+     },
+     timeout=8,
+ )

+ # On success, scrub URL
+ st.query_params.clear()
```

---

## 7) Troubleshooting checklist

- ✅ Curl with and without `Origin` to confirm validator behavior.  
- ✅ Inspect Netlify logs for the validator: confirm the branch/context is using the **same `JWT_SECRET`** as the generator.  
- ✅ Decode the JWT to verify **`iss`/`aud`/`purpose`/`exp`**.  
- ✅ Ensure the browser launch path is using the **new token generator**.  
- ✅ If tokens look valid but validator still 401s, temporarily log the reject reason inside the validator (signature vs claims vs origin) and re-test.  
- ✅ Regenerate a token (avoid stale tokens; TTL is short).

---

**Owner:** App engineer  
**Success criteria:** App accepts a fresh dashboard token, removes the 401 banner, and the deprecation warning is gone.

---

## 8) Website Manager Action Items

### ✅ Website-side fixes completed (2025-08-27)
All required fixes have been implemented on the website side:
- Fixed token expiry validation bug (was comparing seconds to milliseconds)
- Confirmed token expiry set to 2 minutes (120000 ms)
- Both functions now correctly handle JWT exp claim in seconds
- JWT_SECRET hardcoded as fallback due to Netlify env var issues

### ✅ App-side fixes completed (2025-08-27)
The Market Mapper app has been updated with all required fixes:
- Added proper `Origin`, `Content-Type`, and `User-Agent` headers to validation requests
- Replaced deprecated `st.experimental_get_query_params()` with `st.query_params`
- Token is now cleared from URL after successful authentication
- Better error handling and debug output for troubleshooting

### ⚠️ Website-side verification needed

Please verify these items on the website side to ensure authentication works:

1. **Token Generator Function** (`generate-market-mapper-token.js`):
   - Confirm token expiry is set to **2 minutes** (120000 ms)
   - Verify response includes `expiresIn: 120` 
   - Ensure all required claims are present: `userId`, `email`, `purpose`, `exp`, `iat`, `iss`, `aud`, `nonce`

2. **Token Validator Function** (`validate-token.js`) ✅ FIXED:
   - Confirm allowed origins include both:
     - `https://app.dexintelligence.ai`
     - `https://market-mapper-xuixlullgq-uc.a.run.app`
   - Verify JWT_SECRET is properly set in Netlify environment variables
   - Check that validator accepts `Origin` header (not blocking requests with it)

3. **Dashboard Launch Button**:
   - Confirm it calls the new token generator (not an older version)
   - Verify redirect URL is: `https://app.dexintelligence.ai?token=...`
   - Check that token generation happens on button click (not page load)

### 🔍 Quick validation test from website side

```bash
# Generate a token from your dashboard, then test:
TOKEN='<paste-fresh-token-here>'

# This should return {"valid": true, ...}
curl -X POST https://dexintelligence.ai/.netlify/functions/validate-token \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://app.dexintelligence.ai' \
  -d "{\"token\":\"$TOKEN\"}"
```

If this returns 401 or `{"valid": false}`, check the validator's CORS/origin configuration.

### 📝 Google Cloud IAM Note
The SECURITY_INTEGRATION_PLAN.md indicates Google IAM is set to `allUsers` (public access), relying entirely on token security. If users still get "Forbidden" errors after successful token validation, verify:
- Cloud Run service has `allUsers` with `roles/run.invoker` role
- No additional IAM restrictions are blocking access

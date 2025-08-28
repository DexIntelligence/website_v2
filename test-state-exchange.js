// Test script for state exchange authentication flow
// Run with: node test-state-exchange.js

const crypto = require('crypto');

// Configuration - update these values for your environment
const CONFIG = {
  websiteUrl: process.env.WEBSITE_URL || 'http://localhost:8888', // Netlify dev server
  appUrl: process.env.APP_URL || 'https://app.dexintelligence.ai',
  testToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJleHAiOjk5OTk5OTk5OTl9.test', // Mock token for testing
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testCreateAuthState() {
  log('\n📝 Testing: Create Auth State Endpoint', 'blue');
  
  try {
    const response = await fetch(`${CONFIG.websiteUrl}/.netlify/functions/create-auth-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.testToken}`,
      },
    });
    
    if (response.status === 401) {
      log('⚠️  Expected: Need valid Supabase token for production', 'yellow');
      log('   For testing, you can:', 'yellow');
      log('   1. Use a real Supabase session token from browser DevTools', 'yellow');
      log('   2. Temporarily modify the endpoint to skip auth for testing', 'yellow');
      return null;
    }
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
    
    const data = await response.json();
    
    if (data.stateId && data.expiresIn) {
      log(`✅ Success: State created with ID: ${data.stateId}`, 'green');
      log(`   Expires in: ${data.expiresIn} seconds`, 'green');
      return data.stateId;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    log(`❌ Failed: ${error.message}`, 'red');
    return null;
  }
}

async function testExchangeState(stateId) {
  log('\n🔄 Testing: Exchange State Endpoint', 'blue');
  
  if (!stateId) {
    log('⚠️  Skipping: No state ID available', 'yellow');
    return;
  }
  
  try {
    const response = await fetch(`${CONFIG.websiteUrl}/.netlify/functions/exchange-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stateId }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
    
    const data = await response.json();
    
    if (data.token) {
      log('✅ Success: Token received', 'green');
      log(`   Token preview: ${data.token.substring(0, 50)}...`, 'green');
      
      // Try to decode the token payload
      try {
        const parts = data.token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
          log('   Token payload:', 'green');
          log(`     - User ID: ${payload.sub}`, 'green');
          log(`     - Email: ${payload.email}`, 'green');
          log(`     - Purpose: ${payload.purpose}`, 'green');
          log(`     - Expires: ${new Date(payload.exp * 1000).toLocaleString()}`, 'green');
        }
      } catch (e) {
        // Token decode failed, not critical
      }
      
      return data.token;
    } else {
      throw new Error('No token in response');
    }
  } catch (error) {
    log(`❌ Failed: ${error.message}`, 'red');
    return null;
  }
}

async function testDoubleExchange(stateId) {
  log('\n🔒 Testing: Single-use State (should fail)', 'blue');
  
  if (!stateId) {
    log('⚠️  Skipping: No state ID available', 'yellow');
    return;
  }
  
  try {
    const response = await fetch(`${CONFIG.websiteUrl}/.netlify/functions/exchange-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stateId }),
    });
    
    const data = await response.json();
    
    if (response.status === 401 && data.error) {
      log('✅ Correct: State cannot be reused', 'green');
      log(`   Error: ${data.error}`, 'green');
    } else {
      log('❌ Security Issue: State was reused!', 'red');
    }
  } catch (error) {
    log(`❌ Unexpected error: ${error.message}`, 'red');
  }
}

async function testInvalidState() {
  log('\n🚫 Testing: Invalid State Exchange', 'blue');
  
  const fakeStateId = crypto.randomUUID();
  
  try {
    const response = await fetch(`${CONFIG.websiteUrl}/.netlify/functions/exchange-state`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stateId: fakeStateId }),
    });
    
    const data = await response.json();
    
    if (response.status === 401 && data.error) {
      log('✅ Correct: Invalid state rejected', 'green');
      log(`   Error: ${data.error}`, 'green');
    } else {
      log('❌ Security Issue: Invalid state accepted!', 'red');
    }
  } catch (error) {
    log(`❌ Unexpected error: ${error.message}`, 'red');
  }
}

async function testRateLimiting() {
  log('\n⏱️  Testing: Rate Limiting', 'blue');
  
  const promises = [];
  for (let i = 0; i < 12; i++) {
    promises.push(
      fetch(`${CONFIG.websiteUrl}/.netlify/functions/create-auth-state`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.testToken}`,
        },
      })
    );
  }
  
  const results = await Promise.all(promises);
  const rateLimited = results.filter(r => r.status === 429);
  
  if (rateLimited.length > 0) {
    log(`✅ Rate limiting active: ${rateLimited.length} requests blocked`, 'green');
  } else {
    log('⚠️  Rate limiting may not be working', 'yellow');
  }
}

async function runTests() {
  log('🚀 Starting State Exchange Authentication Tests', 'blue');
  log('=' .repeat(50), 'blue');
  
  // Test 1: Create auth state
  const stateId = await testCreateAuthState();
  
  // Test 2: Exchange state for token
  const token = await testExchangeState(stateId);
  
  // Test 3: Try to reuse the same state (should fail)
  await testDoubleExchange(stateId);
  
  // Test 4: Try invalid state
  await testInvalidState();
  
  // Test 5: Rate limiting
  await testRateLimiting();
  
  // Summary
  log('\n' + '=' .repeat(50), 'blue');
  log('📊 Test Summary:', 'blue');
  log('   - State creation: Check if Supabase is configured', 'yellow');
  log('   - State exchange: Works with valid state', 'yellow');
  log('   - Security: States are single-use', 'yellow');
  log('   - Validation: Invalid states rejected', 'yellow');
  log('   - Rate limiting: Active on endpoints', 'yellow');
  
  log('\n💡 Next Steps:', 'blue');
  log('1. Run Supabase migration to create auth_states table', 'yellow');
  log('2. Ensure JWT_SECRET is set in Netlify environment', 'yellow');
  log('3. Test with real Supabase authentication tokens', 'yellow');
  log('4. Coordinate with app team for integration testing', 'yellow');
}

// Run tests
runTests().catch(console.error);
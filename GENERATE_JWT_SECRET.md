# How to Generate a Secure JWT_SECRET

## Generate Your Own Secret

**IMPORTANT:** Do not use any example secrets from documentation. Generate your own unique secret.

### Method 1: Using Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Method 2: Using OpenSSL
```bash
openssl rand -hex 32
```

### Method 3: Using Python
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

### Method 4: Online Generator (Less Secure)
Use a reputable password generator to create a 64-character hexadecimal string.

## Security Requirements

- **Length:** Minimum 32 bytes (64 hex characters)
- **Randomness:** Use cryptographically secure random generation
- **Uniqueness:** Never reuse secrets across environments or applications
- **Storage:** Only store in Netlify environment variables, never in code

## Adding to Netlify

1. Generate your secret using one of the methods above
2. Go to Netlify Dashboard > Site Settings > Environment Variables
3. Add new variable:
   - Key: `JWT_SECRET`
   - Value: Your generated secret
   - Scope: Production (and Preview if needed)
4. Deploy your site to apply the changes

## Rotation Schedule

- Rotate JWT_SECRET every 90 days
- Immediately rotate if:
  - Secret is exposed in logs or code
  - Security breach is suspected
  - Employee with access leaves

## Never Do This

- ❌ Commit secrets to git
- ❌ Share secrets in documentation
- ❌ Use example or default secrets
- ❌ Log or display secrets
- ❌ Use weak or predictable secrets
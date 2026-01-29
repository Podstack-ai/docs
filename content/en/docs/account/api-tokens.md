---
title: API Tokens
---

# API Tokens

API tokens enable programmatic access to Podstack services without interactive login. Use tokens for scripts, CI/CD pipelines, and integrations.

## What Are API Tokens?

API tokens are:
- Secure credentials for API access
- Scoped to your account
- Configurable expiration
- Revocable at any time

Use cases:
- Automated deployments
- CI/CD pipelines
- Custom scripts
- Third-party integrations
- JupyterHub authentication

## Viewing Tokens

Navigate to **Settings > API Tokens** to see:

- **Name**: Token identifier
- **Prefix**: First characters (for identification)
- **Created**: When token was created
- **Expires**: Expiration date
- **Last Used**: Recent activity

## Creating a Token

### Step 1: Create Token

1. Click **Create Token**
2. Enter a descriptive name (e.g., "CI Pipeline", "Training Script")
3. Select expiration:
   - 7 days
   - 30 days
   - 90 days
   - 180 days
   - 365 days
   - Never expires

### Step 2: Copy Token

**Important**: Copy the token immediately!

1. Token is displayed once after creation
2. Click **Copy** to copy to clipboard
3. Store securely (password manager, secrets vault)
4. Token cannot be viewed again

### Token Limits

Each account can have up to **5 active tokens**. Delete unused tokens to create new ones.

## Using Tokens

### API Authentication

Include the token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.podstack.ai/v1/pods
```

### Python Example

```python
import requests

headers = {
    'Authorization': 'Bearer YOUR_TOKEN'
}

response = requests.get(
    'https://api.podstack.ai/v1/pods',
    headers=headers
)
print(response.json())
```

### JupyterHub Authentication

Tokens can authenticate with JupyterHub instances:

1. Navigate to your Jupyter URL
2. Use token for authentication
3. Access notebooks programmatically

## Managing Tokens

### Identifying Tokens

Since you can't view full tokens after creation, use:
- **Name**: Descriptive identifier you set
- **Prefix**: First 8 characters shown
- **Last Used**: Identify active vs. unused tokens

### Revoking Tokens

To revoke a token:

1. Find the token in the list
2. Click **Revoke**
3. Confirm revocation
4. Token is immediately invalidated

Revoked tokens cannot access the API.

### When to Revoke

Revoke tokens when:
- No longer needed
- Potentially compromised
- Employee leaves the team
- Rotating credentials

## Security Best Practices

### Token Storage

**DO:**
- Store in password managers
- Use secrets management (Vault, AWS Secrets Manager)
- Inject via environment variables

**DON'T:**
- Commit to git repositories
- Share in plain text
- Store in code files
- Log tokens in output

### Environment Variables

```bash
# Set in shell
export PODSTACK_API_TOKEN="your_token"

# Use in code
import os
token = os.environ.get('PODSTACK_API_TOKEN')
```

### CI/CD Secrets

Most CI/CD platforms support secrets:
- GitHub Actions: Repository secrets
- GitLab CI: CI/CD variables
- Jenkins: Credentials plugin

### Token Expiration

Choose appropriate expiration:
- **Short-lived (7-30 days)**: CI/CD, temporary access
- **Medium (90-180 days)**: Regular scripts, integrations
- **Long (365 days)**: Stable, monitored integrations
- **Never**: Only for highly secure environments with rotation

### Regular Audits

Periodically review tokens:
1. Check "Last Used" dates
2. Revoke unused tokens
3. Verify each token has a purpose
4. Rotate long-lived tokens

## Token Identification

The token prefix helps identify which token is used:

```
podstack_abc123_...
         ^^^^^^
         Prefix shown in UI
```

When reviewing logs or debugging, match the prefix to identify the token.

## Troubleshooting

### 401 Unauthorized

- Verify token is correct (no extra spaces)
- Check token hasn't expired
- Ensure token hasn't been revoked
- Verify Bearer prefix in header

### 403 Forbidden

- Token may lack required permissions
- Resource may be in different project
- Check account status

### Rate Limiting

API requests may be rate-limited:
- Implement exponential backoff
- Cache responses where appropriate
- Contact support for higher limits

## Next Steps

- [View Audit Logs](/docs/account/audit-logs/) to track API usage
- [Explore the API](/docs/support/) for available endpoints

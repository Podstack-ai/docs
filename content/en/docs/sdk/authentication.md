---
title: Authentication
description: "Authenticate with Podstack SDK using API tokens. Supports environment variables, direct configuration, and config files."
keywords:
  - Podstack API token
  - SDK authentication
  - API credentials
  - secure authentication
---

# Authentication

The Podstack SDK requires an API token for authentication. This guide covers all authentication methods.

## Generate API Token

1. Log in to [Podstack Dashboard](https://dashboard.podstack.ai)
2. Navigate to **Account > API Tokens**
3. Click **Create Token**
4. Give it a descriptive name
5. Copy the token (shown only once)

See [API Tokens](/docs/account/api-tokens/) for detailed instructions.

## Authentication Methods

### Environment Variable (Recommended)

Set the `PODSTACK_API_TOKEN` environment variable:

```bash
# Linux/macOS
export PODSTACK_API_TOKEN=your_api_token_here

# Windows (PowerShell)
$env:PODSTACK_API_TOKEN = "your_api_token_here"

# Windows (CMD)
set PODSTACK_API_TOKEN=your_api_token_here
```

Then initialize the client without parameters:

```python
from podstack import Client

client = Client()  # Automatically reads PODSTACK_API_TOKEN
```

### Direct Token

Pass the token directly to the client:

```python
from podstack import Client

client = Client(api_token="your_api_token_here")
```

**Note**: Avoid hardcoding tokens in source code. Use environment variables or config files instead.

### Config File

Create `~/.podstack/credentials`:

```ini
[default]
api_token = your_api_token_here

[production]
api_token = production_token_here
```

Use a specific profile:

```python
from podstack import Client

# Use default profile
client = Client()

# Use specific profile
client = Client(profile="production")
```

## Project Context

Set the default project for operations:

```python
from podstack import Client

# Set project during initialization
client = Client(project_id="my-project-id")

# Or via environment variable
# export PODSTACK_PROJECT=my-project-id
```

## API Endpoint

For custom API endpoints (enterprise deployments):

```python
from podstack import Client

client = Client(
    api_token="your_token",
    api_endpoint="https://api.custom.podstack.ai"
)
```

## Verify Authentication

```python
from podstack import Client

client = Client()

# Check if authenticated
try:
    user = client.auth.whoami()
    print(f"Authenticated as: {user.email}")
except Exception as e:
    print(f"Authentication failed: {e}")
```

## Token Security Best Practices

1. **Never commit tokens** to version control
2. **Use environment variables** in production
3. **Rotate tokens regularly** (recommended: every 90 days)
4. **Use minimal scopes** for tokens when possible
5. **Revoke unused tokens** from the dashboard

### Using .env Files

For local development, use `.env` files with `python-dotenv`:

```bash
pip install python-dotenv
```

Create `.env`:

```
PODSTACK_API_TOKEN=your_token_here
PODSTACK_PROJECT=your_project_id
```

Load in your application:

```python
from dotenv import load_dotenv
from podstack import Client

load_dotenv()
client = Client()
```

Add `.env` to `.gitignore`:

```
.env
.env.local
```

## Troubleshooting

### Invalid Token Error

```python
podstack.exceptions.AuthenticationError: Invalid API token
```

**Solution**: Verify your token is correct and not expired. Generate a new token if needed.

### Token Not Found

```python
podstack.exceptions.AuthenticationError: No API token provided
```

**Solution**: Set the `PODSTACK_API_TOKEN` environment variable or pass the token directly.

### Permission Denied

```python
podstack.exceptions.PermissionError: Access denied to resource
```

**Solution**: Ensure your token has the required permissions and you're accessing resources in the correct project.

## Next Steps

- [Quick Start](/docs/sdk/quickstart/) - Create your first resource
- [Pods](/docs/sdk/pods/) - Manage GPU containers

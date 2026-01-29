---
title: Authentication
description: "Authenticate Podstack CLI with your account. Login via browser, API token, or environment variables."
keywords:
  - CLI authentication
  - podstack login
  - API token CLI
  - terminal login
---

# Authentication

Configure the Podstack CLI to access your account.

## Login Methods

### Interactive Login (Recommended)

Opens your browser for secure authentication:

```bash
podstack auth login
```

This will:
1. Open your default browser
2. Prompt you to log in to Podstack
3. Automatically configure the CLI

### API Token Login

Use an API token for non-interactive environments:

```bash
podstack auth login --token YOUR_API_TOKEN
```

Generate a token at **Account > API Tokens** in the dashboard.

### Environment Variable

Set the token as an environment variable:

```bash
# Linux/macOS
export PODSTACK_API_TOKEN=your_api_token

# Windows (PowerShell)
$env:PODSTACK_API_TOKEN = "your_api_token"

# Windows (CMD)
set PODSTACK_API_TOKEN=your_api_token
```

## Verify Authentication

Check your authentication status:

```bash
podstack auth status
```

Output:

```
Authenticated as: user@example.com
Account ID: acc_123456
Token expires: 2024-12-31
```

View current user:

```bash
podstack auth whoami
```

## Configuration File

The CLI stores credentials in `~/.podstack/config.yaml`:

```yaml
auth:
  token: your_api_token
  expires: 2024-12-31T00:00:00Z

defaults:
  project: my-project
  output: table
```

### Multiple Profiles

Configure multiple accounts:

```yaml
profiles:
  default:
    token: personal_token
    project: personal-project

  work:
    token: work_token
    project: work-project
    api_endpoint: https://api.work.podstack.ai
```

Use a specific profile:

```bash
podstack --profile work pod list
```

Or set the default:

```bash
podstack config set-profile work
```

## Project Context

Set the default project:

```bash
# Set default project
podstack project use my-project

# Or via environment variable
export PODSTACK_PROJECT=my-project
```

View current project:

```bash
podstack project current
```

## Logout

Remove stored credentials:

```bash
podstack auth logout
```

This removes the token from the config file.

## Token Management

### View Token Info

```bash
podstack auth token-info
```

### Refresh Token

```bash
podstack auth refresh
```

### Revoke Token

Revoke the current token (requires re-authentication):

```bash
podstack auth revoke
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Setup Podstack CLI
  run: |
    curl -sSL https://get.podstack.ai/cli | bash
    podstack auth login --token ${{ secrets.PODSTACK_API_TOKEN }}

- name: Deploy Pod
  run: podstack pod create --name ci-pod --image myimage:latest
```

### GitLab CI

```yaml
deploy:
  script:
    - curl -sSL https://get.podstack.ai/cli | bash
    - export PODSTACK_API_TOKEN=$PODSTACK_TOKEN
    - podstack pod create --name ci-pod --image myimage:latest
```

### Jenkins

```groovy
pipeline {
    environment {
        PODSTACK_API_TOKEN = credentials('podstack-token')
    }
    stages {
        stage('Deploy') {
            steps {
                sh 'podstack pod create --name ci-pod --image myimage:latest'
            }
        }
    }
}
```

## Security Best Practices

1. **Use environment variables** in CI/CD
2. **Never commit tokens** to version control
3. **Rotate tokens regularly**
4. **Use minimal permission tokens** when possible
5. **Logout on shared machines**

### Secure Token Storage

On Linux, use a keyring:

```bash
# Store token securely
podstack auth login --use-keyring
```

On macOS, tokens are stored in Keychain by default.

## Troubleshooting

### Token Expired

```
Error: Token expired
```

Solution: Re-authenticate

```bash
podstack auth login
```

### Invalid Token

```
Error: Invalid authentication token
```

Solution: Generate a new token from the dashboard

### Permission Denied

```
Error: Permission denied for resource
```

Solution: Check if the token has access to the project

```bash
podstack project list
```

## Next Steps

- [Quick Start](/docs/cli/quickstart/) - Create your first pod
- [Pods](/docs/cli/pods/) - Pod management commands

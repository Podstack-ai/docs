---
title: Configuration
description: "Configure Podstack CLI settings. Customize defaults, output formats, and environment variables."
keywords:
  - CLI configuration
  - podstack config
  - CLI settings
  - environment variables
---

# Configuration

Customize the Podstack CLI behavior and defaults.

## Configuration File

The CLI configuration is stored at `~/.podstack/config.yaml`:

```yaml
# Authentication
auth:
  token: your_api_token
  expires: 2024-12-31T00:00:00Z

# Defaults
defaults:
  project: my-default-project
  output: table
  gpu_type: A100

# API settings
api:
  endpoint: https://api.podstack.ai
  timeout: 30

# CLI behavior
cli:
  color: true
  pager: less
  confirm: true
```

## Config Commands

### View Configuration

```bash
# Show all config
podstack config show

# Show specific value
podstack config get defaults.project
```

### Set Configuration

```bash
# Set default project
podstack config set defaults.project my-project

# Set default output format
podstack config set defaults.output json

# Set default GPU type
podstack config set defaults.gpu_type A100
```

### Reset Configuration

```bash
# Reset single value
podstack config unset defaults.project

# Reset all
podstack config reset
```

## Default Values

### Default Project

Set the default project for all commands:

```bash
podstack config set defaults.project my-project

# Or use project command
podstack project use my-project
```

Override per-command:

```bash
podstack pod list --project other-project
```

### Default Output Format

```bash
podstack config set defaults.output json
```

Options: `table`, `json`, `yaml`, `wide`

### Default GPU Type

```bash
podstack config set defaults.gpu_type A100
```

## Environment Variables

Environment variables override config file values:

| Variable | Description |
|----------|-------------|
| `PODSTACK_API_TOKEN` | API authentication token |
| `PODSTACK_PROJECT` | Default project |
| `PODSTACK_OUTPUT` | Output format |
| `PODSTACK_API_ENDPOINT` | API endpoint URL |
| `PODSTACK_NO_COLOR` | Disable colored output |
| `PODSTACK_DEBUG` | Enable debug mode |

Example:

```bash
export PODSTACK_API_TOKEN=your_token
export PODSTACK_PROJECT=my-project
export PODSTACK_OUTPUT=json
```

## Output Formats

### Table (Default)

```bash
podstack pod list --output table
```

```
NAME          STATUS    GPU       CREATED
my-pod        running   A100 x1   2024-01-15
training      stopped   H100 x2   2024-01-14
```

### Wide

```bash
podstack pod list --output wide
```

Shows additional columns.

### JSON

```bash
podstack pod list --output json
```

```json
[
  {
    "id": "pod-123",
    "name": "my-pod",
    "status": "running",
    "gpu_type": "A100",
    "gpu_count": 1
  }
]
```

### YAML

```bash
podstack pod list --output yaml
```

### Quiet

IDs only, for scripting:

```bash
podstack pod list --quiet
```

```
pod-123
pod-456
```

## Profiles

Manage multiple accounts or environments:

```yaml
# ~/.podstack/config.yaml
profiles:
  default:
    auth:
      token: personal_token
    defaults:
      project: personal

  work:
    auth:
      token: work_token
    api:
      endpoint: https://api.work.podstack.ai
    defaults:
      project: work-project

  staging:
    auth:
      token: staging_token
    api:
      endpoint: https://api.staging.podstack.ai
```

### Using Profiles

```bash
# Use specific profile
podstack --profile work pod list

# Set default profile
podstack config set-profile work

# Show current profile
podstack config get-profile
```

## CLI Behavior

### Disable Confirmation Prompts

```bash
podstack config set cli.confirm false
```

Or use `--yes` flag:

```bash
podstack pod delete my-pod --yes
```

### Disable Colors

```bash
podstack config set cli.color false

# Or via environment
export PODSTACK_NO_COLOR=1
```

### Custom Pager

```bash
podstack config set cli.pager "less -R"
```

### Debug Mode

```bash
# Enable debug output
podstack --debug pod list

# Or via environment
export PODSTACK_DEBUG=1
```

## API Configuration

### Custom Endpoint

For enterprise or self-hosted:

```bash
podstack config set api.endpoint https://api.custom.podstack.ai
```

### Timeout

```bash
podstack config set api.timeout 60  # seconds
```

### Proxy

```bash
export HTTP_PROXY=http://proxy.example.com:8080
export HTTPS_PROXY=http://proxy.example.com:8080
```

## Aliases

Create command aliases in your shell:

```bash
# ~/.bashrc or ~/.zshrc

# Quick pod creation
alias newpod='podstack pod create --gpu-type A100 --wait'

# List running pods
alias pods='podstack pod list --status running'

# SSH to pod
psh() {
  podstack pod ssh "$1"
}
```

## Shell Integration

### Auto-completion

See [Installation](/docs/cli/installation/) for shell completion setup.

### Prompt Integration

Show current project in prompt:

```bash
# ~/.bashrc
PS1='$(podstack project current 2>/dev/null) \$ '
```

## Troubleshooting

### View Debug Info

```bash
podstack --debug config show
```

### Check Config Location

```bash
podstack config path
```

### Reset Everything

```bash
rm -rf ~/.podstack
podstack auth login
```

## Next Steps

- [Authentication](/docs/cli/authentication/) - Login methods
- [Quick Start](/docs/cli/quickstart/) - Get started
- [Pods](/docs/cli/pods/) - Pod commands

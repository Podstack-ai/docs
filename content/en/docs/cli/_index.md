---
title: CLI Documentation
description: "Podstack CLI for terminal-based GPU cloud management. Deploy containers, manage VMs, upload data, and control GPU resources from the command line."
keywords:
  - GPU cloud CLI
  - cloud GPU command line
  - ML infrastructure CLI
  - GPU deployment CLI
  - terminal GPU management
  - DevOps GPU tools
  - ML automation CLI
---

# CLI Documentation

Manage Podstack resources from your terminal using the official command-line interface.

## Installation

### macOS

```bash
brew install podstack/tap/podstack-cli
```

### Linux

```bash
curl -sSL https://get.podstack.ai/cli | bash
```

### Windows

```powershell
winget install podstack.cli
```

### From Source

```bash
go install github.com/podstack/cli@latest
```

## Authentication

### Login

```bash
# Interactive login (opens browser)
podstack auth login

# Using API token
podstack auth login --token YOUR_API_TOKEN

# Using environment variable
export PODSTACK_API_TOKEN=your_token
```

### Verify Authentication

```bash
podstack auth status
```

## Pod Commands

### Create a Pod

```bash
podstack pod create \
  --name my-pod \
  --image pytorch/pytorch:latest \
  --gpu-type A100 \
  --gpu-count 1 \
  --cpu 4 \
  --memory 16
```

### List Pods

```bash
podstack pod list
podstack pod list --project my-project
podstack pod list --status running
```

### Get Pod Details

```bash
podstack pod get my-pod
podstack pod get my-pod --output json
```

### Start/Stop Pods

```bash
podstack pod start my-pod
podstack pod stop my-pod
podstack pod restart my-pod
```

### Connect to Pod

```bash
# SSH into pod
podstack pod ssh my-pod

# Execute command
podstack pod exec my-pod -- nvidia-smi

# View logs
podstack pod logs my-pod
podstack pod logs my-pod --follow
```

### Delete Pod

```bash
podstack pod delete my-pod
podstack pod delete my-pod --force
```

## VM Commands

```bash
# Create VM
podstack vm create --name my-vm --os ubuntu-22.04 --cpu 4 --memory 16

# List VMs
podstack vm list

# Manage VMs
podstack vm start my-vm
podstack vm stop my-vm
podstack vm ssh my-vm

# Delete VM
podstack vm delete my-vm
```

## Storage Commands

### Buckets

```bash
# Create bucket
podstack bucket create my-bucket

# List buckets
podstack bucket list

# Upload file
podstack bucket upload my-bucket ./local-file.txt remote-path/file.txt

# Download file
podstack bucket download my-bucket remote-path/file.txt ./local-file.txt

# List objects
podstack bucket ls my-bucket

# Delete bucket
podstack bucket delete my-bucket
```

### Volumes

```bash
# Create volume
podstack volume create --name my-volume --quota 100

# List volumes
podstack volume list

# Delete volume
podstack volume delete my-volume
```

## Project Commands

```bash
# List projects
podstack project list

# Switch project context
podstack project use my-project

# Create project
podstack project create --name my-project
```

## Wallet Commands

```bash
# Check balance
podstack wallet balance

# View transactions
podstack wallet transactions
podstack wallet transactions --limit 10
```

## Configuration

### Config File

Located at `~/.podstack/config.yaml`:

```yaml
default_project: my-project
output_format: table
api_endpoint: https://api.podstack.ai
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `PODSTACK_API_TOKEN` | API authentication token |
| `PODSTACK_PROJECT` | Default project |
| `PODSTACK_OUTPUT` | Output format (table, json, yaml) |

## Output Formats

```bash
# Table (default)
podstack pod list

# JSON
podstack pod list --output json

# YAML
podstack pod list --output yaml

# Quiet (IDs only)
podstack pod list --quiet
```

## Shell Completion

### Bash

```bash
podstack completion bash > /etc/bash_completion.d/podstack
```

### Zsh

```bash
podstack completion zsh > "${fpath[1]}/_podstack"
```

### Fish

```bash
podstack completion fish > ~/.config/fish/completions/podstack.fish
```

## Common Workflows

### Quick Training Job

```bash
# Create pod, run training, delete when done
podstack pod create --name training --image pytorch/pytorch:latest --gpu-type A100
podstack pod ssh training
# ... run training ...
podstack pod delete training
```

### Data Upload

```bash
# Upload dataset to bucket
podstack bucket create datasets
podstack bucket upload datasets ./training-data/ data/ --recursive
```

## Troubleshooting

### Debug Mode

```bash
podstack --debug pod list
```

### Version

```bash
podstack version
```

### Update CLI

```bash
podstack update
```

## Support

For CLI issues, visit [Support](/docs/support/) or check the [Troubleshooting](/docs/support/troubleshooting/) guide.

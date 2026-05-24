---
title: CLI

weight: 90
description: "Podstack CLI for terminal-based GPU cloud management. Deploy containers, upload data, and control GPU resources from the command line."
keywords:
  - GPU cloud CLI
  - cloud GPU command line
  - ML infrastructure CLI
  - GPU deployment CLI
  - terminal GPU management
  - DevOps GPU tools
  - ML automation CLI
---
# CLI

Manage Podstack resources from your terminal using the official command-line interface.

## Overview

The Podstack CLI provides a powerful command-line interface for managing GPU cloud resources. Use it for quick operations, scripting, automation, and CI/CD integration.

## Quick Example

```bash
# Create a GPU pod
podstack pod create \
  --name training-job \
  --image pytorch/pytorch:latest \
  --gpu-type A100 \
  --wait

# SSH into the pod
podstack pod ssh training-job

# Run a command
podstack pod exec training-job -- nvidia-smi

# Delete when done
podstack pod delete training-job
```

## Features

- **Cross-Platform** - Works on macOS, Linux, and Windows
- **Full Coverage** - Manage pods, storage, projects
- **Multiple Outputs** - Table, JSON, YAML formats
- **Shell Completion** - Tab completion for Bash, Zsh, Fish
- **CI/CD Ready** - Token-based auth for automation
- **Fast & Lightweight** - Single binary, no dependencies

## Interactive CLI Features

Many commands support interactive mode. If you omit required arguments, the CLI can guide you with step-by-step prompts and selection menus.

```bash
# Prompts for API token input
podstack auth login

# Interactive project creation wizard
podstack project create

# Interactive pod creation wizard
podstack pod create

# Interactive bucket creation/upload
podstack bucket create
podstack bucket upload

# Interactive volume workflows
podstack volume create
podstack volume resize
```

## Installation

```bash
# macOS
brew install podstack/tap/podstack-cli

# Linux
curl -sSL https://get.podstack.ai/cli | bash

# Windows
winget install podstack.cli
```

## In This Section

| Guide | Description |
|-------|-------------|
| [Installation](/docs/cli/installation/) | Install on your platform |
| [Authentication](/docs/cli/authentication/) | Login and configure CLI access |
| [Configuration](/docs/cli/configuration/) | CLI settings and environment defaults |
| [Quick Start](/docs/cli/quickstart/) | Get started in minutes |
| [Projects](/docs/cli/projects/) | Project management commands |
| [GPUs & Templates](/docs/cli/gpu-and-templates/) | Compute templates and GPU availability |
| [Pods](/docs/cli/pods/) | Container management commands |
| [Storage](/docs/cli/storage/) | Bucket and volume commands |
| [Wallet & Pricing](/docs/cli/wallet-and-pricing/) | Balance, expenditure, and resource pricing |

## Common Commands

| Command | Description |
|---------|-------------|
| `podstack auth login` | Authenticate with Podstack |
| `podstack project use NAME` | Set active default project |
| `podstack pod list` | List all pods |
| `podstack pod create` | Create a new pod |
| `podstack pod ssh NAME` | SSH into a pod |
| `podstack pod delete NAME` | Delete a pod |
| `podstack bucket list` | List storage buckets |
| `podstack gpu availability` | Check global GPU inventory |
| `podstack wallet balance` | Check wallet balance |
| `podstack pricing` | View real-time compute pricing |

## Support

For CLI issues, visit [Customer Support](/docs/support/) or check the [Troubleshooting](/docs/support/troubleshooting/) guide.

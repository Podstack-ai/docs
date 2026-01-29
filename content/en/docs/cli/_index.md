---
title: CLI
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
- **Full Coverage** - Manage pods, VMs, storage, projects
- **Multiple Outputs** - Table, JSON, YAML formats
- **Shell Completion** - Tab completion for Bash, Zsh, Fish
- **CI/CD Ready** - Token-based auth for automation
- **Fast & Lightweight** - Single binary, no dependencies

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
| [Authentication](/docs/cli/authentication/) | Login and configure access |
| [Quick Start](/docs/cli/quickstart/) | Get started in minutes |
| [Pods](/docs/cli/pods/) | Container management commands |
| [Virtual Machines](/docs/cli/virtual-machines/) | VM commands |
| [Storage](/docs/cli/storage/) | Bucket and volume commands |
| [Configuration](/docs/cli/configuration/) | CLI settings and defaults |

## Common Commands

| Command | Description |
|---------|-------------|
| `podstack auth login` | Authenticate with Podstack |
| `podstack pod list` | List all pods |
| `podstack pod create` | Create a new pod |
| `podstack pod ssh NAME` | SSH into a pod |
| `podstack pod delete NAME` | Delete a pod |
| `podstack vm list` | List all VMs |
| `podstack bucket list` | List storage buckets |
| `podstack wallet balance` | Check wallet balance |

## Support

For CLI issues, visit [Customer Support](/docs/support/) or check the [Troubleshooting](/docs/support/troubleshooting/) guide.

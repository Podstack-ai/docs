---
title: Pods
description: "Podstack CLI pod commands. Create, manage, and connect to GPU containers from the terminal."
keywords:
  - CLI pod commands
  - terminal GPU pods
  - container management CLI
  - pod SSH
---

# Pods

Manage GPU containers using CLI commands.

## Create Pod

### Basic Creation

```bash
podstack pod create \
  --name my-pod \
  --image pytorch/pytorch:latest \
  --gpu-type A100
```

### Full Options

```bash
podstack pod create \
  --name training-pod \
  --project my-project \
  --image pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime \
  --gpu-type A100 \
  --gpu-count 2 \
  --cpu 8 \
  --memory 64 \
  --disk 200 \
  --port 8888 \
  --port 6006 \
  --env WANDB_API_KEY=xxx \
  --env HF_TOKEN=xxx \
  --volume vol-123:/data \
  --command "jupyter lab --ip=0.0.0.0" \
  --label team=ml \
  --label experiment=gpt \
  --wait
```

### Create Options

| Flag | Description |
|------|-------------|
| `--name` | Pod name (required) |
| `--image` | Container image (required) |
| `--gpu-type` | GPU type: A100, H100, V100, L40S, T4 |
| `--gpu-count` | Number of GPUs (default: 1) |
| `--cpu` | CPU cores (default: 4) |
| `--memory` | Memory in GB (default: 16) |
| `--disk` | Disk size in GB (default: 50) |
| `--port` | Expose port (can repeat) |
| `--env` | Environment variable KEY=VALUE (can repeat) |
| `--volume` | Mount volume ID:PATH (can repeat) |
| `--command` | Startup command |
| `--label` | Label KEY=VALUE (can repeat) |
| `--project` | Project ID or name |
| `--wait` | Wait for pod to be running |
| `--timeout` | Wait timeout in seconds |

## List Pods

```bash
# All pods
podstack pod list

# Filter by status
podstack pod list --status running
podstack pod list --status stopped

# Filter by project
podstack pod list --project my-project

# Filter by label
podstack pod list --label team=ml

# Output formats
podstack pod list --output table  # default
podstack pod list --output json
podstack pod list --output yaml
podstack pod list --output wide   # more columns

# IDs only (for scripting)
podstack pod list --quiet
```

## Get Pod Details

```bash
# Basic info
podstack pod get my-pod

# JSON output
podstack pod get my-pod --output json

# Watch for changes
podstack pod get my-pod --watch
```

## Pod Lifecycle

### Start Pod

```bash
podstack pod start my-pod

# Wait for running
podstack pod start my-pod --wait
```

### Stop Pod

```bash
# Graceful stop
podstack pod stop my-pod

# Force stop
podstack pod stop my-pod --force
```

### Restart Pod

```bash
podstack pod restart my-pod
```

### Delete Pod

```bash
# Delete stopped pod
podstack pod delete my-pod

# Force delete running pod
podstack pod delete my-pod --force

# Delete without confirmation
podstack pod delete my-pod --yes
```

## Connect to Pod

### SSH

```bash
# Interactive SSH
podstack pod ssh my-pod

# SSH as different user
podstack pod ssh my-pod --user ubuntu

# SSH with specific key
podstack pod ssh my-pod --identity ~/.ssh/my_key
```

### Execute Commands

```bash
# Single command
podstack pod exec my-pod -- nvidia-smi

# Multiple commands
podstack pod exec my-pod -- bash -c "cd /workspace && python train.py"

# Interactive
podstack pod exec my-pod -it -- /bin/bash

# With timeout
podstack pod exec my-pod --timeout 3600 -- python long_training.py
```

### Web Terminal

Open browser-based terminal:

```bash
podstack pod terminal my-pod
```

## File Transfer

### Upload

```bash
# Single file
podstack pod cp ./train.py my-pod:/workspace/train.py

# Directory
podstack pod cp ./data/ my-pod:/workspace/data/

# With progress
podstack pod cp --progress ./large_file.tar my-pod:/workspace/
```

### Download

```bash
# Single file
podstack pod cp my-pod:/workspace/model.pt ./model.pt

# Directory
podstack pod cp my-pod:/workspace/results/ ./results/
```

## Logs

```bash
# Recent logs
podstack pod logs my-pod

# Last N lines
podstack pod logs my-pod --tail 100

# Follow logs
podstack pod logs my-pod --follow

# Since timestamp
podstack pod logs my-pod --since 2024-01-15T10:00:00Z

# Since duration
podstack pod logs my-pod --since 1h
```

## Port Forwarding

Forward pod ports to localhost:

```bash
# Forward single port
podstack pod port-forward my-pod 8888:8888

# Forward multiple ports
podstack pod port-forward my-pod 8888:8888 6006:6006

# Background
podstack pod port-forward my-pod 8888:8888 &
```

## Pod Events

View pod events:

```bash
podstack pod events my-pod
```

## Metrics

```bash
podstack pod metrics my-pod
```

Output:

```
GPU Utilization: 85%
GPU Memory: 32.5/40.0 GB
CPU Usage: 45%
Memory Usage: 48.2/64.0 GB
Disk Usage: 120.5/200.0 GB
```

## Templates

### Save as Template

```bash
podstack pod save-template my-pod \
  --name pytorch-a100-template \
  --description "PyTorch training environment"
```

### Create from Template

```bash
podstack pod create \
  --template pytorch-a100-template \
  --name new-pod
```

## Batch Operations

### Stop All Running Pods

```bash
podstack pod list --status running --quiet | xargs -I {} podstack pod stop {}
```

### Delete All Stopped Pods

```bash
podstack pod list --status stopped --quiet | xargs -I {} podstack pod delete {} --yes
```

## Examples

### Quick Training Job

```bash
# Create, train, cleanup
podstack pod create --name train --image pytorch/pytorch:latest --gpu-type A100 --wait
podstack pod cp ./train.py train:/workspace/
podstack pod exec train -- python /workspace/train.py
podstack pod cp train:/workspace/model.pt ./
podstack pod delete train --force
```

### Jupyter Development

```bash
podstack pod create \
  --name jupyter-dev \
  --image jupyter/pytorch-notebook \
  --gpu-type A100 \
  --port 8888 \
  --command "jupyter lab --ip=0.0.0.0 --allow-root --NotebookApp.token=''" \
  --wait

# Get Jupyter URL
podstack pod get jupyter-dev --output json | jq -r '.jupyter_url'
```

## Next Steps

- [Virtual Machines](/docs/cli/virtual-machines/) - VM commands
- [Storage](/docs/cli/storage/) - Storage commands
- [Configuration](/docs/cli/configuration/) - CLI settings

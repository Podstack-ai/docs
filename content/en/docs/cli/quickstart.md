---
title: Quick Start
description: "Get started with Podstack CLI. Create and manage GPU pods from your terminal in minutes."
keywords:
  - CLI quickstart
  - terminal GPU
  - first pod CLI
  - command line tutorial
---

# Quick Start

Get up and running with the Podstack CLI in minutes.

## Prerequisites

- Podstack account with funds in wallet
- CLI installed ([Installation Guide](/docs/cli/installation/))

## Step 1: Authenticate

```bash
podstack auth login
```

This opens your browser for secure login.

Verify:

```bash
podstack auth status
```

## Step 2: Check Balance

```bash
podstack wallet balance
```

## Step 3: Create a Pod

Create a GPU pod with PyTorch:

```bash
podstack pod create \
  --name my-first-pod \
  --image pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime \
  --gpu-type A100 \
  --gpu-count 1 \
  --cpu 4 \
  --memory 16
```

## Step 4: Check Status

```bash
podstack pod list
```

Wait for status to show `running`:

```bash
podstack pod get my-first-pod --watch
```

## Step 5: Connect to Pod

SSH into the pod:

```bash
podstack pod ssh my-first-pod
```

Or run a command:

```bash
podstack pod exec my-first-pod -- nvidia-smi
```

## Step 6: Run Your Code

Upload and run a script:

```bash
# Upload
podstack pod cp ./train.py my-first-pod:/workspace/

# Run
podstack pod exec my-first-pod -- python /workspace/train.py
```

## Step 7: Download Results

```bash
podstack pod cp my-first-pod:/workspace/model.pt ./model.pt
```

## Step 8: Stop and Cleanup

Stop the pod (pause billing):

```bash
podstack pod stop my-first-pod
```

Delete the pod:

```bash
podstack pod delete my-first-pod
```

## Complete Workflow Example

```bash
#!/bin/bash
# training-job.sh

# Create pod
echo "Creating pod..."
podstack pod create \
  --name training-job \
  --image pytorch/pytorch:latest \
  --gpu-type A100 \
  --wait

# Upload code
echo "Uploading code..."
podstack pod cp ./src/ training-job:/workspace/src/
podstack pod cp ./data/ training-job:/workspace/data/

# Run training
echo "Running training..."
podstack pod exec training-job -- python /workspace/src/train.py

# Download results
echo "Downloading results..."
podstack pod cp training-job:/workspace/output/ ./results/

# Cleanup
echo "Cleaning up..."
podstack pod delete training-job --force

echo "Done!"
```

## Common Commands Reference

| Task | Command |
|------|---------|
| List pods | `podstack pod list` |
| Create pod | `podstack pod create --name NAME --image IMAGE` |
| Get pod info | `podstack pod get NAME` |
| SSH to pod | `podstack pod ssh NAME` |
| Run command | `podstack pod exec NAME -- COMMAND` |
| View logs | `podstack pod logs NAME` |
| Stop pod | `podstack pod stop NAME` |
| Start pod | `podstack pod start NAME` |
| Delete pod | `podstack pod delete NAME` |
| Upload file | `podstack pod cp LOCAL POD:REMOTE` |
| Download file | `podstack pod cp POD:REMOTE LOCAL` |

## Tips

### Use --wait Flag

Wait for pod to be ready:

```bash
podstack pod create --name my-pod --image image:tag --wait
```

### Output Formats

Get JSON output for scripting:

```bash
podstack pod list --output json | jq '.[] | .name'
```

### Follow Logs

Stream logs in real-time:

```bash
podstack pod logs my-pod --follow
```

### Quick Delete

Force delete without confirmation:

```bash
podstack pod delete my-pod --force
```

## Next Steps

- [Pods](/docs/cli/pods/) - Full pod command reference
- [Storage](/docs/cli/storage/) - Bucket and volume commands
- [Configuration](/docs/cli/configuration/) - CLI settings

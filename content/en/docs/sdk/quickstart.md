---
title: Quick Start
description: "Get started with Podstack Python SDK. Learn to create pods, manage VMs, and handle storage in minutes."
keywords:
  - Podstack quickstart
  - SDK tutorial
  - Python GPU example
  - first pod SDK
---

# Quick Start

Get up and running with the Podstack SDK in minutes.

## Prerequisites

- Python 3.8+
- Podstack account with funds in wallet
- API token ([generate one](/docs/account/api-tokens/))

## Installation

```bash
pip install podstack
```

## Basic Setup

```python
from podstack import Client

# Initialize client (reads PODSTACK_API_TOKEN env var)
client = Client()

# Or with explicit token
client = Client(api_token="your_token")
```

## Create Your First Pod

```python
from podstack import Client

client = Client()

# Create a GPU pod
pod = client.pods.create(
    name="my-first-pod",
    image="pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime",
    gpu_type="A100",
    gpu_count=1,
    cpu=4,
    memory=16,
    disk=50
)

print(f"Pod created: {pod.id}")
print(f"Status: {pod.status}")
print(f"SSH: {pod.ssh_command}")
```

## Wait for Pod Ready

```python
# Wait for pod to be running
pod = client.pods.wait_until_running(pod.id, timeout=300)

print(f"Pod is ready!")
print(f"SSH Command: {pod.ssh_command}")
print(f"Jupyter URL: {pod.jupyter_url}")
```

## Execute Commands

```python
# Run command in pod
result = client.pods.exec(pod.id, "nvidia-smi")
print(result.output)

# Run Python script
result = client.pods.exec(pod.id, "python -c 'import torch; print(torch.cuda.is_available())'")
print(result.output)  # True
```

## Upload Files

```python
# Upload a file to the pod
client.pods.upload(pod.id, "./train.py", "/workspace/train.py")

# Upload a directory
client.pods.upload(pod.id, "./data/", "/workspace/data/", recursive=True)
```

## Download Files

```python
# Download results
client.pods.download(pod.id, "/workspace/model.pt", "./model.pt")
```

## Stop and Delete

```python
# Stop pod (pause billing, keep configuration)
client.pods.stop(pod.id)

# Start again
client.pods.start(pod.id)

# Delete pod permanently
client.pods.delete(pod.id)
```

## Complete Example: Training Job

```python
from podstack import Client
import time

client = Client()

# 1. Create pod
print("Creating pod...")
pod = client.pods.create(
    name="training-job",
    image="pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime",
    gpu_type="A100",
    gpu_count=1,
    cpu=8,
    memory=32,
    disk=100
)

# 2. Wait for ready
print("Waiting for pod to start...")
pod = client.pods.wait_until_running(pod.id)
print(f"Pod ready: {pod.ssh_command}")

# 3. Upload training code
print("Uploading training code...")
client.pods.upload(pod.id, "./train.py", "/workspace/train.py")
client.pods.upload(pod.id, "./data/", "/workspace/data/", recursive=True)

# 4. Run training
print("Starting training...")
result = client.pods.exec(pod.id, "python /workspace/train.py", timeout=3600)
print(result.output)

# 5. Download results
print("Downloading model...")
client.pods.download(pod.id, "/workspace/model.pt", "./model.pt")

# 6. Cleanup
print("Cleaning up...")
client.pods.delete(pod.id)

print("Done!")
```

## Working with Projects

```python
# List projects
projects = client.projects.list()
for p in projects:
    print(f"{p.name}: {p.id}")

# Create pod in specific project
pod = client.pods.create(
    name="my-pod",
    project_id="project-id",
    image="pytorch/pytorch:latest",
    gpu_type="A100"
)
```

## Check Wallet Balance

```python
wallet = client.wallet.balance()
print(f"Balance: ${wallet.balance:.2f}")
print(f"Currency: {wallet.currency}")
```

## Error Handling

```python
from podstack import Client
from podstack.exceptions import (
    PodstackError,
    InsufficientBalanceError,
    ResourceNotFoundError,
    QuotaExceededError
)

client = Client()

try:
    pod = client.pods.create(
        name="my-pod",
        image="pytorch/pytorch:latest",
        gpu_type="H100",
        gpu_count=8
    )
except InsufficientBalanceError:
    print("Not enough funds. Please top up your wallet.")
except QuotaExceededError as e:
    print(f"Quota exceeded: {e.message}")
except ResourceNotFoundError as e:
    print(f"Resource not found: {e.message}")
except PodstackError as e:
    print(f"API error: {e.message}")
```

## Next Steps

- [Pods](/docs/sdk/pods/) - Advanced pod management
- [Virtual Machines](/docs/sdk/virtual-machines/) - VM operations
- [Storage](/docs/sdk/storage/) - Buckets and volumes

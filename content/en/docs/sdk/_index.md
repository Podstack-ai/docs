---
title: SDK Documentation
description: "Podstack Python SDK for programmatic GPU cloud management. Create pods, VMs, manage storage, and automate ML infrastructure deployments via API."
keywords:
  - GPU cloud SDK
  - Python GPU API
  - ML infrastructure SDK
  - cloud GPU API
  - programmatic GPU deployment
  - GPU automation
  - ML platform API
  - AI infrastructure SDK
---

# SDK Documentation

Integrate Podstack into your applications using our official SDKs.

## Available SDKs

### Python SDK

The Python SDK provides a simple interface for managing Podstack resources programmatically.

```python
from podstack import Client

client = Client(api_token="your_api_token")

# Create a pod
pod = client.pods.create(
    name="my-training-pod",
    image="pytorch/pytorch:latest",
    gpu_type="A100",
    gpu_count=1
)

# List all pods
pods = client.pods.list()
```

## Installation

```bash
pip install podstack
```

## Authentication

All SDK operations require an API token. Generate one from [Account > API Tokens](/docs/account/api-tokens/).

```python
from podstack import Client

# Using environment variable (recommended)
client = Client()  # Reads PODSTACK_API_TOKEN

# Or pass directly
client = Client(api_token="your_token")
```

## Core Resources

### Pods

```python
# Create
pod = client.pods.create(name="pod-name", image="image:tag", gpu_type="A100")

# List
pods = client.pods.list(project_id="project-id")

# Get
pod = client.pods.get(pod_id="pod-id")

# Start/Stop
client.pods.start(pod_id="pod-id")
client.pods.stop(pod_id="pod-id")

# Delete
client.pods.delete(pod_id="pod-id")
```

### Virtual Machines

```python
# Create
vm = client.vms.create(
    name="my-vm",
    os="ubuntu-22.04",
    cpu=4,
    memory=16,
    storage=100
)

# Manage
client.vms.start(vm_id="vm-id")
client.vms.stop(vm_id="vm-id")
```

### Storage

```python
# Buckets
bucket = client.buckets.create(name="my-bucket", visibility="private")
client.buckets.upload(bucket_id="id", file_path="./data.csv", key="data.csv")

# NFS Volumes
volume = client.volumes.create(name="my-volume", quota_gb=100)
```

## Error Handling

```python
from podstack.exceptions import PodstackError, InsufficientBalanceError

try:
    pod = client.pods.create(...)
except InsufficientBalanceError:
    print("Please top up your wallet")
except PodstackError as e:
    print(f"API error: {e.message}")
```

## Coming Soon

- JavaScript/TypeScript SDK
- Go SDK
- Java SDK

## Support

For SDK issues, visit [Support](/docs/support/) or check the [Troubleshooting](/docs/support/troubleshooting/) guide.

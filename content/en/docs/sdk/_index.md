---
title: SDK
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

# SDK

Integrate Podstack into your applications using our official Python SDK.

## Overview

The Podstack SDK provides a simple, Pythonic interface for managing GPU cloud resources programmatically. Use it to automate deployments, build custom tooling, or integrate Podstack into your ML pipelines.

## Quick Example

```python
from podstack import Client

# Initialize client
client = Client()  # Uses PODSTACK_API_TOKEN env var

# Create a GPU pod
pod = client.pods.create(
    name="training-job",
    image="pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime",
    gpu_type="A100",
    gpu_count=1
)

# Wait for pod to be ready
pod = client.pods.wait_until_running(pod.id)

# Run training
result = client.pods.exec(pod.id, "python train.py")

# Cleanup
client.pods.delete(pod.id)
```

## Features

- **Simple API** - Intuitive Python interface
- **Full Coverage** - Manage pods, VMs, storage, and more
- **Type Hints** - Full typing support for IDE autocomplete
- **Async Support** - Optional async/await patterns
- **Error Handling** - Detailed exceptions for debugging
- **Retry Logic** - Built-in retry for transient errors

## Installation

```bash
pip install podstack
```

## In This Section

| Guide | Description |
|-------|-------------|
| [Installation](/docs/sdk/installation/) | Install and set up the SDK |
| [Authentication](/docs/sdk/authentication/) | Configure API access |
| [Quick Start](/docs/sdk/quickstart/) | Get started in minutes |
| [Pods](/docs/sdk/pods/) | Manage GPU containers |
| [Virtual Machines](/docs/sdk/virtual-machines/) | VM operations |
| [Storage](/docs/sdk/storage/) | Buckets and NFS volumes |
| [Error Handling](/docs/sdk/error-handling/) | Handle exceptions |

## Coming Soon

- JavaScript/TypeScript SDK
- Go SDK
- Java SDK

## Support

For SDK issues, visit [Customer Support](/docs/support/) or check the [Troubleshooting](/docs/support/troubleshooting/) guide.

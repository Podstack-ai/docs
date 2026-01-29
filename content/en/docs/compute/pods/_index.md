---
title: Pods
description: "Cheapest GPU containers - deploy PyTorch, TensorFlow with A100, H100, L40S, V100. Pay per minute, zero lock-in. Jupyter notebooks, SSH access included."
keywords:
  - cheapest GPU containers
  - cheap GPU pods
  - affordable GPU container
  - budget Docker GPU
  - pay per minute containers
  - serverless GPU containers
  - zero lock-in pods
  - GPU containers for students
  - fractional GPU
  - fractional GPU container
  - partial GPU rental
  - shared GPU container
  - GPU slicing
  - PyTorch GPU cheap
  - TensorFlow GPU affordable
  - Jupyter GPU notebook cheap
  - A100 container cheap
  - H100 pod affordable
  - L40S GPU container
  - V100 budget container
  - Kubernetes GPU cheap
  - Docker GPU deployment
  - RunPod alternative
  - instant GPU container
---

# Pods (Containers)

Pods are containerized workloads that run on Podstack's Kubernetes infrastructure. They provide a fast, flexible way to deploy GPU-accelerated applications.

## What is a Pod?

A pod is one or more containers running together with shared resources. On Podstack, pods typically run a single container with:
- GPU access (optional)
- CPU and memory allocation
- Storage mounts
- Network connectivity
- SSH and web terminal access

## Key Features

### GPU Support
- Whole GPU allocation (1, 2, 4, or more GPUs)
- Multiple GPU types (A100, H100, V100, L40S, T4)
- CUDA and cuDNN pre-installed in most images

### Container Images
Use any Docker image:
- Public images from Docker Hub, NGC, etc.
- Private registry images with authentication
- Custom images built for your workload

### Access Methods
- **SSH**: Direct terminal access via assigned subdomain
- **Web Terminal**: Browser-based terminal
- **Jupyter Notebook**: Built-in notebook server (if enabled)
- **Custom Ports**: Expose any ports for web services

### Volume Mounts
- Mount NFS volumes for persistent shared storage
- ConfigMaps for configuration files
- SSH keys automatically mounted for access

## Pod Lifecycle

```
Creating → Pending → Running → (Stopped) → Terminated
```

| State | Description | Billing |
|-------|-------------|---------|
| Creating | Pod being provisioned | No |
| Pending | Waiting for resources | No |
| Running | Pod is active | Yes |
| Stopped | Paused by user | No |
| Terminated | Pod deleted | No |

**Tip**: Stop pods when not in use to pause billing while preserving configuration.

## In This Section

- **[Creating Pods](/docs/compute/pods/creating-pods/)** - Deploy a new container
- **[Managing Pods](/docs/compute/pods/managing-pods/)** - Start, stop, monitor, and delete
- **[Connecting to Pods](/docs/compute/pods/connecting-to-pods/)** - SSH, terminal, and notebook access

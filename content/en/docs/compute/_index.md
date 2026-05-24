---
title: Compute

weight: 30
description: "Cheapest GPU compute - containers and baremetal. Pay per minute, zero lock-in. NVIDIA A100, H100, V100, L40S, T4 GPUs for ML training and inference."
keywords:
  - cheapest GPU compute
  - cheap GPU containers
  - budget GPU server
  - pay per minute GPU
  - pay for what you use
  - serverless GPU compute
  - zero lock-in GPU
  - no commitment GPU
  - GPU cloud for students
  - fractional GPU
  - fractional GPU rental
  - partial GPU cloud
  - shared GPU
  - GPU slicing
  - baremetal GPU rental
  - dedicated GPU cheap
  - NVIDIA A100 affordable
  - H100 GPU cheap
  - V100 budget GPU
  - L40S GPU rental
  - T4 inference cheap
  - RunPod alternative
  - Vast.ai alternative
  - instant GPU access
  - on-demand GPU compute
---
# Compute Resources

Podstack offers multiple ways to deploy compute workloads, from containerized applications to dedicated GPU instances.

## Compute Options

### Pods (Containers)

Pods are containerized workloads running on Kubernetes. They offer:
- Fast deployment from Docker images
- Fractional or whole GPU allocation
- Web terminal and SSH access
- Jupyter notebook integration
- Auto-scaling with replicas

**Best for**: ML training, inference, Jupyter notebooks, containerized applications

[Learn about Pods](/docs/compute/pods/)

### GPU Marketplace (Baremetal)

Reserve dedicated GPU instances from the marketplace:
- Browse available inventory across multiple GPU types
- Dedicated hardware with no virtualization overhead
- Ideal for large-scale training jobs

**Best for**: Maximum GPU performance, dedicated resources

[Explore GPU Marketplace](/docs/compute/gpu-marketplace/)

## Comparing Options

| Feature | Pods | Baremetal |
|---------|------|-----------|
| Deployment Speed | Fast (seconds) | Varies |
| GPU Sharing | Fractional supported | Dedicated |
| OS Customization | Container image | Full OS |
| Billing Granularity | Per-second | Per-hour |
| Best For | Dev/ML | Production training |

## GPU Types Available

Podstack supports various NVIDIA GPUs:

| GPU | Memory | Best For |
|-----|--------|----------|
| A100 | 40GB/80GB | Large model training |
| H100 | 80GB | Latest generation training |
| H200 | 141GB | Memory-intensive workloads |
| V100 | 16GB/32GB | Cost-effective training |
| L40S | 48GB | Inference and training |
| T4 | 16GB | Budget inference |

Availability varies by region and demand.

## Next Steps

- [Create a Pod](/docs/compute/pods/creating-pods/) for quick container deployment
- [Browse GPU Marketplace](/docs/compute/gpu-marketplace/) for dedicated instances

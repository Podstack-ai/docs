---
title: Compute
---

# Compute Resources

Podstack offers multiple ways to deploy compute workloads, from containerized applications to full virtual machines and dedicated GPU instances.

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

### Virtual Machines

VMs provide full operating system control with:
- Choice of Linux distributions (Ubuntu, CentOS, Debian, Rocky)
- Configurable CPU, memory, and storage
- GPU passthrough support
- Persistent disk storage

**Best for**: Custom software stacks, legacy applications, full OS requirements

[Learn about VMs](/docs/compute/virtual-machines/)

### GPU Marketplace (Baremetal)

Reserve dedicated GPU instances from the marketplace:
- Browse available inventory across multiple GPU types
- Dedicated hardware with no virtualization overhead
- Ideal for large-scale training jobs

**Best for**: Maximum GPU performance, dedicated resources

[Explore GPU Marketplace](/docs/compute/gpu-marketplace/)

## Comparing Options

| Feature | Pods | VMs | Baremetal |
|---------|------|-----|-----------|
| Deployment Speed | Fast (seconds) | Medium (minutes) | Varies |
| GPU Sharing | Fractional supported | Whole GPUs | Dedicated |
| OS Customization | Container image | Full OS | Full OS |
| Billing Granularity | Per-second | Per-hour | Per-hour |
| Best For | Dev/ML | Custom stacks | Production training |

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
- [Create a VM](/docs/compute/virtual-machines/creating-vms/) for full OS control
- [Browse GPU Marketplace](/docs/compute/gpu-marketplace/) for dedicated instances

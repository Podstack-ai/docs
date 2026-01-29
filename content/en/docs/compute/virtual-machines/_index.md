---
title: Virtual Machines
description: "GPU virtual machines on Podstack. Deploy Ubuntu, CentOS, Debian, Rocky Linux VMs with NVIDIA GPU passthrough, up to 128 vCPUs and 1TB RAM."
keywords:
  - GPU virtual machine
  - cloud GPU VM
  - NVIDIA GPU VM
  - Ubuntu GPU server
  - Linux GPU cloud
  - VM with GPU
  - GPU server rental
  - dedicated GPU VM
  - GPU passthrough
  - cloud computing GPU
---

# Virtual Machines

Virtual Machines (VMs) provide full operating system control with dedicated resources. Unlike containers, VMs run a complete OS and offer maximum flexibility.

## When to Use VMs

Choose VMs when you need:
- **Full OS control** - Install any software, configure kernel settings
- **Specific Linux distribution** - Ubuntu, CentOS, Debian, or Rocky
- **Long-running workloads** - Persistent environment that survives restarts
- **Legacy applications** - Software that doesn't containerize well
- **Custom drivers** - Specific GPU driver versions or kernel modules

## VM Features

### Operating Systems

| Distribution | Versions |
|--------------|----------|
| Ubuntu | 20.04, 22.04, 24.04 |
| CentOS | 7, 8 |
| Debian | 11, 12 |
| Rocky | 8, 9 |

### Resource Options

- **CPU**: 1-128 vCPUs
- **Memory**: 0.5 GB - 1024 GB
- **Storage**: 10 GB - 10,000 GB
- **GPU**: 0-8 GPUs (whole GPU allocation)

### Networking

- Public IP address for external access
- Private IP for internal communication
- SSH access on port 22

## VM Lifecycle

```
Creating → Pending → Running → (Stopped) → Terminated
```

| State | Description | Billing |
|-------|-------------|---------|
| Creating | VM being provisioned | No |
| Pending | Waiting for resources | No |
| Running | VM is active | Yes |
| Stopped | Paused by user | Reduced (storage only) |
| Terminated | VM deleted | No |

## Billing

- Running VMs are billed per hour
- Stopped VMs incur storage charges only
- GPU costs apply only when running

## In This Section

- **[Creating VMs](/docs/compute/virtual-machines/creating-vms/)** - Launch a new virtual machine
- **[Managing VMs](/docs/compute/virtual-machines/managing-vms/)** - Control and monitor your VMs

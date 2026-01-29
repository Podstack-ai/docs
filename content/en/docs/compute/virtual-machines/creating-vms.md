---
title: Creating VMs
---

# Creating Virtual Machines

This guide explains how to create and configure a virtual machine on Podstack.

## Create a VM

1. Navigate to **Compute > Virtual Machines**
2. Click **Create VM**
3. Configure the VM settings
4. Review the cost estimate
5. Click **Create**

## Configuration Options

### Basic Information

**VM Name**
A unique, descriptive name for your VM.

**Project**
Select the project this VM belongs to.

### Operating System

**Distribution**
Choose your preferred Linux distribution:
- Ubuntu (recommended for ML workloads)
- CentOS
- Debian
- Rocky Linux

**Version**
Select the OS version. Newer versions have better hardware support.

### Resources

**CPU**
Number of virtual CPUs:
- Minimum: 1 vCPU
- Maximum: 128 vCPUs

**Memory**
RAM allocation in GB:
- Minimum: 0.5 GB
- Maximum: 1024 GB

**Storage**
Boot disk size in GB:
- Minimum: 10 GB
- Maximum: 10,000 GB

Storage is persistent and survives VM restarts.

### GPU Configuration

**GPU Type**
Select from available GPU types (A100, H100, V100, etc.)

**GPU Count**
Number of GPUs:
- 0 for CPU-only VMs
- Up to 8 GPUs depending on availability

VMs use whole GPU passthrough for maximum performance.

### SSH Access

**SSH Key**
Select an SSH key for authentication. The public key will be installed in the VM.

If you don't have an SSH key:
1. Go to [SSH Keys](/docs/account/ssh-keys/)
2. Generate or add a key
3. Return to VM creation

### Network Configuration

VMs receive:
- **Public IP**: For external SSH access
- **Private IP**: For communication with other resources

## Cost Estimation

Before creating, review the estimated hourly cost:
- CPU cost
- Memory cost
- Storage cost
- GPU cost (if applicable)

Ensure your wallet has sufficient balance for at least a few hours of operation.

## After Creation

The VM provisioning process:
1. Resources allocated
2. OS image deployed
3. SSH key configured
4. Network assigned
5. VM starts automatically

This typically takes 2-5 minutes.

## Connecting to Your VM

Once running, connect via SSH:

```bash
ssh root@<vm-public-ip>
```

Or with your key explicitly:
```bash
ssh -i ~/.ssh/your_key root@<vm-public-ip>
```

The public IP is shown on the VM detail page.

## Initial Setup

After connecting to a new VM:

### Update Packages
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/Rocky
sudo yum update -y
```

### Install GPU Drivers (if needed)
Most images come with NVIDIA drivers pre-installed. Verify with:
```bash
nvidia-smi
```

### Create a User (optional)
```bash
adduser myuser
usermod -aG sudo myuser
```

## Troubleshooting

**VM stuck in Creating**
- Check wallet balance
- Verify resource availability
- Contact support if persists

**Cannot SSH**
- Verify VM is Running
- Check your SSH key is correct
- Ensure your IP isn't blocked
- Try with verbose mode: `ssh -v root@<ip>`

## Next Steps

Learn how to [Manage VMs](/docs/compute/virtual-machines/managing-vms/) including stopping, restarting, and monitoring.

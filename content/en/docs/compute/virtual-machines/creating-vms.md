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

### Billing Period

Select your preferred billing frequency:
- **Hourly**: Pay as you go, most flexible
- **Monthly**: Better rates for long-running workloads

## Data Volumes

Attach additional storage volumes to your VM:

### Creating a Data Volume

1. Go to **Virtual Machines > Data Volumes**
2. Click **Create Volume**
3. Configure:
   - **Name**: Volume identifier
   - **Size**: Storage capacity in GB
   - **Type**: Storage class (SSD, HDD)
4. Click **Create**

### Attaching to VM

When creating a VM:
1. Go to the **Volumes** section
2. Select existing data volumes to attach
3. Specify mount point for each volume

Data volumes persist independently and can be moved between VMs.

## VM Pools

Create multiple VMs with identical configurations:

### Creating a VM Pool

1. Go to **Virtual Machines > Pools**
2. Click **Create Pool**
3. Configure:
   - **Pool Name**: Identifier for the pool
   - **VM Configuration**: Resources, OS, SSH key
   - **Pool Size**: Number of VMs to create
4. Click **Create Pool**

### Pool Management

- View all VMs in the pool
- Scale the pool up or down
- Apply changes to all pool members
- Delete the entire pool

VM pools are useful for distributed computing, load balancing, or batch processing.

## Cloud-Init Templates

Use cloud-init scripts to customize VM initialization:

### Pre-configured Templates

Browse available cloud-init templates:
- Package installation scripts
- User setup configurations
- Service initialization
- Custom networking

### Custom Cloud-Init

Provide your own cloud-init script:
```yaml
#cloud-config
packages:
  - docker.io
  - nvidia-container-toolkit
runcmd:
  - systemctl start docker
```

Cloud-init runs on first boot to configure your VM automatically.

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

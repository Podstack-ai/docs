---
title: Virtual Machines
description: "Manage GPU virtual machines with Podstack Python SDK. Create, configure, and control VMs programmatically."
keywords:
  - SDK virtual machines
  - Python VM API
  - GPU VM management
  - cloud VM SDK
---

# Virtual Machines

Manage GPU virtual machines using the Podstack SDK.

## Create a VM

### Basic Creation

```python
from podstack import Client

client = Client()

vm = client.vms.create(
    name="my-vm",
    os="ubuntu-22.04",
    cpu=4,
    memory=16,
    disk=100
)

print(f"VM ID: {vm.id}")
print(f"Status: {vm.status}")
```

### With GPU

```python
vm = client.vms.create(
    name="gpu-vm",
    os="ubuntu-22.04",
    cpu=8,
    memory=64,
    disk=200,
    gpu_type="A100",
    gpu_count=1
)
```

### Full Configuration

```python
vm = client.vms.create(
    name="production-vm",
    project_id="project-id",

    # Operating system
    os="ubuntu-22.04",  # Options: ubuntu-20.04, ubuntu-22.04, debian-11, rocky-8

    # Resources
    cpu=16,
    memory=128,   # GB
    disk=500,     # GB

    # GPU (optional)
    gpu_type="A100",
    gpu_count=2,

    # Networking
    public_ip=True,

    # SSH key
    ssh_key_ids=["key-123", "key-456"],

    # Startup script
    user_data="""#!/bin/bash
    apt-get update
    apt-get install -y docker.io
    """,

    # Labels
    labels={
        "environment": "production",
        "team": "ml-platform"
    }
)
```

## Available OS Images

```python
# List available images
images = client.vms.images()

for image in images:
    print(f"{image.name}: {image.id}")
    print(f"  OS: {image.os_family} {image.os_version}")
    print(f"  GPU Support: {image.gpu_support}")
```

Common images:
- `ubuntu-22.04` - Ubuntu 22.04 LTS
- `ubuntu-20.04` - Ubuntu 20.04 LTS
- `debian-11` - Debian 11 Bullseye
- `rocky-8` - Rocky Linux 8
- `ubuntu-22.04-cuda` - Ubuntu 22.04 with CUDA pre-installed

## List VMs

```python
# All VMs
vms = client.vms.list()

# Filter by project
vms = client.vms.list(project_id="project-id")

# Filter by status
vms = client.vms.list(status="running")

# Iterate
for vm in vms:
    print(f"{vm.name}: {vm.status} ({vm.cpu} vCPU, {vm.memory}GB RAM)")
```

## Get VM Details

```python
vm = client.vms.get("vm-id")

print(f"Name: {vm.name}")
print(f"Status: {vm.status}")
print(f"Public IP: {vm.public_ip}")
print(f"Private IP: {vm.private_ip}")
print(f"OS: {vm.os}")
print(f"CPU: {vm.cpu} vCPU")
print(f"Memory: {vm.memory} GB")
print(f"Disk: {vm.disk} GB")
print(f"GPU: {vm.gpu_type} x {vm.gpu_count}" if vm.gpu_type else "No GPU")
print(f"SSH: ssh root@{vm.public_ip}")
```

## VM Lifecycle

### Start VM

```python
client.vms.start("vm-id")

# Wait for running
vm = client.vms.wait_until_running("vm-id", timeout=300)
print(f"VM ready: ssh root@{vm.public_ip}")
```

### Stop VM

```python
# Graceful shutdown
client.vms.stop("vm-id")

# Force stop
client.vms.stop("vm-id", force=True)
```

### Restart VM

```python
client.vms.restart("vm-id")
```

### Delete VM

```python
# Delete stopped VM
client.vms.delete("vm-id")

# Force delete
client.vms.delete("vm-id", force=True)
```

## Resize VM

```python
# Stop VM first
client.vms.stop("vm-id")

# Resize
client.vms.resize(
    "vm-id",
    cpu=8,
    memory=32,
    disk=200  # Disk can only be increased
)

# Start VM
client.vms.start("vm-id")
```

## Snapshots

### Create Snapshot

```python
snapshot = client.vms.create_snapshot(
    vm_id="vm-id",
    name="before-upgrade",
    description="Snapshot before system upgrade"
)

print(f"Snapshot ID: {snapshot.id}")
```

### List Snapshots

```python
snapshots = client.vms.snapshots("vm-id")

for snap in snapshots:
    print(f"{snap.name}: {snap.created_at} ({snap.size_gb} GB)")
```

### Restore from Snapshot

```python
client.vms.restore_snapshot("vm-id", "snapshot-id")
```

### Delete Snapshot

```python
client.vms.delete_snapshot("vm-id", "snapshot-id")
```

## SSH Access

### Get SSH Command

```python
vm = client.vms.get("vm-id")
print(f"SSH: ssh root@{vm.public_ip}")
```

### Execute Commands

```python
result = client.vms.exec("vm-id", "nvidia-smi")
print(result.output)

# With sudo
result = client.vms.exec("vm-id", "apt-get update", sudo=True)
```

### Interactive SSH

```python
client.vms.ssh("vm-id")  # Opens interactive shell
```

## File Transfer

```python
# Upload
client.vms.upload("vm-id", "./script.sh", "/root/script.sh")

# Download
client.vms.download("vm-id", "/var/log/syslog", "./syslog.txt")
```

## Networking

### Public IP

```python
# Allocate public IP
client.vms.allocate_public_ip("vm-id")

# Release public IP
client.vms.release_public_ip("vm-id")
```

### Firewall Rules

```python
# Add rule
client.vms.add_firewall_rule(
    vm_id="vm-id",
    protocol="tcp",
    port=443,
    source="0.0.0.0/0"
)

# List rules
rules = client.vms.firewall_rules("vm-id")

# Remove rule
client.vms.remove_firewall_rule("vm-id", "rule-id")
```

## Monitoring

```python
metrics = client.vms.metrics("vm-id")

print(f"CPU Usage: {metrics.cpu_usage}%")
print(f"Memory Usage: {metrics.memory_used}/{metrics.memory_total} GB")
print(f"Disk Usage: {metrics.disk_used}/{metrics.disk_total} GB")
print(f"Network In: {metrics.network_in_mbps} Mbps")
print(f"Network Out: {metrics.network_out_mbps} Mbps")

if metrics.gpu_utilization:
    print(f"GPU Utilization: {metrics.gpu_utilization}%")
    print(f"GPU Memory: {metrics.gpu_memory_used}/{metrics.gpu_memory_total} GB")
```

## Console Access

```python
# Get VNC console URL
console = client.vms.console("vm-id")
print(f"Console URL: {console.url}")
print(f"Expires: {console.expires_at}")
```

## Next Steps

- [Storage](/docs/sdk/storage/) - Manage buckets and volumes
- [Pods](/docs/sdk/pods/) - Container management
- [Error Handling](/docs/sdk/error-handling/) - Handle exceptions

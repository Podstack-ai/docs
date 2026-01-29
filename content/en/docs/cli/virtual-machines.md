---
title: Virtual Machines
description: "Podstack CLI VM commands. Create and manage GPU virtual machines from the terminal."
keywords:
  - CLI VM commands
  - virtual machine terminal
  - GPU VM management
  - SSH VM
---

# Virtual Machines

Manage GPU virtual machines using CLI commands.

## Create VM

### Basic Creation

```bash
podstack vm create \
  --name my-vm \
  --os ubuntu-22.04 \
  --cpu 4 \
  --memory 16 \
  --disk 100
```

### With GPU

```bash
podstack vm create \
  --name gpu-vm \
  --os ubuntu-22.04 \
  --cpu 8 \
  --memory 64 \
  --disk 200 \
  --gpu-type A100 \
  --gpu-count 1
```

### Full Options

```bash
podstack vm create \
  --name production-vm \
  --project my-project \
  --os ubuntu-22.04 \
  --cpu 16 \
  --memory 128 \
  --disk 500 \
  --gpu-type A100 \
  --gpu-count 2 \
  --ssh-key my-key \
  --ssh-key team-key \
  --public-ip \
  --user-data ./cloud-init.yaml \
  --label environment=production \
  --wait
```

### Create Options

| Flag | Description |
|------|-------------|
| `--name` | VM name (required) |
| `--os` | Operating system (required) |
| `--cpu` | CPU cores (required) |
| `--memory` | Memory in GB (required) |
| `--disk` | Disk size in GB (required) |
| `--gpu-type` | GPU type: A100, H100, V100, L40S |
| `--gpu-count` | Number of GPUs |
| `--ssh-key` | SSH key name (can repeat) |
| `--public-ip` | Allocate public IP |
| `--user-data` | Cloud-init script path |
| `--label` | Label KEY=VALUE (can repeat) |
| `--project` | Project ID or name |
| `--wait` | Wait for VM to be running |

### Available OS Images

```bash
podstack vm images
```

Common images:
- `ubuntu-22.04` - Ubuntu 22.04 LTS
- `ubuntu-20.04` - Ubuntu 20.04 LTS
- `ubuntu-22.04-cuda` - Ubuntu 22.04 with CUDA
- `debian-11` - Debian 11 Bullseye
- `rocky-8` - Rocky Linux 8

## List VMs

```bash
# All VMs
podstack vm list

# Filter by status
podstack vm list --status running

# Filter by project
podstack vm list --project my-project

# Output formats
podstack vm list --output json
podstack vm list --output wide
```

## Get VM Details

```bash
podstack vm get my-vm
podstack vm get my-vm --output json
```

## VM Lifecycle

### Start VM

```bash
podstack vm start my-vm
podstack vm start my-vm --wait
```

### Stop VM

```bash
podstack vm stop my-vm
podstack vm stop my-vm --force
```

### Restart VM

```bash
podstack vm restart my-vm
```

### Delete VM

```bash
podstack vm delete my-vm
podstack vm delete my-vm --force --yes
```

## Connect to VM

### SSH

```bash
# Interactive SSH
podstack vm ssh my-vm

# As different user
podstack vm ssh my-vm --user ubuntu

# With command
podstack vm ssh my-vm -- nvidia-smi
```

### Console

Open VNC console in browser:

```bash
podstack vm console my-vm
```

## File Transfer

```bash
# Upload
podstack vm cp ./script.sh my-vm:/root/script.sh

# Download
podstack vm cp my-vm:/var/log/syslog ./syslog.txt
```

## Resize VM

```bash
# Stop first
podstack vm stop my-vm

# Resize
podstack vm resize my-vm \
  --cpu 8 \
  --memory 32 \
  --disk 200

# Start
podstack vm start my-vm
```

## Snapshots

### Create Snapshot

```bash
podstack vm snapshot create my-vm \
  --name before-upgrade \
  --description "Snapshot before system upgrade"
```

### List Snapshots

```bash
podstack vm snapshot list my-vm
```

### Restore Snapshot

```bash
podstack vm snapshot restore my-vm --snapshot before-upgrade
```

### Delete Snapshot

```bash
podstack vm snapshot delete my-vm --snapshot before-upgrade
```

## Networking

### Public IP

```bash
# Allocate
podstack vm ip allocate my-vm

# Release
podstack vm ip release my-vm
```

### Firewall

```bash
# Add rule
podstack vm firewall add my-vm \
  --protocol tcp \
  --port 443 \
  --source 0.0.0.0/0

# List rules
podstack vm firewall list my-vm

# Remove rule
podstack vm firewall remove my-vm --rule rule-id
```

## Monitoring

```bash
podstack vm metrics my-vm
```

## User Data (Cloud-Init)

Create a cloud-init script:

```yaml
# cloud-init.yaml
#cloud-config
packages:
  - docker.io
  - nvidia-driver-525

runcmd:
  - systemctl enable docker
  - systemctl start docker
```

Use it:

```bash
podstack vm create \
  --name my-vm \
  --os ubuntu-22.04 \
  --user-data ./cloud-init.yaml \
  ...
```

## Examples

### Development VM

```bash
podstack vm create \
  --name dev-vm \
  --os ubuntu-22.04-cuda \
  --cpu 8 \
  --memory 32 \
  --disk 200 \
  --gpu-type A100 \
  --public-ip \
  --wait

# Get SSH command
podstack vm get dev-vm --output json | jq -r '"ssh root@" + .public_ip'
```

### Batch Processing

```bash
# Create multiple VMs
for i in {1..5}; do
  podstack vm create \
    --name worker-$i \
    --os ubuntu-22.04 \
    --cpu 4 \
    --memory 16 \
    --disk 50
done

# Delete all workers
podstack vm list --quiet | grep worker | xargs -I {} podstack vm delete {} --yes
```

## Next Steps

- [Storage](/docs/cli/storage/) - Storage commands
- [Pods](/docs/cli/pods/) - Container commands
- [Configuration](/docs/cli/configuration/) - CLI settings

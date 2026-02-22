---
title: Managing VMs
---

# Managing Virtual Machines

Learn how to monitor, control, and maintain your virtual machines.

## Viewing VMs

Navigate to **Compute > Virtual Machines** to see all VMs in your project.

### VM List

The list displays:
- **Name**: VM identifier
- **Status**: Current state
- **OS**: Operating system
- **Resources**: CPU, memory, GPU allocation
- **IP Address**: Public IP for SSH
- **Hourly Cost**: Current billing rate

### Filtering

- Filter by status (Running, Stopped, All)
- Search by VM name

## VM Actions

### Start a VM

For stopped VMs:
1. Click the **Start** button
2. Wait for status to change to Running (1-2 minutes)
3. Billing resumes when running

### Stop a VM

To pause a running VM:
1. Click the **Stop** button
2. Confirm the action
3. VM enters Stopped state

**When stopped**:
- CPU/GPU billing stops
- Storage charges continue (reduced rate)
- Data on disk is preserved
- Public IP may be released

### Restart a VM

To reboot:
1. Click the **Restart** button
2. VM will shutdown and start again

Useful for:
- Applying kernel updates
- Recovering from issues
- Refreshing the system

### Delete a VM

To permanently remove:
1. Click **Delete**
2. Confirm the deletion
3. VM and all its data are removed

**Warning**: Deletion is permanent. Back up any important data first.

## VM Details

Click on a VM to view:

### Overview Tab
- Full configuration
- Public and private IPs
- SSH connection string
- Creation date
- Associated project

### Billing Tab
- Current hourly rate
- Total cost since creation
- Breakdown by resource type

## Monitoring

### Resource Usage

VMs show basic metrics:
- CPU utilization
- Memory usage
- Disk usage
- Network traffic

For detailed monitoring, install tools inside the VM:
```bash
# Install htop for system monitoring
sudo apt install htop

# For GPU monitoring
nvidia-smi -l 1
```

### GPU Status

For GPU VMs, verify GPU availability:
```bash
nvidia-smi
```

Check CUDA:
```bash
nvcc --version
```

## Data Management

### Backing Up Data

Before stopping or deleting a VM, back up important data:

**Using SCP**:
```bash
scp -r root@<vm-ip>:/path/to/data ./local_backup/
```

**Using rsync**:
```bash
rsync -avz root@<vm-ip>:/path/to/data/ ./local_backup/
```

### Expanding Storage

To increase disk size:
1. Stop the VM
2. Contact support for disk expansion
3. Start the VM
4. Extend the filesystem inside the VM

### Using NFS Volumes

For shared persistent storage:
1. Create an [NFS Volume](/docs/storage/nfs-volumes/)
2. Mount it inside your VM:
```bash
sudo mount -t nfs <nfs-server>:<share-path> /mnt/data
```

## VM Snapshots

Snapshots capture the VM state for backup or cloning.

### Creating a Snapshot

1. Go to VM details
2. Click **Create Snapshot**
3. Enter a descriptive name for the snapshot
4. Optionally add a description
5. Click **Create**
6. Wait for snapshot to complete (time depends on VM size)

### Viewing Snapshots

Navigate to **Virtual Machines > Snapshots** to see:
- All snapshots across your VMs
- Snapshot name and description
- Source VM information
- Creation date and size
- Status (creating, available, failed)

### Managing Snapshots

For each snapshot you can:
- **View Details**: See full snapshot information
- **Create VM**: Launch a new VM from this snapshot
- **Delete**: Remove the snapshot to free storage

### Creating VM from Snapshot

1. Find the snapshot in the list
2. Click **Create VM** or **Restore**
3. Configure the new VM:
   - Name (required)
   - Resources (can differ from original)
   - SSH key
   - Project
4. Click **Create**
5. New VM is created with snapshot data

### Snapshot Best Practices

- **Name descriptively**: Include date or purpose
- **Snapshot before changes**: Create before major updates
- **Clean up regularly**: Delete old snapshots to save costs
- **Document snapshots**: Note what state they capture

## Best Practices

### Cost Optimization
- Stop VMs when not in use
- Right-size resources based on actual usage
- Delete VMs when projects are complete

### Security
- Keep the OS updated
- Don't expose unnecessary ports
- Use SSH keys, not passwords
- Consider firewall rules inside the VM

### Reliability
- Create regular snapshots
- Use NFS for important data
- Monitor disk space usage

## Troubleshooting

### Cannot Connect via SSH

1. Verify VM is Running
2. Check the correct IP address
3. Ensure your SSH key matches
4. Check if SSH service is running:
   ```bash
   # From VM console if available
   sudo systemctl status sshd
   ```

### VM is Slow

- Check CPU/memory usage
- Verify GPU is being utilized properly
- Check for disk space issues
- Review running processes

### GPU Not Detected

```bash
# Check if driver is loaded
lsmod | grep nvidia

# Reinstall drivers if needed
sudo apt install nvidia-driver-535
```

## Next Steps

Explore the [GPU Marketplace](/docs/compute/gpu-marketplace/) for dedicated baremetal instances.

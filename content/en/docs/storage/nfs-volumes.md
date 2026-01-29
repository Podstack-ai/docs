---
title: NFS Volumes
---

# NFS Volumes

NFS (Network File System) volumes provide persistent, mountable storage that can be shared across multiple pods and VMs.

## What is NFS Storage?

NFS volumes are network-attached storage that:
- Persists independently of compute resources
- Can be mounted by multiple pods/VMs simultaneously
- Provides filesystem-level access (read/write files directly)
- Survives pod restarts and deletions

## Creating an NFS Volume

1. Navigate to **Storage > Volumes**
2. Click **Create Volume**
3. Configure:
   - **Name**: Descriptive identifier
   - **Quota**: Storage size in GB
   - **Billing Period**: Monthly or on-demand
4. Click **Create**

### Volume Configuration

**Quota**
Set the maximum storage size. You can increase the quota later, but reducing it requires data migration.

**Billing Period**
- **Monthly**: Fixed monthly cost, better for long-term use
- **On-demand**: Hourly billing, flexible for short-term needs

## Mounting Volumes

### In Pods

When creating or editing a pod:

1. Go to the **Volumes** section
2. Click **Add Volume**
3. Select your NFS volume
4. Specify the mount path (e.g., `/data`)
5. Save the configuration

The volume is automatically mounted when the pod starts.

**Example mount paths**:
- `/data` - General data directory
- `/models` - Model storage
- `/checkpoints` - Training checkpoints
- `/shared` - Shared team files

### In Virtual Machines

SSH into your VM and mount manually:

```bash
# Create mount point
sudo mkdir -p /mnt/data

# Mount the NFS volume
sudo mount -t nfs <nfs-server>:<share-path> /mnt/data

# Verify mount
df -h /mnt/data
```

**Make mount persistent** (survives reboot):
```bash
# Add to /etc/fstab
echo "<nfs-server>:<share-path> /mnt/data nfs defaults 0 0" | sudo tee -a /etc/fstab
```

The NFS server and share path are shown on the volume detail page.

## Managing Volumes

### Viewing Volumes

Navigate to **Storage > Volumes** to see:
- All your NFS volumes
- Status (Available, In Use)
- Size and usage
- Hourly cost

### Volume Details

Click on a volume to see:
- Mount instructions
- Usage statistics
- Connected resources
- Billing information

### Increasing Quota

To expand a volume:

1. Open volume details
2. Click **Update Quota**
3. Enter new size (must be larger)
4. Confirm the change

The additional space is immediately available.

### Deleting a Volume

1. Ensure no pods/VMs are using the volume
2. Click **Delete**
3. Confirm deletion

**Warning**: All data on the volume is permanently deleted.

## Volume Status

| Status | Description |
|--------|-------------|
| Creating | Volume being provisioned |
| Available | Ready to mount |
| In Use | Mounted by one or more resources |
| Deleting | Being removed |

## Use Cases

### Shared Datasets

Store training data once, access from multiple pods:
```
Volume: /datasets
├── imagenet/
├── coco/
└── custom-data/
```

### Model Checkpoints

Save checkpoints that persist across pod restarts:
```python
# In your training code
checkpoint_dir = '/checkpoints'
model.save(f'{checkpoint_dir}/epoch_{epoch}.pt')
```

### Team Collaboration

Share files between team members:
```
Volume: /shared
├── experiments/
├── results/
└── configs/
```

### Development Environment

Mount code and configurations:
```
Volume: /workspace
├── code/
├── configs/
└── logs/
```

## Performance Considerations

### Optimal Use Cases
- Sequential reads/writes
- Large file operations
- Shared access patterns

### Less Optimal For
- Small random I/O
- Database workloads
- High-frequency metadata operations

### Performance Tips

1. **Use local storage for temp files** - Write temporary files to local disk, final results to NFS
2. **Batch small writes** - Buffer small writes before flushing to NFS
3. **Parallel access** - NFS handles concurrent reads well

## Billing

NFS volumes are billed based on:
- **Provisioned quota** (not actual usage)
- Hourly rate per GB

To minimize costs:
- Right-size quotas based on actual needs
- Delete unused volumes
- Consider monthly billing for long-term storage

## Troubleshooting

### Mount Failed

```bash
# Check NFS service
showmount -e <nfs-server>

# Verify network connectivity
ping <nfs-server>

# Check mount options
mount -v -t nfs <nfs-server>:<path> /mnt/data
```

### Permission Denied

```bash
# Check current permissions
ls -la /mnt/data

# Most NFS mounts use root
sudo chown -R $(whoami):$(whoami) /mnt/data
```

### Stale File Handle

If you see "Stale file handle" errors:
```bash
# Unmount and remount
sudo umount -f /mnt/data
sudo mount -t nfs <nfs-server>:<path> /mnt/data
```

### Volume Full

1. Check usage: `df -h /mnt/data`
2. Clean up unneeded files
3. Increase quota if needed

## Best Practices

1. **Plan capacity** - Start with adequate quota, expanding is easy
2. **Organize files** - Use clear directory structures
3. **Regular cleanup** - Delete old checkpoints and logs
4. **Backup important data** - Copy critical files to object storage
5. **Document mount paths** - Keep consistent paths across pods

## Next Steps

- Learn about [Billing](/docs/billing/) for storage costs
- Set up [Object Storage](/docs/storage/object-storage/) for file archival

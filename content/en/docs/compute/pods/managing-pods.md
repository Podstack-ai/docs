---
title: Managing Pods
---

# Managing Pods

Learn how to monitor, control, and manage your running pods.

## Viewing Pods

Navigate to **Compute > Pods** to see all pods in the current project.

### Pod List View

The list shows:
- **Name**: Pod identifier
- **Status**: Current state (Running, Stopped, etc.)
- **Image**: Container image being used
- **Resources**: GPU, CPU, memory allocation
- **Age**: Time since creation
- **Cost**: Current hourly rate

### Filtering and Sorting

- Filter by status (Running, Stopped, All)
- Filter by project
- Search by pod name

## Pod Actions

### Start a Pod

For stopped pods:
1. Find the pod in the list
2. Click the **Start** button (play icon)
3. Wait for status to change to Running

Billing resumes when the pod starts.

### Stop a Pod

To pause a running pod:
1. Click the **Stop** button (pause icon)
2. Confirm the action
3. Pod enters Stopped state

**Benefits of stopping**:
- Billing pauses immediately
- Pod configuration is preserved
- Can be restarted later

**Note**: Ephemeral storage may be lost when stopping. Use NFS volumes for persistent data.

### Restart a Pod

To restart without stopping:
1. Click the **Restart** button
2. Container will stop and start again

Useful for applying configuration changes or recovering from issues.

### Delete a Pod

To permanently remove a pod:
1. Click the **Delete** button (trash icon)
2. Confirm the deletion
3. Pod and its ephemeral storage are removed

**Warning**: Deletion is permanent. Ensure you've saved any important data.

## Monitoring

### Pod Details

Click on a pod to view detailed information:

**Overview**
- Full configuration details
- Creation time
- SSH connection string
- Jupyter URL (if enabled)

**Stats**
Real-time metrics:
- CPU usage percentage
- Memory usage
- GPU utilization
- GPU memory usage
- Network I/O

**Logs**
View container output:
- Real-time log streaming
- Search within logs
- Download logs

### Billing Information

Each pod detail page shows:
- Current hourly rate
- Total cost since creation
- Cost breakdown by resource type

## Scaling Pods

For pods configured with replicas:

1. Go to pod details
2. Click **Scale**
3. Enter new replica count
4. Confirm

Each replica runs independently and is billed separately.

## Bulk Operations

To manage multiple pods:
1. Select pods using checkboxes
2. Use bulk action buttons (Stop All, Delete Selected)

## Pod Health

Podstack monitors pod health automatically:

| Indicator | Meaning |
|-----------|---------|
| Green | Healthy, running normally |
| Yellow | Warning, may need attention |
| Red | Error, intervention required |

Check logs for details when health is degraded.

## Best Practices

### Cost Management
- Stop pods when not actively using them
- Delete pods when work is complete
- Use templates for reproducible deployments

### Data Persistence
- Mount NFS volumes for important data
- Don't rely on ephemeral storage for critical files
- Back up data before deleting pods

### Resource Optimization
- Right-size GPU, CPU, and memory
- Monitor actual usage vs. allocation
- Reduce resources if over-provisioned

## Next Steps

Learn about [Connecting to Pods](/docs/compute/pods/connecting-to-pods/) for SSH, terminal, and notebook access.

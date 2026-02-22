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
- Port mappings and access URLs

**Stats (Real-Time)**
Live metrics streamed via WebSocket:
- CPU usage percentage
- Memory usage and limits
- GPU utilization per GPU
- GPU memory usage
- Network I/O (bytes in/out)
- Disk usage

Stats update automatically without refreshing the page.

**Logs (Real-Time Streaming)**
View container output with live streaming:
- Real-time log streaming via WebSocket
- Logs appear as they're generated
- Search and filter within logs
- Download logs for offline analysis
- Automatic reconnection on connection drop

**Terminal**
Access an interactive terminal directly in your browser:
- Click **Terminal** button on pod details
- Opens in a new window for focused work
- Full terminal emulation with copy/paste support
- No SSH client or keys required
- Works through firewalls

**Exposed Ports**
Manage exposed ports on running pods:
- View all currently exposed ports with their HTTPS URLs
- **Add Port**: Expose a new container port dynamically
- **Remove Port**: Stop exposing a port
- Each port gets an auto-generated HTTPS endpoint: `https://<subdomain>-<port>.cloud.podstack.ai`
- Port 22 (SSH) uses the format: `ssh-<subdomain>.cloud.podstack.ai`

### Billing Information

Each pod detail page shows:
- Current hourly rate
- Total cost since creation
- Cost breakdown by resource type

## Scaling Pods

For pods configured with replicas:

1. Go to pod details
2. Click **Scale**
3. Enter new replica count (increase or decrease)
4. Confirm the scaling operation

**Scaling Behavior:**
- Scaling up creates additional identical replicas
- Scaling down terminates excess replicas gracefully
- Each replica runs independently and is billed separately
- Billing adjusts immediately based on replica count

**Use Cases:**
- Scale up for parallel processing workloads
- Scale down during off-peak hours to save costs
- Dynamically adjust based on workload demands

## Auto-Stop on Insufficient Balance

When your wallet balance becomes insufficient:

1. Warning notification is sent
2. Pods may be automatically stopped after a grace period
3. Data on ephemeral storage may be lost
4. NFS-mounted volumes preserve data

**To Prevent Auto-Stop:**
- Maintain adequate wallet balance
- Set up auto-debit for automatic top-ups
- Monitor low balance warnings
- Stop unused pods manually to conserve balance

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

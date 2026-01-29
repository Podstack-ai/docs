---
title: GPU Marketplace
description: "Cheapest baremetal GPU rental - H100, H200, A100, L40S, V100 with NVLink. Zero lock-in, pay per hour. Best prices for dedicated GPU servers."
keywords:
  - cheapest baremetal GPU
  - cheap dedicated GPU
  - affordable GPU server rental
  - budget baremetal GPU
  - pocket friendly GPU rental
  - GPU marketplace cheap
  - baremetal GPU no lock-in
  - zero lock-in dedicated GPU
  - hourly GPU rental
  - pay per hour GPU
  - H100 GPU cheap
  - H200 GPU affordable
  - A100 GPU budget
  - L40S GPU rental
  - V100 cheap rental
  - B200 GPU cloud
  - GB200 supercomputer
  - NVLink GPU cluster
  - dedicated GPU for students
  - RunPod alternative
  - Vast.ai alternative
  - Lambda Labs alternative
  - CoreWeave alternative
  - NeoCloud alternative
  - Paperspace alternative
---

# GPU Marketplace

The GPU Marketplace provides access to dedicated baremetal GPU instances for maximum performance and resource isolation.

## What is Baremetal?

Baremetal instances run directly on physical hardware without virtualization overhead. This provides:

- **Maximum Performance** - No hypervisor layer
- **Dedicated Resources** - Hardware exclusively for your use
- **Consistent Performance** - No noisy neighbor issues
- **Full Hardware Access** - Direct GPU memory and NVLINK

## Available GPU Types

The marketplace offers various NVIDIA GPUs:

| GPU | Memory | Interconnect | Best For |
|-----|--------|--------------|----------|
| B300 | 192GB | NVLink | Latest generation AI |
| B200 | 192GB | NVLink | Large-scale training |
| GB200 | 192GB | NVLink | Supercomputing |
| H200 | 141GB | NVLink | Memory-intensive models |
| H100 | 80GB | NVLink | Production training |
| A100 | 40/80GB | NVLink | General ML training |
| L40S | 48GB | PCIe | Training & inference |
| V100 | 16/32GB | NVLink | Cost-effective training |

Availability varies based on inventory and demand.

## Browsing the Marketplace

### Viewing Inventory

1. Navigate to **Compute > GPU Marketplace**
2. Browse available instance configurations
3. Filter by GPU type
4. View pricing and specifications

### Instance Details

Each listing shows:
- **GPU Configuration** - Type and count
- **System Specs** - CPU, memory, storage
- **Pricing** - Hourly rate (including GST)
- **Availability** - In stock or waitlist

## Reservation Process

### Step 1: Select an Instance

1. Find an available instance
2. Review specifications and pricing
3. Click **Reserve**

### Step 2: Confirm Reservation

1. Select your project
2. Choose billing period
3. Confirm the reservation
4. Complete payment if required

### Step 3: Provisioning

After reservation:
1. Status changes to **Provisioning**
2. Instance is prepared (may take hours for baremetal)
3. SSH credentials are provided when ready
4. Status changes to **Active**

## Managing Reservations

### View Reservations

Navigate to **GPU Marketplace > My Reservations** to see:
- All active and pending reservations
- Provisioning status
- Payment status
- Connection details

### Reservation Status

| Status | Description |
|--------|-------------|
| Pending Payment | Awaiting payment confirmation |
| Provisioning | Instance being prepared |
| Active | Ready to use |
| Cancelled | Reservation cancelled |

### Cancel a Reservation

Before provisioning completes:
1. Find the reservation
2. Click **Cancel**
3. Refund processed if applicable

## Active Instances

### Viewing Instances

Go to **GPU Marketplace > My Instances** for:
- All provisioned baremetal instances
- Connection information
- Instance specifications

### Connecting

Baremetal instances provide SSH access:
```bash
ssh root@<instance-ip>
```

Connection details including IP and credentials are shown on the instance detail page.

### Terminating

To end a baremetal instance:
1. Find the instance
2. Click **Terminate**
3. Confirm the action

Billing stops after termination.

## Pricing

Baremetal pricing is shown per hour and includes:
- GPU costs
- System resources (CPU, memory, storage)
- Network bandwidth
- GST (for India)

Pricing is displayed transparently in the marketplace listing.

## Waitlist

When desired GPU types are unavailable:

### Joining the Waitlist

1. Select the unavailable GPU type
2. Click **Join Waitlist**
3. Enter your requirements
4. Submit

### Notification

When inventory becomes available:
- You'll receive an email notification
- Act quickly as inventory is first-come-first-served

### Managing Waitlist

View and manage your waitlist entries:
- See your position
- Cancel waitlist entries
- Update requirements

## Use Cases

### Large Model Training
- Multi-GPU instances with NVLink
- H100/A100 for transformer models
- Long reservation periods

### Batch Processing
- Reserve for specific time periods
- Process large datasets
- Release when complete

### Production Inference
- Dedicated resources for SLA
- Consistent latency
- No resource contention

## Best Practices

1. **Plan Ahead** - Popular GPUs sell out quickly
2. **Right-Size** - Choose appropriate GPU for your workload
3. **Monitor Usage** - Ensure GPUs are utilized efficiently
4. **Use Waitlist** - Get notified when preferred GPUs available

## Next Steps

- Set up [Storage](/docs/storage/) for your training data
- Configure [Billing](/docs/billing/) for reservations

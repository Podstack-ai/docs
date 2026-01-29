---
title: Storage
description: "Cloud storage for ML workloads - S3-compatible object storage and NFS volumes. Store training data, model checkpoints, and datasets with high-performance access."
keywords:
  - cloud GPU storage
  - ML dataset storage
  - S3 compatible storage
  - NFS cloud storage
  - model checkpoint storage
  - training data storage
  - AI cloud storage
  - persistent GPU storage
---

# Storage

Podstack provides two types of storage for your workloads: S3-compatible object storage for files and NFS volumes for persistent shared storage.

## Storage Options

### Object Storage (Buckets)

S3-compatible storage for files and objects:
- Store training data, models, logs
- Public or private access control
- Versioning support
- Upload via web UI or API

**Best for**: Large datasets, model artifacts, static files, backups

[Learn about Object Storage](/docs/storage/object-storage/)

### NFS Volumes

Network-attached persistent storage:
- Mount across multiple pods/VMs simultaneously
- Persistent data that survives resource deletion
- Configurable storage quotas

**Best for**: Shared datasets, working directories, checkpoints

[Learn about NFS Volumes](/docs/storage/nfs-volumes/)

## Comparison

| Feature | Object Storage | NFS Volumes |
|---------|---------------|-------------|
| Access Pattern | HTTP/S3 API | Filesystem mount |
| Sharing | URL/presigned links | Direct mount |
| Performance | High throughput | Low latency |
| Use Case | Large files, archives | Working data |
| Public Access | Supported | No |
| Mount in Pod/VM | Via S3 clients | Native NFS |

## Storage Billing

Both storage types are billed hourly:
- **Object Storage**: Based on actual data stored
- **NFS Volumes**: Based on provisioned quota

View storage costs in your [Wallet](/docs/billing/wallet/) expenditure breakdown.

## Best Practices

### Data Organization
- Use buckets for input data and final outputs
- Use NFS for active working directories
- Organize files with clear naming conventions

### Cost Management
- Delete unused files and buckets
- Right-size NFS volume quotas
- Use lifecycle policies for old data

### Performance
- Use NFS for frequently accessed data
- Use object storage for archival
- Consider data locality when deploying resources

## Next Steps

- [Set up Object Storage](/docs/storage/object-storage/)
- [Create NFS Volumes](/docs/storage/nfs-volumes/)

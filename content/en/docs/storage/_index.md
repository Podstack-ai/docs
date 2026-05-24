---
title: Storage

weight: 40
description: "Cloud storage for ML workloads - S3-compatible object storage, file storage, and NFS volumes. Store training data, model checkpoints, and datasets with high-performance access."
keywords:
  - cloud GPU storage
  - ML dataset storage
  - S3 compatible storage
  - NFS cloud storage
  - object storage
  - file storage
  - model checkpoint storage
  - training data storage
---
# Storage

Podstack offers three storage products tuned for different access patterns:

| Product | Best for | Access |
|---------|----------|--------|
| **Object Storage** | Datasets, model artifacts, public sharing, backups | S3 API / HTTPS |
| **File Storage** | Working data shared across pods (MinIO/TrueNAS-backed) | S3 API |
| **NFS Volumes** | Filesystem mounts inside pods (checkpoints, working dirs) | NFS mount |

## Object Storage

S3-compatible buckets with per-bucket plan subscriptions, IAM users/roles, public sharing via presigned URLs, and versioning. Provisioned in a backing storage region per project.

[Learn about Object Storage](/docs/storage/object-storage/)

## File Storage

Project-scoped S3-compatible storage backed by self-hosted MinIO/TrueNAS. Use when you want S3 semantics but on cluster-local infrastructure (lower egress, no third-party plan). Gated by the `REACT_APP_ENABLE_FILE_STORAGE` build flag.

[Learn about File Storage](/docs/storage/file-storage/)

## NFS Volumes

Network-attached filesystem volumes that mount directly inside pods. Multiple pods can mount the same volume simultaneously. Billed on provisioned quota, not actual usage.

[Learn about NFS Volumes](/docs/storage/nfs-volumes/)

## Comparison

| Feature | Object Storage | File Storage | NFS Volumes |
|---------|---------------|--------------|-------------|
| Access | HTTP / S3 API | S3 API | Filesystem mount |
| Public sharing | Yes (presigned + public buckets) | No | No |
| Multi-pod access | Yes (via clients) | Yes (via clients) | Yes (native mount) |
| Billing basis | Subscription plan | Subscription plan | Provisioned quota |
| Versioning | Yes | Yes | No |
| Best for | Datasets, artifacts | Working datasets | Checkpoints, working dirs |

## Next Steps

- [Set up Object Storage](/docs/storage/object-storage/)
- [Set up File Storage](/docs/storage/file-storage/)
- [Create NFS Volumes](/docs/storage/nfs-volumes/)

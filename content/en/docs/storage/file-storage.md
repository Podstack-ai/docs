---
title: File Storage
description: "S3-compatible file storage backed by self-hosted MinIO/TrueNAS for working datasets shared across pods."
keywords:
  - file storage
  - MinIO
  - TrueNAS
  - S3 compatible storage
  - working data storage
---

# File Storage

File Storage is Podstack's project-scoped S3 service backed by self-hosted MinIO/TrueNAS infrastructure. It uses the same S3 protocol as [Object Storage](/docs/storage/object-storage/) but is hosted on cluster-local hardware — ideal for working datasets that pods read from heavily, where egress to a third-party object store would dominate cost.

Find it under **File Storage** in the sidebar (`/portal/storage`). The page is hidden when the platform sets `REACT_APP_ENABLE_FILE_STORAGE=false` at build time.

## When to Use File Storage vs Object Storage

| Use File Storage when… | Use Object Storage when… |
|------------------------|--------------------------|
| Data is hot — pods read it on every job | Data is archival or cold |
| You want low egress between pods and storage | You need public sharing or presigned URLs |
| You're keeping the data inside one cluster | You want managed regional storage with a subscription plan |

For long-term archives, public datasets, and model release artifacts, prefer [Object Storage](/docs/storage/object-storage/).

## Creating a Bucket

1. Open **File Storage** and pick your project.
2. Click **Create Bucket**.
3. Configure:
   - **Name**: lowercase, S3-compatible bucket name
   - **Description** (optional)
   - **Max Size**: provisioned quota (1 GB – 10 TB)
   - **Visibility**: Public or Private
   - **Versioning**: keep file history when objects are overwritten
4. Click **Create**.

The bucket is provisioned on the cluster's storage backend and a set of S3 credentials is issued.

## Managing Files

### Upload

- **Web UI**: drag and drop or click **Upload**. The global upload manager handles chunking and continues uploads across page navigation.
- **S3 API**: use any S3-compatible client with the bucket's credentials.

### Browse and Operate

The bucket detail view exposes folder navigation, search, single-object download, bulk-select with bulk delete, and a per-object presigned URL generator for sharing.

### Bucket Settings

From the settings icon you can:

- Edit the description
- Toggle public/private visibility
- Update the maximum size (quota)
- Force-delete the bucket including all contents (irreversible)

## Quotas

Buckets enforce a maximum size at write time:

- Uploads that would exceed the quota fail at the API level.
- The bucket card surfaces current usage vs. quota.
- You can raise the quota anytime; lowering it requires support.

## Billing

File Storage is billed per project on quota and usage (not on a fixed plan). See your wallet's expenditure breakdown for the current rate.

## Next Steps

- [Object Storage](/docs/storage/object-storage/) — for shareable, presigned, public-facing storage
- [NFS Volumes](/docs/storage/nfs-volumes/) — for filesystem mounts inside pods

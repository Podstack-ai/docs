---
title: Object Storage

weight: 10
description: "S3-compatible object storage with per-bucket subscription plans, IAM users, presigned URLs, and public sharing for ML datasets and model artifacts."
keywords:
  - object storage
  - S3 compatible storage
  - bucket IAM
  - presigned URL
  - public bucket
  - versioning
---
# Object Storage

Podstack Object Storage is an S3-compatible service for buckets, files, and structured access control. Each bucket is independently provisioned with a subscription plan and is project-scoped.

Find it under **Object Storage** in the sidebar (also reachable at `/portal/drive`).

## Creating a Bucket

1. Open **Object Storage** and pick your project.
2. Click **Create Bucket**.
3. Configure:
   - **Name**: lowercase, S3-compatible bucket name
   - **Plan**: pick a storage subscription tier (sets the included capacity and monthly price)
   - **Region**: backing storage region (set by platform config)
   - **Versioning**: keep file history when objects are overwritten
   - **Public**: list contents publicly via a presigned URL (otherwise private)
4. Click **Create**.

When you create a bucket the plan price is debited from your wallet, the bucket is provisioned in the backing storage, and a dedicated set of S3 credentials is generated for it.

### Plans and Auto-Renewal

Each bucket carries a plan subscription with a fixed monthly price for an included capacity ceiling.

- Subscriptions renew automatically every cycle by debiting your wallet.
- A failed renewal is retried hourly; after 24 hours of dunning the bucket is escalated to support.
- The **Usage** bar on each bucket card shows current used capacity vs. the plan ceiling.
- You can upgrade or downgrade the plan from the bucket settings panel; the new price applies from the next renewal.

### Versioning

When versioning is enabled, overwriting a file creates a new version rather than replacing it. You can browse and restore prior versions from the object's metadata panel.

## Managing Files

### Upload

- **Web UI**: drag-and-drop or click **Upload**. Large files are chunked automatically and uploads continue across page navigation via the global upload manager.
- **S3 API**: use any S3-compatible client with the credentials issued for the bucket.

```python
import boto3

s3 = boto3.client('s3',
    endpoint_url='https://s3.podstack.ai',
    aws_access_key_id='YOUR_ACCESS_KEY',
    aws_secret_access_key='YOUR_SECRET_KEY')

s3.upload_file('local.bin', 'my-bucket', 'remote.bin')
```

### Object Browser

The web object browser supports:

- Folder-like prefixes (`foo/bar/baz.txt`)
- Inline preview of small text/image files
- Bulk select + bulk delete
- Per-object metadata panel: size, last modified, ETag, content-type, version history
- Per-object presigned download URL via the **Get Link** action (configurable expiry)

### Delete

Single delete and bulk delete are both supported. With versioning enabled, deletes create a delete marker — previous versions remain restorable until the marker is purged.

## Sharing and Access

### Presigned URLs

Generate time-limited URLs for individual objects without exposing credentials. Right-click an object → **Get Link** → choose expiry.

### Public Buckets

Marking a bucket public lets anyone with the URL list and read its contents. Podstack serves public listings via a rotating 7-day presigned URL. The bucket card surfaces a one-click **Copy Public URL** action.

If `public_url` generation is disabled on the platform, use the **Generate URL** button to mint an on-demand share link instead.

### IAM Users, Access Keys, and Roles

Each bucket has its own **Access** panel for granular access control:

- Create per-bucket IAM users with named credentials
- Generate or rotate access keys per IAM user
- Assign roles that scope what each user can do (read, write, list, delete)
- Revoke keys at any time without touching the master credentials

Use IAM users to give an application or teammate scoped access to one bucket without sharing the bucket's primary credentials.

## Using Object Storage from Pods

### From a Container

```bash
pip install boto3 awscli
aws configure   # paste the bucket's access/secret key
aws s3 cp s3://my-bucket/data.tar.gz /data/ --endpoint-url https://s3.podstack.ai
```

### Mount as a Filesystem

```bash
sudo apt install s3fs
echo "ACCESS_KEY:SECRET_KEY" > ~/.passwd-s3fs
chmod 600 ~/.passwd-s3fs
s3fs my-bucket /mnt/s3 -o passwd_file=~/.passwd-s3fs -o url=https://s3.podstack.ai
```

## Deleting a Bucket

1. Open the bucket's settings.
2. Click **Delete Bucket** — confirm by typing the bucket name.
3. All objects, versions, and delete markers are removed before the bucket itself is deprovisioned.

Bucket deletion is irreversible and stops the plan subscription immediately. There are no pro-rata refunds — the current billing period has already been charged in full.

## Billing

Buckets are billed on a **per-bucket subscription plan**, not on actual storage usage. Each bucket has a flat monthly price for an included capacity ceiling; exceeding the ceiling prompts you to upgrade the plan.

Charges appear under **Object Storage (Buckets)** in your wallet expenditure breakdown and on monthly invoices.

## Best Practices

1. **One bucket per logical dataset** — keeps lifecycle and access scoped.
2. **Use IAM users** for shared workloads instead of distributing master keys.
3. **Enable versioning** on irreplaceable buckets (training artifacts, eval datasets).
4. **Right-size plans** — start small, upgrade when the usage bar approaches the ceiling.
5. **Prefer presigned URLs** over making whole buckets public when you only need to share specific objects.

## Next Steps

- [File Storage](/docs/storage/file-storage/) — when you want S3 semantics on cluster-local infra
- [NFS Volumes](/docs/storage/nfs-volumes/) — for filesystem mounts inside pods

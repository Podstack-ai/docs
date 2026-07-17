---
title: Storage & Data
weight: 40
description: "Give your Podstack QuickPods persistent storage — attach NFS volumes at /data so datasets, models, and outputs survive restarts, plus object storage for large data and how to move files in and out."
keywords:
  - persistent GPU storage
  - NFS volume
  - pod storage
  - mount volume pod
  - /data mount path
  - object storage
  - data volumes
  - ephemeral disk
  - move files to pod
  - persist model checkpoints
---
# Storage & Data

A pod's own disk is **ephemeral** — anything written inside the container that isn't on an attached volume can be lost when the pod stops, is deleted, or is recreated. To keep datasets, model checkpoints, and outputs, put them on **persistent storage**.

Every Podstack image expects your persistent storage at **`/data`**. Mount a volume there and your work survives restarts and recreations.

```bash
# Typical layout inside a pod
/data/
├── datasets/      # input data
├── models/        # checkpoints, weights
└── output/        # results
```

## Storage options

| Option | Best for | How a pod uses it |
|---|---|---|
| **NFS Volume** | Shared, persistent filesystem for pods | Mounted into the pod at a path (default `/data`) |
| **Data Volume** | Standalone disk (blank, or imported from a URL/registry/PVC) | Attached as a persistent disk |
| **Object Storage** | Large datasets, artifacts, S3-compatible access | Accessed over the S3 API / CLI from inside the pod |
| **File Storage** | On-cluster S3 buckets with lower egress | Accessed over the S3 API (may be gated per account) |

For most QuickPod workflows you'll attach an **NFS Volume** at `/data`. See the full [Storage](/docs/storage/) section for object and file storage.

## Create an NFS Volume

You can create a volume ahead of time from the **NFS Volumes** page, or inline while launching a pod.

1. Go to **NFS Volumes** and click **Create Volume**. (You need a selected project and a verified account.)
2. In the **Create NFS Volume** dialog, fill in:
   - **Volume Name** — letters, numbers, and hyphens only (no dots or spaces).
   - **Project** — pre-selected (read-only).
   - **Quota (GB)** — choose **No Limit** or a size (10, 25, 50, 100, 250, 500, or 1000 GB). Default is 50 GB.
   - **Billing Period** — **Monthly**, **Quarterly**, or **Annual**.
   - **Enable NFS access** — leave checked so pods can mount it.
3. Review the **Estimated Cost** panel (rate per GB, GST, and any period discount). The volume is billed upfront for the period.
4. Click **Create Volume**.

<!-- screenshot: the Create NFS Volume dialog with quota dropdown and estimated cost -->

A volume's status is one of **active**, **suspended**, **pending_deletion**, **deleted**, or **error**. You can mount an **active** volume into any pod in the same project.

> Billing is on the **provisioned quota**, not on how much you've written. The whole billing cycle is charged with no pro-rated refund if you delete early.

## Attach a volume to a pod

During launch, in the **Configure** step's **NFS Volume** card (see [Launch a Pod](/docs/quickpod/launch-a-pod/#nfs-volume-optional)):

1. Select your volume from the list (or **No Volume** for ephemeral storage only).
2. Set the **Mount Path Inside Pod** — keep the default `/data` unless you have a reason to change it.
3. Launch the pod. The volume is mounted automatically when the pod starts.

Multiple pods in the same project can mount the same NFS volume at once — useful for sharing a dataset across parallel jobs.

> **ComfyUI note.** For the [ComfyUI](/docs/container-images/comfyui/) image, don't change the `/data` mount path — its custom nodes, models, and workflows live under `/data` and need to stay there to survive a restart.

## Data Volumes

For a standalone disk (rather than a shared NFS export), use a **Data Volume**:

1. Go to **Data Volumes** and click **Create Volume**.
2. Step through the wizard: **Project → Basic Info → Storage → Source → Review**.
   - **Basic Info** — **Volume Name** (lowercase; letters, numbers, hyphens, dots) and an optional **Description**.
   - **Storage** — **Size (GB)** (minimum 1 GB), an optional **Storage Class**, and an **Access Mode** (`ReadWriteOnce`, `ReadWriteMany`, or `ReadOnlyMany`).
   - **Source** — **Blank Disk**, import from an **HTTP/HTTPS URL**, pull from a **Container Registry**, or clone an existing **PVC**.
3. Finish the wizard to provision the volume.

## Moving files in and out

### Over SSH / SCP

If your pod has an SSH key attached, copy files with `scp` using the pod's SSH endpoint:

```bash
scp -i ~/.ssh/<key_name> ./dataset.zip podstack@ssh-<subdomain>.cloud.podstack.ai:/data/datasets/
```

### From object storage

Inside the pod, pull large datasets from an S3 bucket:

```bash
aws s3 cp s3://my-bucket/dataset.tar.gz /data/datasets/ --endpoint-url https://s3.podstack.ai
```

See [Object Storage](/docs/storage/object-storage/) for buckets, access keys, and presigned URLs.

### Browse outputs in your browser

To download generated files (renders, images, processed video) from `/data/output/`, expose a port and serve the directory with Python's built-in HTTP server. See [Accessing Output Files in the Browser](/docs/container-images/#accessing-output-files-in-the-browser).

## What persists, and what doesn't

- **Persists:** anything on an attached NFS Volume or Data Volume, and anything in Object/File Storage. These survive pod stop, delete, and recreation.
- **May be lost:** anything written to the container's own disk outside a mounted volume — especially when you **stop** or **delete** the pod.

**Rule of thumb:** write temporary scratch files to local disk for speed, but write anything you want to keep to `/data`.

## Next steps

- [Launch a Pod](/docs/quickpod/launch-a-pod/) — attach a volume during launch.
- [MLOps](/docs/quickpod/mlops/) — track experiments and register the models you produce.
- [Storage](/docs/storage/) — object storage, file storage, and NFS in depth.

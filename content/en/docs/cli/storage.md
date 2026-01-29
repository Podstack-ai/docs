---
title: Storage
description: "Podstack CLI storage commands. Manage buckets and NFS volumes from the terminal."
keywords:
  - CLI storage commands
  - bucket management CLI
  - NFS volume terminal
  - S3 compatible CLI
---

# Storage

Manage object storage and NFS volumes using CLI commands.

## Buckets

### Create Bucket

```bash
# Private bucket
podstack bucket create my-bucket

# Public bucket
podstack bucket create my-bucket --visibility public

# With project
podstack bucket create my-bucket --project my-project
```

### List Buckets

```bash
podstack bucket list
podstack bucket list --output json
```

### Get Bucket Info

```bash
podstack bucket get my-bucket
```

### Upload Files

```bash
# Single file
podstack bucket upload my-bucket ./data.csv data/data.csv

# Directory (recursive)
podstack bucket upload my-bucket ./training-data/ data/ --recursive

# With progress
podstack bucket upload my-bucket ./large-file.tar data/ --progress
```

### Download Files

```bash
# Single file
podstack bucket download my-bucket data/model.pt ./model.pt

# Directory
podstack bucket download my-bucket results/ ./results/ --recursive
```

### List Objects

```bash
# List all
podstack bucket ls my-bucket

# List with prefix
podstack bucket ls my-bucket --prefix data/

# Long format
podstack bucket ls my-bucket -l
```

### Delete Objects

```bash
# Single object
podstack bucket rm my-bucket data/old-file.txt

# Multiple objects
podstack bucket rm my-bucket data/file1.txt data/file2.txt

# Recursive (delete folder)
podstack bucket rm my-bucket old-data/ --recursive
```

### Sync Directories

```bash
# Upload sync (local to bucket)
podstack bucket sync ./local-data/ my-bucket:data/ --direction upload

# Download sync (bucket to local)
podstack bucket sync my-bucket:data/ ./local-data/ --direction download

# Delete extra files in destination
podstack bucket sync ./local-data/ my-bucket:data/ --delete
```

### Presigned URLs

```bash
# Download URL (1 hour)
podstack bucket presign my-bucket data/file.txt --expires 3600

# Upload URL
podstack bucket presign my-bucket uploads/new-file.txt --method PUT --expires 3600
```

### S3 Credentials

Get credentials for S3-compatible access:

```bash
podstack bucket credentials my-bucket
```

Output:

```
Access Key: AKIAXXXXXXXXXX
Secret Key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Endpoint: https://s3.podstack.ai
Region: us-east-1
```

### Delete Bucket

```bash
# Delete empty bucket
podstack bucket delete my-bucket

# Force delete (removes all objects)
podstack bucket delete my-bucket --force
```

## NFS Volumes

### Create Volume

```bash
podstack volume create \
  --name shared-data \
  --quota 100

# With project
podstack volume create \
  --name shared-data \
  --quota 100 \
  --project my-project
```

### List Volumes

```bash
podstack volume list
podstack volume list --output json
```

### Get Volume Info

```bash
podstack volume get my-volume
```

Output:

```
Name: my-volume
ID: vol-123456
Quota: 100 GB
Used: 45.2 GB
NFS Server: nfs.podstack.ai
NFS Path: /exports/vol-123456
Mount: mount -t nfs nfs.podstack.ai:/exports/vol-123456 /mnt/data
```

### Resize Volume

```bash
podstack volume resize my-volume --quota 200
```

### Mount in Pod

Create pod with volume mount:

```bash
podstack pod create \
  --name my-pod \
  --image pytorch/pytorch:latest \
  --volume vol-123:/data
```

### Delete Volume

```bash
podstack volume delete my-volume

# Force delete (removes all data)
podstack volume delete my-volume --force
```

## Examples

### Dataset Management

```bash
# Create bucket for datasets
podstack bucket create ml-datasets

# Upload training data
podstack bucket upload ml-datasets ./imagenet/ imagenet/ --recursive --progress

# Create pod and use data
podstack pod create --name training --image pytorch/pytorch:latest --gpu-type A100

# Mount bucket in pod (via init script)
podstack pod exec training -- aws s3 sync s3://ml-datasets/imagenet /data/imagenet
```

### Shared Storage Workflow

```bash
# Create shared volume
podstack volume create --name team-data --quota 500

# Create multiple pods with shared storage
podstack pod create --name worker-1 --volume team-data:/shared
podstack pod create --name worker-2 --volume team-data:/shared

# Both pods can now read/write to /shared
```

### Backup and Restore

```bash
# Backup pod data to bucket
podstack bucket create backups
podstack pod exec my-pod -- tar czf /tmp/backup.tar.gz /workspace
podstack pod cp my-pod:/tmp/backup.tar.gz ./backup.tar.gz
podstack bucket upload backups ./backup.tar.gz backups/$(date +%Y%m%d).tar.gz

# Restore
podstack bucket download backups backups/20240115.tar.gz ./restore.tar.gz
podstack pod cp ./restore.tar.gz new-pod:/tmp/
podstack pod exec new-pod -- tar xzf /tmp/restore.tar.gz -C /
```

## Next Steps

- [Pods](/docs/cli/pods/) - Pod commands
- [Virtual Machines](/docs/cli/virtual-machines/) - VM commands
- [Configuration](/docs/cli/configuration/) - CLI settings

---
title: Storage
description: "Manage cloud storage with Podstack Python SDK. Work with S3-compatible buckets and NFS volumes programmatically."
keywords:
  - SDK storage
  - Python cloud storage
  - S3 compatible SDK
  - NFS volumes API
---

# Storage

Manage object storage (buckets) and NFS volumes using the Podstack SDK.

## Object Storage (Buckets)

### Create Bucket

```python
from podstack import Client

client = Client()

bucket = client.buckets.create(
    name="my-datasets",
    visibility="private"  # or "public"
)

print(f"Bucket: {bucket.name}")
print(f"Endpoint: {bucket.endpoint}")
```

### List Buckets

```python
buckets = client.buckets.list()

for bucket in buckets:
    print(f"{bucket.name}: {bucket.visibility} ({bucket.size_gb:.2f} GB)")
```

### Get Bucket Details

```python
bucket = client.buckets.get("bucket-id")

print(f"Name: {bucket.name}")
print(f"Visibility: {bucket.visibility}")
print(f"Size: {bucket.size_gb} GB")
print(f"Object Count: {bucket.object_count}")
print(f"Endpoint: {bucket.endpoint}")
```

### Upload Files

```python
# Upload single file
client.buckets.upload(
    bucket_id="bucket-id",
    local_path="./data.csv",
    remote_key="datasets/data.csv"
)

# Upload with progress
def progress(transferred, total):
    pct = (transferred / total) * 100
    print(f"Uploading: {pct:.1f}%")

client.buckets.upload(
    bucket_id="bucket-id",
    local_path="./large_model.pt",
    remote_key="models/model.pt",
    progress=progress
)

# Upload directory
client.buckets.upload(
    bucket_id="bucket-id",
    local_path="./training_data/",
    remote_key="data/",
    recursive=True
)
```

### Download Files

```python
# Download single file
client.buckets.download(
    bucket_id="bucket-id",
    remote_key="models/model.pt",
    local_path="./model.pt"
)

# Download directory
client.buckets.download(
    bucket_id="bucket-id",
    remote_key="results/",
    local_path="./results/",
    recursive=True
)
```

### List Objects

```python
# List all objects
objects = client.buckets.list_objects("bucket-id")

for obj in objects:
    print(f"{obj.key}: {obj.size_bytes} bytes")

# List with prefix
objects = client.buckets.list_objects(
    bucket_id="bucket-id",
    prefix="datasets/"
)

# Paginated listing
objects = client.buckets.list_objects(
    bucket_id="bucket-id",
    max_keys=100,
    continuation_token=None
)
```

### Delete Objects

```python
# Delete single object
client.buckets.delete_object("bucket-id", "path/to/file.txt")

# Delete multiple objects
client.buckets.delete_objects("bucket-id", [
    "file1.txt",
    "file2.txt",
    "folder/file3.txt"
])
```

### Generate Presigned URLs

```python
# Upload URL (for external uploads)
upload_url = client.buckets.presigned_upload_url(
    bucket_id="bucket-id",
    key="uploads/user-file.txt",
    expires_in=3600  # 1 hour
)

# Download URL (for external downloads)
download_url = client.buckets.presigned_download_url(
    bucket_id="bucket-id",
    key="datasets/data.csv",
    expires_in=86400  # 24 hours
)
```

### S3 Compatible Access

```python
# Get S3 credentials
creds = client.buckets.get_credentials("bucket-id")

print(f"Access Key: {creds.access_key}")
print(f"Secret Key: {creds.secret_key}")
print(f"Endpoint: {creds.endpoint}")
print(f"Region: {creds.region}")

# Use with boto3
import boto3

s3 = boto3.client(
    's3',
    endpoint_url=creds.endpoint,
    aws_access_key_id=creds.access_key,
    aws_secret_access_key=creds.secret_key
)

s3.upload_file("local.txt", bucket.name, "remote.txt")
```

### Delete Bucket

```python
# Delete empty bucket
client.buckets.delete("bucket-id")

# Force delete (removes all objects first)
client.buckets.delete("bucket-id", force=True)
```

## NFS Volumes

### Create Volume

```python
volume = client.volumes.create(
    name="shared-data",
    quota_gb=100,
    project_id="project-id"
)

print(f"Volume ID: {volume.id}")
print(f"NFS Path: {volume.nfs_path}")
print(f"Server: {volume.nfs_server}")
```

### List Volumes

```python
volumes = client.volumes.list()

for vol in volumes:
    print(f"{vol.name}: {vol.used_gb:.1f}/{vol.quota_gb} GB")
```

### Get Volume Details

```python
volume = client.volumes.get("volume-id")

print(f"Name: {volume.name}")
print(f"Quota: {volume.quota_gb} GB")
print(f"Used: {volume.used_gb} GB")
print(f"NFS Server: {volume.nfs_server}")
print(f"NFS Path: {volume.nfs_path}")
print(f"Mount Command: mount -t nfs {volume.nfs_server}:{volume.nfs_path} /mnt/data")
```

### Resize Volume

```python
# Increase quota (can only increase, not decrease)
client.volumes.resize("volume-id", quota_gb=200)
```

### Mount in Pod

```python
# Create pod with volume mount
pod = client.pods.create(
    name="training-pod",
    image="pytorch/pytorch:latest",
    gpu_type="A100",
    volumes=[
        {
            "volume_id": "volume-id",
            "mount_path": "/data"
        }
    ]
)
```

### Delete Volume

```python
# Delete empty volume
client.volumes.delete("volume-id")

# Force delete (removes all data)
client.volumes.delete("volume-id", force=True)
```

## Storage Best Practices

### Large File Uploads

```python
# Use multipart upload for files > 100MB
client.buckets.upload(
    bucket_id="bucket-id",
    local_path="./large_dataset.tar.gz",
    remote_key="datasets/large_dataset.tar.gz",
    multipart=True,
    part_size_mb=100  # 100MB parts
)
```

### Sync Directories

```python
# Sync local to bucket (upload new/changed files)
client.buckets.sync(
    bucket_id="bucket-id",
    local_path="./data/",
    remote_prefix="data/",
    direction="upload"
)

# Sync bucket to local
client.buckets.sync(
    bucket_id="bucket-id",
    local_path="./data/",
    remote_prefix="data/",
    direction="download"
)
```

### Copy Between Buckets

```python
client.buckets.copy(
    source_bucket="bucket-1",
    source_key="data.csv",
    dest_bucket="bucket-2",
    dest_key="backup/data.csv"
)
```

## Next Steps

- [Pods](/docs/sdk/pods/) - Container management
- [Virtual Machines](/docs/sdk/virtual-machines/) - VM operations
- [Error Handling](/docs/sdk/error-handling/) - Handle exceptions

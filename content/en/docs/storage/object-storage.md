---
title: Object Storage
---

# Object Storage

Podstack provides S3-compatible object storage for storing files, datasets, model artifacts, and more.

## Creating a Bucket

1. Navigate to **Storage > Object Storage**
2. Click **Create Bucket**
3. Configure:
   - **Name**: Unique bucket identifier (lowercase, no spaces)
   - **Description**: Optional notes about the bucket's purpose
   - **Max Size**: Maximum storage capacity (1GB - 10TB)
   - **Visibility**: Public or Private
   - **Versioning**: Enable to keep file history
4. Click **Create**

### Bucket Settings

**Visibility Options**
- **Private**: Only accessible with authentication (API keys or presigned URLs)
- **Public**: Anyone with the URL can download files (use with caution)

**Max Size (Quota)**
Set a maximum size limit for the bucket:
- Prevents unexpected storage costs
- Uploads fail when quota is reached
- Can be increased later if needed

**Versioning**
When enabled, uploading a file with the same name creates a new version rather than overwriting:
- View version history for any file
- Restore previous versions
- Useful for backups and audit trails
- Increases storage usage (all versions count)

## Managing Files

### Uploading Files

**Via Web UI**
1. Open your bucket
2. Click **Upload**
3. Select files or drag and drop
4. Monitor upload progress
5. Files appear in the bucket listing

**Via S3 API**
Use any S3-compatible client:

```python
import boto3

s3 = boto3.client('s3',
    endpoint_url='https://s3.podstack.ai',
    aws_access_key_id='your_access_key',
    aws_secret_access_key='your_secret_key'
)

s3.upload_file('local_file.txt', 'my-bucket', 'remote_file.txt')
```

### Downloading Files

**Via Web UI**
1. Navigate to the file
2. Click the **Download** button

**Via S3 API**
```python
s3.download_file('my-bucket', 'remote_file.txt', 'local_file.txt')
```

**Via Pre-signed URL**
Generate temporary download links:
1. Select the file
2. Click **Get Link**
3. Set expiration time
4. Share the URL

### Organizing Files

Create folder structure:
1. Click **Create Folder**
2. Enter folder name
3. Upload files into folders

Navigate folders using the breadcrumb trail.

### Deleting Files

1. Select file(s) using checkboxes
2. Click **Delete**
3. Confirm the deletion

**Note**: Deleted files cannot be recovered unless versioning is enabled.

## Bucket Operations

### Editing Bucket Settings

1. Go to bucket list
2. Click the settings icon
3. Modify visibility or description
4. Save changes

### Changing Visibility

1. Open bucket settings
2. Toggle Public/Private
3. Confirm the change

**Warning**: Making a bucket public exposes all files to anyone with the URL.

### Deleting a Bucket

**Standard Deletion:**
1. Delete all files in the bucket first
2. Click **Delete Bucket**
3. Confirm deletion

**Force Delete:**
To delete a bucket with all its contents:
1. Click **Delete Bucket**
2. Enable the **Force Delete** option
3. Confirm by typing the bucket name
4. All objects are permanently deleted with the bucket

**Warning**: Force delete is irreversible. All data will be permanently lost.

## Public Bucket Access

Public buckets can be accessed via URL:
```
https://s3.podstack.ai/public/{bucket-name}/{file-path}
```

Use public buckets for:
- Sharing datasets publicly
- Hosting static assets
- Public model distribution

## Pre-signed URLs

Generate temporary URLs for private files:

### Download URL
```python
url = s3.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'file.txt'},
    ExpiresIn=3600  # 1 hour
)
```

### Upload URL
```python
url = s3.generate_presigned_url(
    'put_object',
    Params={'Bucket': 'my-bucket', 'Key': 'upload.txt'},
    ExpiresIn=3600
)
```

## Large File Uploads

For files larger than 100MB, use multipart upload:

### Via Web UI
The upload manager automatically handles chunking for large files with:
- Progress tracking
- Resume capability
- Background uploading

### Via API
```python
from boto3.s3.transfer import TransferConfig

config = TransferConfig(
    multipart_threshold=100 * 1024 * 1024,  # 100MB
    multipart_chunksize=100 * 1024 * 1024
)

s3.upload_file('large_file.tar', 'my-bucket', 'large_file.tar', Config=config)
```

## Using Object Storage with Pods

### From Container

Install AWS CLI or boto3:
```bash
pip install awscli boto3
```

Configure credentials:
```bash
aws configure
# Enter your access key and secret
```

Download data:
```bash
aws s3 cp s3://my-bucket/data.tar.gz /data/ --endpoint-url https://s3.podstack.ai
```

### Mount as Filesystem

Use s3fs for filesystem-like access:
```bash
sudo apt install s3fs

echo "ACCESS_KEY:SECRET_KEY" > ~/.passwd-s3fs
chmod 600 ~/.passwd-s3fs

s3fs my-bucket /mnt/s3 -o passwd_file=~/.passwd-s3fs -o url=https://s3.podstack.ai
```

## Billing

Object storage is billed based on:
- **Storage**: Amount of data stored (per GB/hour)
- **Transfer**: Data downloaded (egress)

View costs in your wallet expenditure breakdown.

## Best Practices

1. **Use meaningful names** - Organize files with clear naming
2. **Enable versioning** - For important data that changes
3. **Set appropriate visibility** - Keep sensitive data private
4. **Clean up unused data** - Delete files you no longer need
5. **Use pre-signed URLs** - For temporary access without making public

## Next Steps

Learn about [NFS Volumes](/docs/storage/nfs-volumes/) for mountable persistent storage.

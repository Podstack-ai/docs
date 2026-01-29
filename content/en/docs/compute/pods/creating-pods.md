---
title: Creating Pods
---

# Creating Pods

This guide walks through creating a new pod on Podstack with all available configuration options.

## Quick Create

1. Navigate to **Compute > Pods**
2. Click **Create Pod**
3. Fill in the required fields (name, image, resources)
4. Click **Create**

## Configuration Options

### Basic Information

**Pod Name**
A descriptive name for your pod. Must be unique within the project.

**Project**
Select the project this pod belongs to. Resources are billed to the project owner.

**Container Image**
The Docker image to run. Examples:
- `pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime`
- `tensorflow/tensorflow:latest-gpu`
- `nvidia/cuda:12.0-base`
- `jupyter/scipy-notebook`

**Private Registry** (optional)
For private images, provide:
- Registry URL
- Username
- Password/Token

### Resource Allocation

**GPU Configuration**
- **GPU Type**: Select from available types (A100, H100, V100, etc.)
- **GPU Count**: Number of GPUs (0 for CPU-only)

**CPU and Memory**
- **CPU Cores**: 1-128 cores (fractional values supported, e.g., 0.5)
- **Memory**: RAM in GB

**Storage**
- **Disk Size**: Ephemeral storage for the container

### Networking

**Exposed Ports**
Configure ports to expose for external access:
- **Container Port**: Port inside the container
- **Protocol**: TCP or UDP
- **Public**: Whether to expose externally

Common ports:
| Service | Port |
|---------|------|
| SSH | 22 |
| Jupyter | 8888 |
| HTTP | 80/8080 |
| TensorBoard | 6006 |

### Access Configuration

**SSH Key**
Select an SSH key for terminal access. Keys can be managed in [SSH Keys](/docs/account/ssh-keys/).

**Notebook Access** (optional)
Enable Jupyter notebook with:
- Username
- Password

### Environment Variables

Add environment variables as key-value pairs:
```
CUDA_VISIBLE_DEVICES=0,1
MODEL_PATH=/data/models
```

### Init Command (optional)

Command to run when the container starts:
```bash
pip install -r requirements.txt && python train.py
```

### Volume Mounts

Mount persistent storage:
- **NFS Volumes**: Select from your existing volumes
- **Mount Path**: Where to mount inside the container (e.g., `/data`)

## Cost Estimation

Before creating, review the estimated cost showing:
- Hourly rate breakdown (GPU, CPU, memory, storage)
- Total hourly cost

Ensure your wallet has sufficient balance.

## Creating from Template

To use a saved configuration:

1. Go to **Templates**
2. Find your template
3. Click **Deploy**
4. Modify any settings if needed
5. Click **Create**

## After Creation

Once created, the pod will:
1. Pull the container image
2. Allocate resources
3. Start the container
4. Transition to **Running** status

This typically takes 30 seconds to a few minutes depending on image size.

## Troubleshooting

**Pod stuck in Pending**
- Check if requested GPU type is available
- Verify wallet has sufficient balance
- Review resource limits

**Image pull failed**
- Verify image name and tag
- Check private registry credentials
- Ensure image exists and is accessible

## Next Steps

Once your pod is running, learn how to [connect to it](/docs/compute/pods/connecting-to-pods/).

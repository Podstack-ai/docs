---
title: Pods
description: "Manage GPU containers with Podstack Python SDK. Create, start, stop, and monitor pods programmatically."
keywords:
  - SDK pods
  - Python GPU containers
  - programmatic pod management
  - container API
---

# Pods

Manage GPU containers (pods) using the Podstack SDK.

## Create a Pod

### Basic Creation

```python
from podstack import Client

client = Client()

pod = client.pods.create(
    name="my-pod",
    image="pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime",
    gpu_type="A100",
    gpu_count=1
)

print(f"Pod ID: {pod.id}")
print(f"Status: {pod.status}")
```

### Full Configuration

```python
pod = client.pods.create(
    name="training-pod",
    project_id="project-id",  # Optional: specific project
    image="pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime",

    # GPU configuration
    gpu_type="A100",
    gpu_count=2,

    # Compute resources
    cpu=8,
    memory=64,  # GB
    disk=200,   # GB

    # Networking
    ports=[8888, 6006],  # Expose Jupyter and TensorBoard

    # Environment
    env={
        "WANDB_API_KEY": "your-key",
        "HF_TOKEN": "your-token"
    },

    # Startup command
    command="jupyter lab --ip=0.0.0.0 --allow-root",

    # Volume mounts
    volumes=[
        {"volume_id": "vol-123", "mount_path": "/data"}
    ],

    # Labels for organization
    labels={
        "team": "ml",
        "experiment": "gpt-fine-tune"
    }
)
```

## List Pods

```python
# All pods
pods = client.pods.list()

# Filter by project
pods = client.pods.list(project_id="project-id")

# Filter by status
pods = client.pods.list(status="running")

# Filter by labels
pods = client.pods.list(labels={"team": "ml"})

# Iterate
for pod in pods:
    print(f"{pod.name}: {pod.status} ({pod.gpu_type} x{pod.gpu_count})")
```

## Get Pod Details

```python
pod = client.pods.get("pod-id")

print(f"Name: {pod.name}")
print(f"Status: {pod.status}")
print(f"GPU: {pod.gpu_type} x {pod.gpu_count}")
print(f"CPU: {pod.cpu} cores")
print(f"Memory: {pod.memory} GB")
print(f"Created: {pod.created_at}")
print(f"SSH Command: {pod.ssh_command}")
print(f"Jupyter URL: {pod.jupyter_url}")
```

## Pod Lifecycle

### Start Pod

```python
client.pods.start("pod-id")

# Wait for running
pod = client.pods.wait_until_running("pod-id", timeout=300)
```

### Stop Pod

```python
# Graceful stop
client.pods.stop("pod-id")

# Force stop
client.pods.stop("pod-id", force=True)
```

### Restart Pod

```python
client.pods.restart("pod-id")
```

### Delete Pod

```python
# Delete stopped pod
client.pods.delete("pod-id")

# Force delete running pod
client.pods.delete("pod-id", force=True)
```

## Execute Commands

### Run Command

```python
result = client.pods.exec("pod-id", "nvidia-smi")

print(f"Exit code: {result.exit_code}")
print(f"Output: {result.output}")
print(f"Error: {result.error}")
```

### Long-Running Commands

```python
# With timeout (seconds)
result = client.pods.exec(
    "pod-id",
    "python train.py",
    timeout=3600  # 1 hour
)

# Async execution
task = client.pods.exec_async("pod-id", "python train.py")
print(f"Task ID: {task.id}")

# Check status later
status = client.tasks.get(task.id)
print(f"Status: {status.state}")
```

### Interactive Shell

```python
# Get SSH connection details
pod = client.pods.get("pod-id")
print(f"SSH: {pod.ssh_command}")

# Or use built-in SSH
client.pods.ssh("pod-id")  # Opens interactive shell
```

## File Transfer

### Upload Files

```python
# Single file
client.pods.upload("pod-id", "./model.py", "/workspace/model.py")

# Directory
client.pods.upload(
    "pod-id",
    "./training_data/",
    "/workspace/data/",
    recursive=True
)

# With progress callback
def progress(transferred, total):
    print(f"Progress: {transferred}/{total} bytes")

client.pods.upload("pod-id", "./large_file.tar", "/workspace/", progress=progress)
```

### Download Files

```python
# Single file
client.pods.download("pod-id", "/workspace/model.pt", "./model.pt")

# Directory
client.pods.download(
    "pod-id",
    "/workspace/results/",
    "./results/",
    recursive=True
)
```

## Logs

```python
# Get recent logs
logs = client.pods.logs("pod-id")
print(logs)

# Tail logs
logs = client.pods.logs("pod-id", tail=100)

# Stream logs
for line in client.pods.logs_stream("pod-id"):
    print(line)
```

## Metrics

```python
metrics = client.pods.metrics("pod-id")

print(f"GPU Utilization: {metrics.gpu_utilization}%")
print(f"GPU Memory: {metrics.gpu_memory_used}/{metrics.gpu_memory_total} GB")
print(f"CPU Usage: {metrics.cpu_usage}%")
print(f"Memory Usage: {metrics.memory_used}/{metrics.memory_total} GB")
```

## Pod Templates

### Save as Template

```python
template = client.pods.save_template(
    pod_id="pod-id",
    name="pytorch-a100-template",
    description="PyTorch training environment with A100"
)
```

### Create from Template

```python
pod = client.pods.create_from_template(
    template_id="template-id",
    name="new-pod-from-template"
)
```

## Batch Operations

```python
# Stop all pods in project
pods = client.pods.list(project_id="project-id", status="running")
for pod in pods:
    client.pods.stop(pod.id)

# Delete all stopped pods
pods = client.pods.list(status="stopped")
for pod in pods:
    client.pods.delete(pod.id)
```

## Events

```python
# Get pod events
events = client.pods.events("pod-id")

for event in events:
    print(f"{event.timestamp}: {event.type} - {event.message}")
```

## Next Steps

- [Virtual Machines](/docs/sdk/virtual-machines/) - VM management
- [Storage](/docs/sdk/storage/) - Buckets and volumes
- [Error Handling](/docs/sdk/error-handling/) - Handle exceptions

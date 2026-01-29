---
title: Templates
---

# Launch Templates

Templates allow you to save pod configurations for quick, repeatable deployments. Create a template once and deploy identical pods with a single click.

## Why Use Templates?

- **Consistency**: Deploy identical configurations every time
- **Speed**: Skip configuration steps for common setups
- **Sharing**: Team members can use the same configurations
- **Best Practices**: Codify optimal settings

## Creating a Template

### From Scratch

1. Navigate to **Templates**
2. Click **Create Template**
3. Configure the template:

**Basic Information**
- **Name**: Descriptive template name
- **Description**: What this template is for
- **Tags**: Optional labels for organization

**Container Settings**
- **Image**: Docker image to use
- **CPU**: Number of cores
- **Memory**: RAM in GB
- **GPU Type**: GPU model
- **GPU Count**: Number of GPUs

**Environment**
- **Variables**: Key-value environment variables
- **Ports**: Ports to expose

4. Click **Save Template**

### From Existing Pod

Create a template based on a running pod:

1. Go to **Pods**
2. Find the pod to template
3. Click **Save as Template**
4. Edit the configuration if needed
5. Save the template

## Using Templates

### Deploy from Template

1. Go to **Templates**
2. Find the desired template
3. Click **Deploy**
4. Review/modify settings:
   - Pod name (required)
   - Project selection
   - Any overrides needed
5. Click **Create Pod**

### Quick Deploy

For templates with complete configurations:
- Click **Quick Deploy**
- Enter only the pod name
- Pod created with all template defaults

## Managing Templates

### Viewing Templates

The template list shows:
- Template name and description
- Resource configuration (GPU, CPU, memory)
- Tags
- Creation date

### Editing Templates

1. Find the template
2. Click **Edit**
3. Modify settings
4. Save changes

Changes don't affect pods already deployed from the template.

### Deleting Templates

1. Find the template
2. Click **Delete**
3. Confirm deletion

Deleting a template doesn't affect pods created from it.

## Template Settings

### Container Image

Specify the full image name:
```
pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime
nvidia/cuda:12.0-base
your-registry/your-image:tag
```

### Resource Allocation

Configure compute resources:
- **CPU**: 0.5 - 128 cores
- **Memory**: 1 - 1024 GB
- **GPU Type**: A100, H100, V100, etc.
- **GPU Count**: 0 - 8

### Environment Variables

Pre-configure environment:
```
CUDA_VISIBLE_DEVICES=0,1
MODEL_PATH=/models
BATCH_SIZE=32
WANDB_API_KEY=your_key
```

### Port Configuration

Define exposed ports:

| Port | Protocol | Description |
|------|----------|-------------|
| 22 | TCP | SSH access |
| 8888 | TCP | Jupyter notebook |
| 6006 | TCP | TensorBoard |
| 8080 | TCP | Web server |

### Tags

Add tags for organization:
- `training`
- `inference`
- `development`
- `production`

Filter templates by tag in the list view.

## Template Examples

### PyTorch Training

```yaml
Name: PyTorch Training
Image: pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime
CPU: 8
Memory: 32 GB
GPU: A100
GPU Count: 1
Ports: 22, 8888, 6006
Variables:
  - CUDA_VISIBLE_DEVICES: 0
  - NCCL_DEBUG: INFO
```

### TensorFlow Inference

```yaml
Name: TensorFlow Serving
Image: tensorflow/serving:latest-gpu
CPU: 4
Memory: 16 GB
GPU: T4
GPU Count: 1
Ports: 8500, 8501
Variables:
  - MODEL_NAME: my_model
```

### Development Environment

```yaml
Name: Dev Environment
Image: jupyter/scipy-notebook
CPU: 4
Memory: 16 GB
GPU: None
Ports: 8888
Variables:
  - JUPYTER_ENABLE_LAB: yes
```

## Best Practices

### Naming Conventions

Use clear, descriptive names:
- `bert-training-a100`
- `inference-server-t4`
- `data-processing-cpu`

### Version Tags

Include version in template name:
- `pytorch-training-v2`
- `production-inference-2024-01`

### Documentation

Use descriptions to document:
- Purpose of the template
- Required volumes or data
- Expected usage patterns

### Regular Review

Periodically review templates:
- Remove outdated templates
- Update image versions
- Optimize resource allocations

## Project Scope

Templates are scoped to projects:
- Only visible to project members
- Create project-specific templates
- Share by granting project access

## Next Steps

- [Deploy pods](/docs/compute/pods/) using templates
- Learn about [Serverless GPU](/docs/advanced/serverless-gpu/) for quick notebooks

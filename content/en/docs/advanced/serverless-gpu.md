---
title: Serverless GPU
---

# Serverless GPU

Serverless GPU provides instant Jupyter notebook environments with GPU access. Start coding immediately without configuring pods or infrastructure.

## What is Serverless GPU?

Serverless GPU is a managed JupyterHub environment that:
- Starts in seconds
- Pre-configured with ML libraries
- Automatic resource management
- Pay only for active time
- No infrastructure to manage

## Getting Started

### Create a Notebook

1. Navigate to **Serverless GPU**
2. Click **Create Notebook**
3. Configure:
   - **Name**: Notebook identifier
   - **GPU Type**: Select available GPU
4. Click **Create**

### Access Your Notebook

1. Wait for status to show **Running**
2. Click the notebook link
3. JupyterLab opens in a new tab
4. Start coding!

## Notebook Features

### Pre-installed Libraries

Common ML libraries ready to use:
- PyTorch
- TensorFlow
- Transformers
- NumPy, Pandas, Scikit-learn
- Matplotlib, Seaborn
- Jupyter extensions

### GPU Access

Verify GPU availability:
```python
import torch
print(f"GPU Available: {torch.cuda.is_available()}")
print(f"GPU Name: {torch.cuda.get_device_name(0)}")
```

### File Storage

Files persist within your notebook session:
- `/home/jovyan/` - Home directory
- Upload files via JupyterLab UI
- Download results before stopping

## Managing Notebooks

### Viewing Notebooks

The Serverless GPU page shows:
- All your notebooks
- Current status
- GPU allocation
- Running time

### Starting a Notebook

For stopped notebooks:
1. Click **Start**
2. Wait for Running status
3. Access via notebook link

### Stopping a Notebook

To pause and save costs:
1. Click **Stop**
2. Notebook enters Stopped state
3. Billing pauses

**Note**: Unsaved work in memory is lost. Save files before stopping.

### Deleting a Notebook

To permanently remove:
1. Click **Delete**
2. Confirm deletion
3. All files are removed

## Web Terminal

Access terminal directly:
1. Find your notebook
2. Click **Terminal**
3. Browser terminal opens

Use for:
- Installing packages
- Running scripts
- System commands

## Real-Time Updates

Notebook status updates automatically via WebSocket:
- Execution progress
- Resource usage
- Status changes

No need to refresh the page.

## Use Cases

### Quick Experiments

Test ideas without setup:
```python
# Instant GPU access
model = AutoModel.from_pretrained("bert-base")
model.to("cuda")
```

### Data Exploration

Analyze datasets interactively:
```python
import pandas as pd
df = pd.read_csv("data.csv")
df.describe()
```

### Prototyping

Build proof-of-concepts:
```python
# Quick model training
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

### Learning

Practice ML concepts:
- Follow tutorials
- Experiment with models
- Learn new libraries

## Installing Additional Packages

### Using pip

```python
!pip install package_name
```

### Using conda

```bash
conda install package_name
```

### Requirements File

```python
!pip install -r requirements.txt
```

Packages persist until notebook is stopped.

## Data Transfer

### Upload Files

1. Use JupyterLab file browser
2. Click upload button
3. Select files
4. Files appear in current directory

### Download Files

1. Right-click file in browser
2. Select **Download**
3. File downloads to your computer

### From Object Storage

```python
import boto3

s3 = boto3.client('s3',
    endpoint_url='https://s3.podstack.ai',
    aws_access_key_id='YOUR_KEY',
    aws_secret_access_key='YOUR_SECRET'
)

s3.download_file('bucket', 'data.csv', 'local_data.csv')
```

## Billing

Serverless GPU is billed:
- Per-second when running
- Based on GPU type
- No charge when stopped

Monitor costs:
- Check running time in notebook list
- View spending in wallet

## Limitations

Compared to full pods:
- Fixed resource configurations
- No custom Docker images
- No SSH access
- Limited persistence
- Single GPU typically

For advanced needs, use [Pods](/docs/compute/pods/).

## Best Practices

### Save Work Frequently

- Save notebooks often
- Download important results
- Use object storage for persistence

### Stop When Idle

- Stop notebooks when taking breaks
- Billing continues while running
- Data on disk is preserved

### Use for Right Workloads

**Good for:**
- Experimentation
- Quick tasks
- Learning
- Prototyping

**Better with Pods:**
- Long training jobs
- Production workloads
- Custom environments
- Multi-GPU needs

## Next Steps

- Learn about [AI Studio](/docs/advanced/ai-studio/) for model management
- Use [Pods](/docs/compute/pods/) for more control

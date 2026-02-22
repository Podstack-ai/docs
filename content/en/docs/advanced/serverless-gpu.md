---
title: Serverless GPU
---

# Serverless GPU

Serverless GPU provides instant notebook environments with GPU access. Start coding immediately without configuring pods or infrastructure. Includes reactive notebooks with DAG-based execution, checkpoints, and cost tracking.

## What is Serverless GPU?

Serverless GPU is a managed notebook environment that:
- Starts in seconds
- Pre-configured with ML libraries
- Automatic resource management
- Pay only for active time
- No infrastructure to manage
- Reactive cell execution with dependency tracking

## Getting Started

### Create a Notebook

1. Navigate to **Serverless GPU**
2. Click **Create Notebook**
3. Configure:
   - **Name**: Notebook identifier
   - **GPU Type**: Select from available GPUs (view pricing per type)
   - **Provider**: Select compute provider
   - **Idle Shutdown**: Auto-stop after inactivity (optional)
4. Click **Create**

### GPU Selection

Browse available GPU types with pricing:
- View hourly rates per GPU type
- Check real-time availability
- Compare GPU specifications
- Estimate costs before creating

### Idle Shutdown Configuration

Configure automatic shutdown to save costs:

**Idle Timeout Options**
- **Never**: Notebook runs until manually stopped
- **30 minutes**: Stops after 30 minutes of inactivity
- **1 hour**: Stops after 1 hour of inactivity
- **2 hours**: Stops after 2 hours of inactivity
- **4 hours**: Stops after 4 hours of inactivity

**What Counts as Activity**
- Executing code cells
- Interacting with the notebook interface
- Terminal activity
- File operations

**Before Auto-Shutdown**
- Warning notification displayed
- Chance to cancel the shutdown
- Save all work before timeout

### Access Your Notebook

1. Wait for status to show **Running**
2. Click the notebook link
3. The notebook editor opens
4. Start coding!

## Notebook Editor

### Cell Types

The notebook supports multiple cell types:
- **Code Cells**: Execute Python code with GPU access
- **Markdown Cells**: Add formatted documentation
- **Rich Text Cells**: Formatted text with editing toolbar

### Cell Operations

- **Add Cell**: Insert code, markdown, or rich text cells
- **Delete Cell**: Remove a cell and its output
- **Reorder Cells**: Drag and drop to rearrange
- **Execute Cell**: Run individual cells or all cells
- **Clear Output**: Clear a cell's output or all outputs
- **Cancel Execution**: Stop a running cell

### Code Execution

```python
# Cells execute on the remote GPU
import torch
print(f"GPU: {torch.cuda.get_device_name(0)}")

# Full ML workflow support
model = AutoModel.from_pretrained("bert-base")
model.to("cuda")
```

### Cell Output

Cells display rich output:
- Text output and print statements
- Tables and DataFrames
- Matplotlib/Seaborn plots
- Images and visualizations
- Error tracebacks with formatting

## Reactive Execution (DAG)

Notebooks support reactive execution based on cell dependencies.

### How It Works

Podstack automatically tracks variable dependencies between cells. When you modify a cell, all dependent cells are marked as "dirty" and can be re-executed automatically.

### DAG View

Visualize cell dependencies:
1. Click the **DAG** tab in the notebook
2. See a directed acyclic graph showing which cells depend on which
3. Identify execution order and dependency chains

### Dirty Cell Detection

When you edit a cell:
- Downstream cells that depend on its variables are marked as dirty
- Click **Execute Dirty Cells** to re-run only affected cells
- Saves time by skipping cells that don't need re-execution

### Cell Analysis

Analyze individual cells or the entire notebook:
- View which variables a cell reads and writes
- See upstream and downstream dependencies
- Identify potential circular dependencies

## Checkpoints (Time-Travel)

Save and restore notebook state at any point.

### Creating Checkpoints

1. Click **Create Checkpoint** in the notebook toolbar
2. Enter a descriptive name
3. The current state of all cells, outputs, and variables is saved

### Restoring Checkpoints

1. Open the **Checkpoints** panel
2. Browse saved checkpoints by name and timestamp
3. Click **Restore** to return to that state
4. All cells and outputs revert to the checkpoint state

### Managing Checkpoints

- View all checkpoints with timestamps
- Delete old checkpoints to save space
- Compare checkpoint states

## Timeline

View the execution history of your notebook:
- Chronological list of all cell executions
- Execution timestamps and durations
- Success/failure status for each execution
- Navigate back to specific points in history

## Variable Inspector

Track variables across your notebook:
- View all defined variables and their current values
- See variable types and sizes
- Track which cells define and use each variable
- Identify stale variables from cleared cells

## Cost Tracking

Monitor notebook costs in real-time:

### Cost Breakdown

1. Click the **Cost** tab in the notebook
2. View costs broken down by:
   - GPU time
   - Compute time per cell
   - Total session cost
3. Track spending trends over time

### Per-Cell Costs

Each cell execution shows its compute cost, helping you identify expensive operations and optimize your workflow.

## Volume Mounts

Attach persistent storage to your notebook:

### Adding Volumes

1. Go to notebook settings
2. Click **Add Volume**
3. Select from your existing NFS volumes
4. Specify the mount path
5. Volume is available in the notebook filesystem

### Removing Volumes

1. Go to notebook settings
2. Click the remove icon on the volume
3. Volume is detached (data is preserved)

## Dataset Integration

Attach datasets directly to your notebook:

### Attaching Datasets

1. Go to notebook settings
2. Click **Attach Dataset**
3. Browse available datasets from your project
4. Dataset is mounted and accessible in your notebook

### Using Datasets

```python
import pandas as pd
# Datasets are mounted at the configured path
df = pd.read_csv("/data/my-dataset/train.csv")
```

## Import and Export

### Import Notebooks

Import existing notebooks:
- **From .ipynb**: Upload Jupyter notebook files
- **From URL**: Import from a public URL

### Export Notebooks

Export your work in multiple formats:
- **.ipynb**: Standard Jupyter format
- **PDF**: For sharing and documentation
- **HTML**: For web viewing

## Replay

Replay your notebook execution:
1. Click **Replay** in the toolbar
2. Watch cells execute in order
3. View outputs as they were generated
4. Useful for demos and debugging

## Managing Notebooks

### Viewing Notebooks

The Serverless GPU page shows:
- All your notebooks
- Current status
- GPU allocation
- Running time
- Cost to date

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

**Note**: Unsaved work in memory is lost. Create a checkpoint or save files before stopping.

### Deleting a Notebook

To permanently remove:
1. Click **Delete**
2. Confirm deletion
3. All files, cells, and checkpoints are removed

## Notebook Lifecycle

### Status States

| Status | Description |
|--------|-------------|
| Creating | Notebook being provisioned |
| Starting | GPU being allocated and notebook starting |
| Running | Active and ready to use |
| Stopping | Shutting down |
| Stopped | Inactive, can be restarted |
| Failed | Error occurred, check logs |

### Real-Time Updates

Notebook status updates automatically via WebSocket:
- Execution progress
- Resource usage
- Status changes
- Cell output streaming

No need to refresh the page.

## Pre-installed Libraries

Common ML libraries ready to use:
- PyTorch
- TensorFlow
- Transformers
- NumPy, Pandas, Scikit-learn
- Matplotlib, Seaborn
- Jupyter extensions

### Installing Additional Packages

From a code cell:
```python
!pip install package_name
```

Or use the built-in terminal.

Packages persist within the session until the notebook is stopped.

## Web Terminal

Access terminal directly:
1. Find your notebook
2. Click **Terminal**
3. Browser terminal opens

Use for:
- Installing packages
- Running scripts
- System commands
- File operations

## GPU Access

Verify GPU availability:
```python
import torch
print(f"GPU Available: {torch.cuda.is_available()}")
print(f"GPU Name: {torch.cuda.get_device_name(0)}")
print(f"GPU Memory: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
```

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

Build proof-of-concepts with reactive execution - modify a cell and all dependent cells update automatically.

### Learning

Practice ML concepts with instant GPU access and pre-installed libraries.

## Billing

Serverless GPU is billed:
- Per-second when running
- Based on GPU type
- No charge when stopped
- View real-time cost breakdown in the notebook

Monitor costs:
- Check the cost breakdown tab in the notebook
- View running time in notebook list
- View spending in wallet

## Limitations

Compared to full pods:
- Fixed GPU configurations per provider
- No custom Docker images
- No direct SSH access (use web terminal)
- Single GPU typically

For advanced needs, use [Pods](/docs/compute/pods/).

## Best Practices

### Save Work Frequently

- Create checkpoints before major changes
- Export notebooks in .ipynb format for backup
- Attach NFS volumes for persistent data

### Use Reactive Execution

- Let the DAG track dependencies automatically
- Use "Execute Dirty Cells" instead of re-running everything
- Keep cells focused on single operations for better reactivity

### Cost Management

- Monitor the cost breakdown tab
- Stop notebooks when taking breaks
- Use idle shutdown to prevent runaway costs
- Choose the right GPU for your workload

### Use for Right Workloads

**Good for:**
- Experimentation
- Quick tasks
- Learning
- Prototyping
- Data exploration

**Better with Pods:**
- Long training jobs
- Production workloads
- Custom environments
- Multi-GPU needs

## Next Steps

- Learn about [AI Studio](/docs/advanced/ai-studio/) for model management
- Use [Pods](/docs/compute/pods/) for more control
- Explore [MLOps](/docs/mlops/) for experiment tracking

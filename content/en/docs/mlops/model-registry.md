---
title: Model Registry
---

# Model Registry

The Model Registry provides a central repository for managing, versioning, and deploying your trained machine learning models.

## What is the Model Registry?

The Model Registry helps you:
- Store and version trained models
- Track model lineage (which experiment produced it)
- Manage model lifecycle stages
- Deploy models to production
- Collaborate on model development

## Registering a Model

### Via Web UI

1. Navigate to **MLOps > Model Registry**
2. Click **Register Model**
3. Configure:
   - **Name**: Model identifier (e.g., `sentiment-classifier`)
   - **Description**: What the model does
   - **Tags**: Labels for organization
4. Click **Register**

### From an Experiment Run

Register a model directly from a successful run:

1. Go to the run details page
2. Find the model artifact
3. Click **Register to Model Registry**
4. Enter model name and version details
5. Click **Register**

### Via SDK

```python
from podstack import MLOpsClient

client = MLOpsClient(api_token="your_token")

# Register a new model
model = client.register_model(
    name="sentiment-classifier",
    description="BERT-based sentiment analysis model",
    tags=["nlp", "sentiment", "production-ready"]
)

# Create a version from a run artifact
version = client.create_model_version(
    model_name="sentiment-classifier",
    source_run_id="run-abc123",
    artifact_path="model.pt",
    description="Fine-tuned on customer reviews dataset"
)
```

## Model Versions

Each model can have multiple versions:

### Creating Versions

```python
version = client.create_model_version(
    model_name="sentiment-classifier",
    source_run_id="run-xyz789",
    artifact_path="checkpoints/best_model.pt",
    description="Improved accuracy with data augmentation"
)
```

### Version Information

Each version tracks:
- **Version Number**: Auto-incremented (v1, v2, v3...)
- **Source Run**: Which experiment run produced it
- **Artifacts**: Model files and associated data
- **Metrics**: Performance metrics from training
- **Stage**: Current lifecycle stage
- **Description**: Notes about this version

## Model Stages

Models progress through lifecycle stages:

| Stage | Description |
|-------|-------------|
| **None** | Newly registered, not staged |
| **Staging** | Being tested/validated |
| **Production** | Approved for production use |
| **Archived** | Deprecated, kept for reference |

### Transitioning Stages

```python
# Move to staging for testing
client.transition_model_version_stage(
    model_name="sentiment-classifier",
    version=3,
    stage="Staging"
)

# Promote to production after validation
client.transition_model_version_stage(
    model_name="sentiment-classifier",
    version=3,
    stage="Production"
)
```

### Via Web UI

1. Go to model version details
2. Click **Change Stage**
3. Select new stage
4. Add transition note (optional)
5. Confirm

## Viewing Models

### Model List

Navigate to **MLOps > Model Registry** to see:
- All registered models
- Latest version for each model
- Production version (if any)
- Tags and descriptions

### Filtering Models

- **Search**: By name or description
- **Filter by Stage**: Production, Staging, etc.
- **Filter by Tags**: Custom labels

### Model Details

Click a model to view:
- All versions with their stages
- Version history and transitions
- Metrics comparison across versions
- Deployment status

## Version Details

Click a version to see:

**Overview**
- Version number and stage
- Creation date
- Source experiment and run
- Description

**Artifacts**
- Model files
- Configuration files
- Download options

**Metrics**
- Training metrics from source run
- Validation metrics
- Comparison with other versions

**Lineage**
- Parent experiment
- Training parameters
- Dataset information

## Downloading Models

### Via Web UI

1. Go to model version
2. Click **Download**
3. Select artifacts to download
4. Files download to your device

### Via SDK

```python
# Download model artifacts
client.download_model_version(
    model_name="sentiment-classifier",
    version=3,
    destination="./models/"
)
```

## Model Comparison

Compare versions side-by-side:

1. Select multiple versions (checkboxes)
2. Click **Compare**
3. View:
   - Metric differences
   - Parameter changes
   - Performance charts

## Deploying Models

Deploy models directly to AI Studio:

### From Registry

1. Go to model version (Production stage recommended)
2. Click **Deploy**
3. Configure deployment:
   - Endpoint name
   - GPU type
   - Scaling settings
4. Click **Deploy**

### Via SDK

```python
deployment = client.deploy_model(
    model_name="sentiment-classifier",
    version=3,
    endpoint_name="sentiment-api",
    gpu_type="T4",
    min_replicas=1,
    max_replicas=3
)
```

## Model Aliases

Create named references to specific model versions for easy access:

### Setting an Alias

```python
# Set alias "latest-prod" to point to version 3
client.set_model_alias(
    model_name="sentiment-classifier",
    alias="latest-prod",
    version=3
)
```

### Using Aliases

```python
# Get model version by alias instead of version number
model = client.get_model_by_alias(
    model_name="sentiment-classifier",
    alias="latest-prod"
)
```

### Via Web UI

1. Go to model details
2. Click **Manage Aliases**
3. Add or update aliases
4. Delete aliases you no longer need

Aliases are useful for:
- Pointing deployment configs to `latest-prod` without updating version numbers
- Creating semantic references like `best-accuracy`, `fastest`, `smallest`
- Decoupling deployment from specific version numbers

## Model Lineage

Track the full lineage of each model version:

1. Go to model details
2. Click **Lineage**
3. View the complete graph showing:
   - Source experiment and run
   - Training parameters used
   - Dataset information
   - Parent model (if fine-tuned from another)
   - Downstream deployments

## Approval Workflows

For teams that require review before promoting models to production:

### How Approvals Work

1. A team member requests a stage transition (e.g., Staging → Production)
2. An approval request is created
3. Designated reviewers are notified
4. Reviewers can **Approve** or **Reject** with comments
5. On approval, the stage transition completes automatically

### Viewing Pending Approvals

Navigate to **MLOps > Approvals** to see:
- All pending approval requests
- Request details (model, version, requested stage)
- Requester information
- Review comments

### Approving or Rejecting

1. Click on a pending approval
2. Review the model version details and metrics
3. Click **Approve** or **Reject**
4. Add a comment explaining your decision

## Scheduled Training

Automate training with scheduled jobs:

### Creating a Schedule

Navigate to **MLOps > Schedules**:
1. Click **Create Schedule**
2. Configure:
   - **Name**: Schedule identifier
   - **Experiment**: Associated experiment
   - **Cron Expression**: When to run (e.g., `0 2 * * *` for daily at 2 AM)
   - **Configuration**: Training parameters
3. Click **Create**

### Managing Schedules

- **Pause**: Temporarily stop the schedule
- **Resume**: Restart a paused schedule
- **Edit**: Update the cron expression or configuration
- **Delete**: Remove the schedule
- View execution history for past runs

## Model Annotations

Add notes and metadata to versions:

```python
client.set_model_version_tag(
    model_name="sentiment-classifier",
    version=3,
    key="validated_by",
    value="ml-team"
)

client.set_model_version_tag(
    model_name="sentiment-classifier",
    version=3,
    key="validation_accuracy",
    value="0.943"
)
```

## Deleting Models

### Delete Version

1. Go to version details
2. Click **Delete Version**
3. Confirm deletion

**Note**: Cannot delete Production-stage versions. Transition to Archived first.

### Delete Model

1. Go to model details
2. Click **Delete Model**
3. Confirm (all versions deleted)

**Warning**: Deletion is permanent. Archive instead if you may need the model later.

## Best Practices

### Naming Conventions

Use clear, consistent names:
- `sentiment-classifier` - Task-based
- `bert-base-reviews-v1` - Architecture and data
- `customer-churn-predictor` - Business purpose

### When to Register

Register models when:
- Training achieves target metrics
- Model passes validation tests
- Ready for team review
- Promoting to production

### Version Management

- **Keep Production versions minimal** - Only proven models
- **Use Staging for testing** - Validate before production
- **Archive don't delete** - Maintain history
- **Document transitions** - Note why stage changed

### Linking to Experiments

Always register from experiment runs:
- Maintains full lineage
- Enables reproducibility
- Tracks exact training parameters

## Integration Example

Complete workflow from training to deployment:

```python
from podstack import MLOpsClient
import torch

client = MLOpsClient(api_token="your_token")

# 1. Track training in experiment
with client.start_run(experiment_id="sentiment-exp") as run:
    run.log_params({"lr": 0.001, "epochs": 10})

    # Train model
    model = train_model()

    run.log_metrics({"accuracy": 0.94, "f1": 0.92})

    # Save model
    torch.save(model.state_dict(), "model.pt")
    run.log_artifact("model.pt")

    run_id = run.id

# 2. Register to Model Registry
version = client.create_model_version(
    model_name="sentiment-classifier",
    source_run_id=run_id,
    artifact_path="model.pt",
    description="BERT fine-tuned on v2 dataset"
)

# 3. Promote to staging for testing
client.transition_model_version_stage(
    model_name="sentiment-classifier",
    version=version.version,
    stage="Staging"
)

# 4. After validation, promote to production
client.transition_model_version_stage(
    model_name="sentiment-classifier",
    version=version.version,
    stage="Production"
)

# 5. Deploy to AI Studio
deployment = client.deploy_model(
    model_name="sentiment-classifier",
    version=version.version,
    endpoint_name="sentiment-api"
)

print(f"Model deployed at: {deployment.endpoint_url}")
```

## Next Steps

- [AI Studio](/docs/advanced/ai-studio/) - Deploy and serve models
- [Experiment Tracking](/docs/mlops/experiment-tracking/) - Track training runs

---
title: Experiment Tracking
---

# Experiment Tracking

Track, compare, and analyze your machine learning experiments with Podstack's experiment tracking system.

## What is Experiment Tracking?

Experiment tracking helps you:
- Log parameters, metrics, and artifacts from training runs
- Compare different approaches and hyperparameters
- Reproduce successful experiments
- Collaborate with team members on ML projects

## Creating an Experiment

### Via Web UI

1. Navigate to **MLOps > Experiments**
2. Click **Create Experiment**
3. Configure:
   - **Name**: Descriptive experiment name
   - **Description**: What you're testing
   - **Tags**: Labels for organization
   - **Project**: Associated project
4. Click **Create**

### Via SDK

```python
from podstack import MLOpsClient

client = MLOpsClient(api_token="your_token")

experiment = client.create_experiment(
    name="bert-fine-tuning",
    description="Fine-tuning BERT for sentiment analysis",
    tags=["nlp", "sentiment", "bert"]
)
```

## Logging Runs

A run represents a single training execution within an experiment.

### Starting a Run

```python
with client.start_run(experiment_id=experiment.id) as run:
    # Your training code here
    pass
```

### Logging Parameters

Record hyperparameters and configuration:

```python
run.log_params({
    "learning_rate": 0.001,
    "batch_size": 32,
    "epochs": 10,
    "model_type": "bert-base-uncased",
    "optimizer": "adamw"
})
```

### Logging Metrics

Track training metrics over time:

```python
for epoch in range(epochs):
    train_loss = train_one_epoch()
    val_loss, val_accuracy = validate()

    run.log_metrics({
        "train_loss": train_loss,
        "val_loss": val_loss,
        "val_accuracy": val_accuracy
    }, step=epoch)
```

### Logging Artifacts

Save files associated with the run:

```python
# Log model checkpoint
run.log_artifact("model.pt", artifact_path="checkpoints/")

# Log configuration file
run.log_artifact("config.yaml")

# Log entire directory
run.log_artifacts("./outputs/", artifact_path="results/")
```

## Viewing Experiments

### Experiment List

Navigate to **MLOps > Experiments** to see:
- All experiments in your project
- Experiment status and run count
- Creation date and last activity
- Tags for filtering

### Filtering and Search

Find experiments quickly:
- **Search**: By name or description
- **Filter by Status**: Active, completed, archived
- **Filter by Tags**: Custom tags
- **Sort**: By date, name, or run count

## Viewing Runs

### Run List

Click an experiment to see all runs:
- Run ID and status
- Start time and duration
- Key metrics summary
- Parameter values

### Run Details

Click a run for detailed information:

**Overview**
- Run status and duration
- Start and end times
- User who started the run

**Parameters**
- All logged parameters
- Comparison with other runs

**Metrics**
- Metric values over steps/epochs
- Interactive charts
- Export data

**Artifacts**
- Uploaded files and directories
- Preview supported formats
- Download artifacts

## Comparing Runs

### Side-by-Side Comparison

1. Select multiple runs (checkboxes)
2. Click **Compare**
3. View:
   - Parameter differences
   - Metric comparisons
   - Parallel coordinates plot
   - Scatter plots

### Metric Visualization

Compare metrics across runs:
- Line charts for training curves
- Bar charts for final metrics
- Overlay multiple runs

## Run Status

| Status | Description |
|--------|-------------|
| Running | Currently executing |
| Completed | Finished successfully |
| Failed | Encountered an error |
| Killed | Manually terminated |

## Organizing Experiments

### Using Tags

Add tags for organization:
- Project phase: `exploration`, `optimization`, `final`
- Model type: `cnn`, `transformer`, `lstm`
- Dataset: `imagenet`, `custom-v2`

### Archiving Experiments

Archive old experiments:
1. Select experiment
2. Click **Archive**
3. Experiment moves to archived view

Archived experiments:
- Remain accessible but hidden by default
- Can be restored anytime
- Don't count toward active experiment limits

## Hyperparameter Sweeps

Automate hyperparameter tuning with sweeps.

### Creating a Sweep

1. Go to an experiment's detail page
2. Click **Create Sweep**
3. Configure the sweep:
   - **Search Strategy**: Grid search, random search, or Bayesian optimization
   - **Parameters**: Define parameter ranges and distributions
   - **Objective Metric**: The metric to optimize
   - **Max Trials**: Maximum number of trials to run

### Via SDK

```python
sweep = client.create_sweep(
    experiment_id="exp-123",
    strategy="bayesian",
    parameters={
        "learning_rate": {"min": 1e-5, "max": 1e-2, "distribution": "log_uniform"},
        "batch_size": {"values": [16, 32, 64]},
        "dropout": {"min": 0.1, "max": 0.5}
    },
    objective_metric="val_accuracy",
    max_trials=50
)

# Get suggested parameters for each trial
params = client.suggest_sweep_params(sweep_id=sweep.id)

# Complete a trial with results
client.complete_sweep_trial(
    sweep_id=sweep.id,
    trial_id=trial.id,
    metrics={"val_accuracy": 0.94}
)
```

### Managing Sweeps

- View all sweeps for an experiment
- Monitor trial progress
- Stop a sweep early if results plateau
- View best parameters found

## Dataset Tracking

Log datasets used in each run for reproducibility:

```python
run.log_dataset(
    name="customer-reviews-v2",
    path="s3://bucket/datasets/reviews.csv",
    description="Labeled customer reviews, 50k samples"
)
```

View datasets associated with any run from the run detail page.

## Run Alerts

Set up alerts on runs for important events:

```python
run.create_alert(
    condition="val_loss > 2.0",
    message="Validation loss is diverging"
)
```

Alerts trigger notifications when conditions are met during training.

## Run Notes

Add notes to runs for documentation:
- Click the **Notes** section on any run detail page
- Add markdown-formatted notes
- Notes are preserved and visible to team members

## Best Practices

### Naming Conventions

Use descriptive, consistent names:
- `bert-sentiment-lr-sweep` - Clear purpose
- `resnet50-imagenet-aug-v2` - Version included
- Avoid: `test1`, `final_final`, `experiment`

### What to Log

**Always Log:**
- All hyperparameters
- Final metrics
- Training configuration
- Random seeds

**Consider Logging:**
- Training curves
- Model checkpoints
- Sample predictions
- System information

### Reproducibility

Ensure experiments can be reproduced:
```python
run.log_params({
    "random_seed": 42,
    "torch_version": torch.__version__,
    "cuda_version": torch.version.cuda,
    "git_commit": get_git_hash()
})
```

## Integration with Training

### PyTorch Example

```python
import torch
from podstack import MLOpsClient

client = MLOpsClient(api_token="your_token")

with client.start_run(experiment_id="exp-123") as run:
    # Log hyperparameters
    run.log_params({
        "lr": 0.001,
        "epochs": 10,
        "batch_size": 32
    })

    # Training loop
    for epoch in range(10):
        train_loss = train_epoch(model, train_loader)
        val_loss, val_acc = validate(model, val_loader)

        run.log_metrics({
            "train_loss": train_loss,
            "val_loss": val_loss,
            "val_accuracy": val_acc
        }, step=epoch)

    # Save final model
    torch.save(model.state_dict(), "model.pt")
    run.log_artifact("model.pt")
```

### TensorFlow/Keras Example

```python
import tensorflow as tf
from podstack import MLOpsClient

client = MLOpsClient(api_token="your_token")

with client.start_run(experiment_id="exp-123") as run:
    run.log_params({
        "lr": 0.001,
        "epochs": 10
    })

    class LoggingCallback(tf.keras.callbacks.Callback):
        def on_epoch_end(self, epoch, logs=None):
            run.log_metrics(logs, step=epoch)

    model.fit(
        x_train, y_train,
        epochs=10,
        callbacks=[LoggingCallback()]
    )

    model.save("model.keras")
    run.log_artifact("model.keras")
```

## Next Steps

- [Model Registry](/docs/mlops/model-registry/) - Register successful models
- [AI Studio](/docs/advanced/ai-studio/) - Deploy models for inference

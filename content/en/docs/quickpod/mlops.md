---
title: MLOps
weight: 60
aliases:
  - /docs/mlops/experiment-tracking/
  - /docs/mlops/model-registry/
description: "Built-in MLOps for Podstack QuickPods — track experiments and runs, register and version models, monitor performance and drift, and automate training with pipelines and schedules."
keywords:
  - MLOps
  - experiment tracking
  - model registry
  - model versioning
  - model monitoring
  - drift detection
  - ML pipelines
  - training schedules
  - MLflow
  - podstack registry SDK
---
# MLOps

QuickPods ships with a built-in MLOps stack so you can track experiments, version models, monitor them in production, and automate retraining — all from the same portal you launch pods in. Experiment tracking is MLflow-compatible under the hood, but you use it through the Podstack **registry** SDK and the portal.

Everything here is **project-scoped**. Pick your project at the top of each MLOps page.

> If the MLOps/registry sections aren't visible in your portal, they may be gated by a feature flag or account level — contact support.

## Install and connect the SDK

Log experiments from any pod (or your laptop) with the Podstack registry SDK:

```python
from podstack import registry

registry.init(
    api_key="psk_...",          # or set PODSTACK_API_KEY
    project_id="your-project",  # or set PODSTACK_PROJECT_ID
    # api_url defaults to https://cloud.podstack.ai/registry
)
```

Generate an API key at **Account > API Tokens**.

## Experiment tracking

### Log a run from code

```python
from podstack import registry

registry.init(api_key="psk_...", project_id="your-project")
registry.set_experiment("bert-fine-tuning")   # created if it doesn't exist

with registry.start_run(name="training-v1") as run:
    registry.log_params({"learning_rate": 0.001, "batch_size": 32, "epochs": 10})

    for epoch in range(10):
        train_loss = train_one_epoch()
        val_loss, val_acc = validate()
        registry.log_metrics(
            {"train_loss": train_loss, "val_loss": val_loss, "val_accuracy": val_acc},
            step=epoch,
        )

    registry.log_artifact("model.pt")
```

Notes:

- `start_run(name=...)` opens a run inside the current experiment (it takes a run **name**, not an experiment id). Used as a context manager, it closes the run automatically.
- By default `start_run` captures your Python/pip/git/CUDA environment and logs system metrics (CPU/RAM/GPU) periodically, so runs are reproducible.
- Frameworks like PyTorch Lightning, Hugging Face, and scikit-learn can be auto-logged with `registry.autolog()`.

### View and compare runs in the portal

Go to **Experiment Tracking** (heading *"Track and manage your ML experiments and training runs"*):

1. Pick your **Project**, then click **New Experiment** to create one (**Experiment Name**, optional **Description**), or open an existing one.
2. The overview shows stat cards (**Total Experiments**, **Total Runs**, **Completed Runs** with success rate, **Failed Runs**) and charts (**Runs Over Time**, **Runs by Status**).
3. Open an experiment to see its **Runs** table with each run's status, duration, and latest metric values.
4. To compare runs, select them with the checkboxes and switch the view:
   - **Chart** view — a **Metrics Comparison** line chart; choose the metric to plot against **Step**.
   - **Params** view — a **Parameters Comparison** table with differing values highlighted.

<!-- screenshot: the Experiment Tracking overview with stat cards and Runs by Status chart -->

Run statuses are **running**, **completed**, **failed**, and **killed**. Archive an experiment to hide it from the default view (archived experiments remain viewable but not modifiable).

### Related SDK helpers

- **Datasets:** `registry.log_dataset(name=..., path=..., context="training", split=...)` for reproducibility.
- **Run notes:** `registry.update_run_notes(run_id, notes)`.
- **Alerts:** `registry.create_alert(run_id, metric_key, condition, threshold, notify_email=..., notify_slack=...)` where `condition` is one of `gt`, `lt`, `gte`, `lte`, `eq`.
- **Hyperparameter sweeps:** `registry.create_sweep(experiment_id, name, search_space, strategy="random", max_trials=20, metric=..., direction="minimize")` — strategy is `random` or `grid`. Drive trials with `suggest_trial_params`, `create_trial`, and `complete_trial`.

## Model registry

Register the models your runs produce, version them, and move them through lifecycle stages.

### Register a model

```python
with registry.start_run(name="training-v1") as run:
    # ... train ...
    registry.log_artifact("model.pt")
    run_id = run.id

registry.register_model(
    name="sentiment-classifier",
    run_id=run_id,
    description="BERT fine-tuned on the v2 dataset",
)
```

Registering from a run preserves full **lineage** — the registry knows which experiment, run, parameters, and datasets produced each version.

### Stages and transitions

Model versions move through four stages: **development**, **staging**, **production**, and **archived**.

```python
registry.set_model_stage("sentiment-classifier", version=3, stage="staging", comment="passed eval")
registry.set_model_stage("sentiment-classifier", version=3, stage="production")
```

In the portal, open the **Model Registry**, expand a model to see its versions, and use the stage controls to promote a version. The version's status is **pending**, **ready**, or **failed**.

### Aliases

Point a stable name at a specific version so deployments don't have to track version numbers:

```python
registry.set_model_alias("sentiment-classifier", alias="champion", version=3)
```

Aliases like `champion` / `challenger` decouple what's deployed from the underlying version.

### Approvals

For teams that gate promotions, the **Model Approval Queue** (*"Review and approve model promotions to Staging and Production"*) lists pending requests. Each shows the version, the `from_stage → to_stage` transition, and who requested it. Reviewers click **Approve** or **Reject** and can add a comment. From code: `registry.list_pending_approvals()`, `registry.approve_promotion(request_id, comment=...)`, `registry.reject_promotion(...)`.

## Monitoring and drift

### Performance monitoring

A **model monitor** tracks a deployed model's live performance — request count, error rate, and latency percentiles (p50/p95/p99), plus accuracy when you supply ground truth. On a monitor's **Alert Rules** page, click **Add Alert** and configure:

- **Metric** — P99/P95/Avg Latency, Error Rate, Throughput, or Accuracy
- **Condition** — `>`, `<`, `>=`, `<=`
- **Threshold** and **Window Size** (5 min, 15 min, or 1 hour)
- **Notify Email** and/or **Notify Webhook** (e.g. a Slack webhook)
- **Auto Action** — None, **Trigger Pipeline** (needs a pipeline ID), or **Rollback**

Click **Save Alert**. Alerts move through **active**, **triggered**, **resolved**, and **disabled**.

### Drift detection

The **Drift Detection** page (*"Monitor feature and concept drift across your deployed models"*) summarizes monitors as **Healthy**, **Warning**, or **Drift Detected**. Click **Create Drift Monitor** and set:

- **Linked Model Monitor** and a **Name**
- **Features** (comma-separated) to watch
- **Method** — PSI, KS Test, or JS Divergence
- **Threshold** (default 0.2), **Check Schedule** (cron, default `0 */6 * * *`), and **Sample Size**
- **Auto Retrain** — trigger a pipeline when drift is detected (needs a pipeline ID)

Each monitor card shows its overall drift score and last check, with **Run Check** to evaluate on demand and **View Details** for the report history.

## Pipelines

Automate multi-step ML workflows on the **Create Pipeline** page (*"Define your multi-step ML workflow"*):

1. Enter a **Pipeline Name** and **Description**.
2. Set the **Trigger Type**: **manual**, **cron** (with a **Cron Expression**), **webhook**, or **on_drift**.
3. Click **Add Step** for each stage. Step types are **training**, **evaluation**, **deployment**, and **custom**. Per step you set a **Name**, **Type**, **Timeout (min)**, **Retry Count**, **Dependencies** (which steps must finish first), and a **Config (JSON)** block.
4. The **Dependency Graph** section shows how steps connect.
5. Click **Create Pipeline**.

Trigger a run from the portal or with `registry`-side pipeline APIs. Runs and their steps report **pending**, **running**, **completed**, **failed**, or **cancelled**, and you can cancel a run in progress.

<!-- screenshot: the Pipeline Builder with steps and the dependency graph -->

## Schedules

Automate recurring training on the **Training Schedules** page (*"Automate recurring training runs with cron-based schedules"*):

1. Click **New Schedule**.
2. Set a **Schedule Name**, choose the **Experiment**, and enter a **Cron Expression** (5-field: minute hour day-of-month month day-of-week). Handy presets include *Every day at midnight* (`0 0 * * *`) and *Every Monday at 02:00* (`0 2 * * 1`).
3. Optionally set a **Run Name Prefix** and a **Webhook URL**.
4. Click **Create Schedule**.

The schedules table shows **Next Fire**, **Last Fired**, and the total **Fires**, with **pause/resume** and **delete** actions. From code: `registry.create_schedule(name, experiment_id, cron_expr, run_name=..., run_config=..., webhook_url=...)`.

## Next steps

- [Scenarios & Walkthroughs](/docs/quickpod/scenarios/) — track an experiment and register a model end to end.
- [Launch a Pod](/docs/quickpod/launch-a-pod/) — run your training on a GPU.
- [MLOps reference](/docs/mlops/) — deeper reference for each feature.

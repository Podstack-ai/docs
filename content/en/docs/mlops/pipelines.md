---
title: Pipelines
description: "Orchestrate multi-step ML workflows with DAG-based pipelines, automated triggers, and run history."
keywords:
  - ML pipelines
  - pipeline orchestration
  - DAG ML workflow
  - automated retraining
---

# ML Pipelines

Pipelines let you chain ML steps — training, evaluation, deployment, custom — into a directed acyclic graph (DAG) that runs on demand, on a cron schedule, on a webhook, or in response to drift.

Find pipelines under **MLOps > Pipelines**. The feature is gated by the `REACT_APP_ENABLE_ML_PIPELINES` flag.

## Concepts

- **Pipeline**: a named DAG of steps with a trigger and shared inputs.
- **Step**: one unit of work — `training`, `evaluation`, `deployment`, or `custom`. Each step has a JSON config, a timeout, and a retry count.
- **Dependencies**: each step can declare which other steps must finish first. The platform validates the DAG before saving — cycles are rejected.
- **Trigger**: how the pipeline starts — `manual`, `cron`, `webhook`, or `on_drift`.
- **Run**: a single execution of the pipeline. Runs have per-step status, logs, and artifacts.

## Creating a Pipeline

1. Go to **MLOps > Pipelines** → **Create Pipeline**.
2. Enter a name and description.
3. Pick a trigger:
   - **Manual** — runs only when you click **Run Now**.
   - **Cron** — runs on a cron expression.
   - **Webhook** — runs when the pipeline's webhook URL is called.
   - **On drift** — runs when an associated drift monitor fires.
4. Add steps. For each step:
   - Name and type (training / evaluation / deployment / custom)
   - Dependencies — pick which previously-defined steps must finish first
   - Config — JSON blob passed to the step runner
   - Timeout (minutes) and retry count
5. Click **Save**.

The pipeline editor lays steps out by dependency level so you can visually verify the DAG.

## Running and Monitoring

- Click **Run Now** from the pipeline page to trigger a manual run.
- The **Runs** tab lists every execution with status, duration, and trigger source.
- Open a run to see per-step status, logs, and output artifacts (models, datasets, metrics).
- Failed steps can be retried inline from the run detail page (if retry count is set on the step).

## Triggers in Practice

### Cron

Use cron triggers for nightly retraining, weekly evaluations, or any cadence-driven batch job.

### Webhook

Each webhook-triggered pipeline exposes a unique URL. POST to it from your CI, a Slack workflow, or an upstream system to start a run.

### On Drift

Bind a pipeline to a [drift monitor](/docs/mlops/drift-detection/). When the monitor flags drift on the bound feature set, the pipeline runs — typically a retraining → evaluation → deployment sequence.

## Use Cases

- **Nightly retraining**: cron-triggered `training → evaluation → conditional deployment`.
- **CI integration**: webhook-triggered `evaluation` step that gates a model promotion.
- **Closed-loop retraining**: drift-triggered `training → evaluation → approval → deployment`, optionally gated by an [approval](/docs/mlops/approvals/).

## Next Steps

- [Schedules](/docs/mlops/schedules/) — single-shot recurring training jobs (simpler than pipelines)
- [Drift Detection](/docs/mlops/drift-detection/) — wire drift into automatic retraining
- [Model Monitoring](/docs/mlops/model-monitoring/) — track deployed models over time

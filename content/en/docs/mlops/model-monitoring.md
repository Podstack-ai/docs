---
title: Model Monitoring
description: "Track latency, error rate, and request volume of deployed models with configurable rolling windows and alerts."
keywords:
  - model monitoring
  - ML observability
  - inference latency
  - model performance tracking
---

# Model Monitoring

Model Monitoring tracks the runtime performance of deployed model versions: request volume, latency percentiles, and error rates. Use it to know whether a model in production is healthy, slow, or breaking.

Find monitoring under **MLOps > Monitoring**. The feature is gated by `REACT_APP_ENABLE_MODEL_MONITORING`.

## Concepts

- **Monitor**: a binding between a model version and an inference endpoint, plus a rolling window over which metrics are aggregated.
- **Performance Snapshot**: aggregated metrics for the active window — `total_requests`, `error_rate`, `p50_latency_ms`, `p99_latency_ms`, etc.
- **Health**: derived from the latest snapshot:
  - **Healthy** — error rate < 5% and p99 < 500 ms
  - **Warning** — error rate ≥ 5% or p99 ≥ 500 ms
  - **Critical** — error rate ≥ 10% or p99 ≥ 1000 ms
- **Alert**: a rule that fires when a metric crosses a threshold for sustained periods.

## Creating a Monitor

1. Go to **MLOps > Monitoring** → **Create Monitor**.
2. Pick:
   - **Model** and **Model Version** (from the [Model Registry](/docs/mlops/model-registry/))
   - **Name**
   - **Endpoint URL** the model is served from
   - **Window size**: `5m`, `15m`, `1h`, `6h`, or `1d` — controls how much history each snapshot covers
3. Save. The monitor starts collecting metrics on the next request.

## Dashboard

The monitoring dashboard lists all monitors with a status badge (Active / Paused / Archived) and a health dot derived from the latest snapshot. Click a monitor to see:

- Time series of request volume and latency
- Distribution of p50 / p95 / p99 latency
- Error rate over time
- Recent request samples (where available)

## Alerts

Each monitor has an **Alerts** tab where you can configure threshold-based alerts:

- **Metric**: latency percentile, error rate, or request rate
- **Threshold** and comparison (above / below)
- **Sustained duration** — alert only if the threshold is crossed for at least N minutes

Alerts surface in the notifications panel and can be emailed (configure in **Settings > Notifications**).

## States

- **Active** — collecting metrics
- **Paused** — frozen, no new snapshots
- **Archived** — historical only, not displayed by default

## Use Cases

- Detect a regression after promoting a new model version
- Catch sudden latency spikes during traffic bursts
- Page on-call when error rate exceeds budget
- Sanity-check a canary deployment before a full rollout

## Next Steps

- [Drift Detection](/docs/mlops/drift-detection/) — catch input distribution shift before it shows up as errors
- [Pipelines](/docs/mlops/pipelines/) — wire monitoring into automatic retraining
- [Model Registry](/docs/mlops/model-registry/) — version models that monitors point at

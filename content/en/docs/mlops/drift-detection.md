---
title: Drift Detection
description: "Detect distribution shift in model inputs and outputs with PSI, KS test, and JS divergence — and trigger retraining automatically."
keywords:
  - drift detection
  - PSI drift
  - KS test
  - JS divergence
  - data drift
  - model drift
---

# Drift Detection

Drift detection catches statistical shift in model inputs or outputs before it shows up as accuracy loss. Each drift monitor compares a recent window of production data against a reference baseline using one of three methods.

Find it under **MLOps > Drift**. The feature is gated by `REACT_APP_ENABLE_DRIFT_DETECTION`.

## Concepts

- **Drift Monitor**: a configuration that periodically compares a feature set against a reference baseline.
- **Method**: the statistical test used:
  - **PSI** (Population Stability Index) — bucket-based comparison, common for tabular features
  - **KS Test** (Kolmogorov–Smirnov) — distribution-free test on continuous features
  - **JS Divergence** (Jensen–Shannon) — symmetric divergence between probability distributions
- **Threshold**: the score above which drift is considered detected (per-method).
- **Drift Report**: one comparison run with an `overall_score` and a per-feature breakdown.
- **Status** (derived):
  - **Healthy** — no drift detected
  - **Warning** — score within 70% of the threshold (approaching)
  - **Drift Detected** — score exceeds threshold

## Creating a Drift Monitor

1. Go to **MLOps > Drift** → **Create Monitor**.
2. Configure:
   - **Name** and **model**
   - **Method**: PSI / KS Test / JS Divergence
   - **Reference dataset**: the baseline distribution (typically the training distribution)
   - **Threshold** (defaults are method-specific)
   - **Run frequency** (how often to score current production data against the baseline)
3. Save.

## Dashboard

The drift dashboard lists every monitor with status (Healthy / Warning / Drift Detected), method, and latest score. Click a monitor to see:

- Score history over time
- Per-feature drift contribution (which features are shifting most)
- Links to individual drift reports

## Drift Reports

Each scoring run produces a **Drift Report** with:

- Overall score and method used
- Per-feature scores ranked by contribution
- Boolean `drift_detected` flag
- Timestamp

Use the report detail view to identify which inputs are shifting and decide whether to retrain.

## Wiring Drift to Retraining

Pair a drift monitor with an **on_drift** [Pipeline](/docs/mlops/pipelines/) to retrain automatically when drift fires. A typical pipeline:

1. Train on the latest data
2. Evaluate against the previous champion
3. (Optional) require an [approval](/docs/mlops/approvals/)
4. Deploy if better

## Choosing a Method

| Method | When to use |
|--------|-------------|
| **PSI** | Tabular features, especially in finance / risk where PSI is the convention |
| **KS Test** | Continuous numeric features without a natural bucketing |
| **JS Divergence** | Categorical features or already-bucketed distributions |

## Use Cases

- Detect upstream data-pipeline changes
- Catch seasonal distribution shift (e.g. new product launch, holiday traffic)
- Trigger retraining when input distribution diverges from training
- Audit a model before promoting it from staging to production

## Next Steps

- [Pipelines](/docs/mlops/pipelines/) — wire drift into automatic retraining
- [Model Monitoring](/docs/mlops/model-monitoring/) — combine input drift with runtime metrics
- [Experiment Tracking](/docs/mlops/experiment-tracking/) — log retraining runs triggered by drift

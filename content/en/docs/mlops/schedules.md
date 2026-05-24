---
title: Schedules
---

# Training Schedules

Automate your ML training pipelines with scheduled jobs. Run experiments on a recurring basis for continuous model improvement.

## Creating a Schedule

1. Navigate to **MLOps > Schedules**
2. Click **Create Schedule**
3. Configure:
   - **Name**: Descriptive schedule name
   - **Experiment**: Associated experiment
   - **Cron Expression**: When to trigger (standard cron format)
   - **Training Configuration**: Parameters, dataset, and settings
4. Click **Create**

### Cron Expression Examples

| Expression | Description |
|-----------|-------------|
| `0 2 * * *` | Daily at 2:00 AM |
| `0 0 * * 1` | Weekly on Monday at midnight |
| `0 6 1 * *` | Monthly on the 1st at 6:00 AM |
| `0 */6 * * *` | Every 6 hours |

## Managing Schedules

### Schedule List

View all schedules with:
- Schedule name and status
- Cron expression (next run time)
- Last execution result
- Associated experiment

### Schedule Actions

- **Pause**: Temporarily stop future executions
- **Resume**: Restart a paused schedule
- **Edit**: Update cron expression or configuration
- **Delete**: Permanently remove the schedule

### Execution History

View past executions for each schedule:
- Run timestamps
- Success/failure status
- Duration and resource usage
- Link to the generated run

## Use Cases

- **Nightly retraining**: Retrain models on fresh data every night
- **Weekly evaluation**: Evaluate production model performance weekly
- **Data drift detection**: Run comparison experiments on new data batches
- **Continuous improvement**: Iterate on hyperparameters automatically

## Next Steps

- [Experiment Tracking](/docs/mlops/experiment-tracking/) - View scheduled run results
- [Model Registry](/docs/mlops/model-registry/) - Register models from successful runs

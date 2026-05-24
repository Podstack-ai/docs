---
title: Approvals
---

# Model Approvals

Approval workflows ensure that model promotions (e.g., Staging to Production) are reviewed by team members before taking effect.

## How Approvals Work

1. A team member requests a model stage transition
2. An approval request is created automatically
3. Designated reviewers are notified
4. Reviewers evaluate the model and approve or reject
5. On approval, the stage transition completes

## Viewing Pending Approvals

Navigate to **MLOps > Approvals** to see:
- All pending approval requests
- Model name and version
- Requested stage transition (e.g., Staging → Production)
- Requester name and timestamp
- Current review status

## Reviewing an Approval

1. Click on a pending approval
2. Review the model version:
   - Training metrics and performance
   - Comparison with current production version
   - Dataset and training parameters
   - Model lineage
3. Add a comment explaining your decision
4. Click **Approve** or **Reject**

## Approval Status

| Status | Description |
|--------|-------------|
| Pending | Awaiting reviewer action |
| Approved | Reviewer approved the transition |
| Rejected | Reviewer rejected the transition |

## Best Practices

- **Always add comments** - Explain why you approved or rejected
- **Check metrics** - Compare against the current production model
- **Review lineage** - Verify the training data and parameters
- **Test first** - Ensure the model was evaluated in Staging before Production promotion

## Next Steps

- [Model Registry](/docs/mlops/model-registry/) - Manage model versions and stages
- [Experiment Tracking](/docs/mlops/experiment-tracking/) - View training details

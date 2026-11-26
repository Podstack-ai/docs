---
title: Jobs
description: "Run a script on a Podstack GPU until it finishes. You pay only for the time the job runs."
weight: 30
aliases:
  - /docs/trainpod/
  - /docs/jobs/fine-tuning/
  - /docs/jobs/move-data/
  - /docs/cli/train/
  - /docs/cli/gpu/
  - /docs/cli/files/
keywords:
  - Jobs
  - TrainPod
  - GPU job
---

# Jobs

Jobs was formerly called TrainPod. Links under `/docs/trainpod/` still open this section.

A job runs a script on a GPU until it finishes, fails, hits its timeout, or you cancel it. The machine shuts down when the job is done. You pay for the time the job runs, from the project wallet. You do not pay for idle time after it stops.

The Jobs page says: your first jobs are free, up to $25. Podstack credits back what those jobs cost as they run.

There is no separate fine-tuning product and no file-transfer command. Put the training script in the job. Put data where the script can read it, or pass [secrets](/docs/account/secrets/) by name.

## In this section

- [Submit a job](/docs/jobs/submit-a-job/)
- [Pricing and billing](/docs/jobs/pricing-and-billing/)
- [Troubleshooting](/docs/jobs/troubleshooting/)

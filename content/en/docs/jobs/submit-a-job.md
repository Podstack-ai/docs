---
title: Submit a job
description: "Submit a Podstack job with a name, GPU, container image, script, and timeout."
weight: 20
aliases:
  - /docs/jobs/provision-a-gpu/
keywords:
  - submit job
---

# Submit a job

Open [Jobs](https://podstack.ai/app/jobs) and click **Submit job**.

| Field | What to enter |
| --- | --- |
| Name | A label such as `train-v1`. |
| GPU | A type from the list. The list is loaded from `jobs/gpu-types`. |
| Container image | Default in the form is `pytorch/pytorch:latest`. Change it if you need another image. |
| Script | The shell to run. The form starts you with `nvidia-smi`. |
| Timeout (seconds) | Default 3600. The job is stopped when this elapses. |

The machine starts for the job and shuts down when the script exits.

## Status

Filter by **all**, **queued**, **running**, **succeeded**, **failed**, or **cancelled**.

**Logs** shows the output. **Cancel** is available while a job is queued or running.

A job can reference [secrets](/docs/account/secrets/) by name. For a job with a script or command, each secret is also placed in an environment variable of the same name.

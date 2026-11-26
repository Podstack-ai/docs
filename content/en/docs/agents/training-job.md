---
title: Submit a training job
weight: 50
description: "Submit a training script as a job, read logs, and cancel. There is no fine-tune API and no dataset upload."
keywords:
  - submit_job
  - job_logs
  - cancel_job
---

# Submit a training job

You pay for the time the job runs. There is no fine-tune API and no dataset upload. The script has to be a command the job image can run. Do not call `podstack train` or `podstack files`.

## Prompt to give the agent

```text
Look up job GPU types and their price_per_gpu_hour. Preview a job named train-v1 that runs `python train.py` on the cheapest fitting GPU, with dry_run true. Wait for my approval. Then submit with confirm true, read job_logs, and if I say cancel, preview cancel and cancel only with confirm true.
```

## Tool calls

```json
{"name": "submit_job", "arguments": {"name": "train-v1", "gpu_type": "<gpu_type>", "script": "python train.py", "dry_run": true}}
```

After you approve:

```json
{"name": "submit_job", "arguments": {"name": "train-v1", "gpu_type": "<gpu_type>", "script": "python train.py", "image": "pytorch/pytorch:latest", "timeout_seconds": 3600, "confirm": true}}
```

```json
{"name": "job_logs", "arguments": {"id": "<id>"}}
```

```json
{"name": "cancel_job", "arguments": {"id": "<id>", "dry_run": true}}
```

After you approve the cancel:

```json
{"name": "cancel_job", "arguments": {"id": "<id>", "confirm": true}}
```

CLI:

```sh
podstack jobs gpu-types
podstack jobs submit --name train-v1 --gpu-type <gpu_type> --script "python train.py" --dry-run
podstack jobs submit --name train-v1 --gpu-type <gpu_type> --script "python train.py" --yes
podstack jobs logs <id>
podstack jobs cancel <id> --yes
```

`jobs logs` prints the text the API has. Run it again to see newer lines. There is no follow flag.

**requires podstack>=1.8.0:** `client.job_gpus.list()`, `client.jobs.submit(..., dry_run=True)`, then `confirm=True`, `client.jobs.logs(id)`, `client.jobs.cancel(id, confirm=True)`.

## Expected output

The dry run echoes name, GPU type, image, and script. After confirm, the tool returns a job id and a status such as `queued` or `running`. Logs are plain text. Cancel returns the job id.

## Cost safety

Do not submit twice. A second `confirm: true` starts a second billed job. Cancel also needs a separate approval.

---
title: Fine-Tuning
weight: 50
description: "Run managed fine-tuning jobs on Podstack with podstack train — upload a JSONL dataset, pick a base model, launch a LoRA or QLoRA job, stream events, and get your fine-tuned model back. No GPU box to manage."
keywords:
  - fine-tuning GPU cloud
  - podstack train
  - LoRA fine-tuning
  - QLoRA fine-tuning
  - fine-tune Llama
  - managed fine-tuning job
  - upload training dataset JSONL
  - base model fine-tune
  - training job events
  - fine-tuned model
---

# Fine-Tuning

Podstack offers **managed fine-tuning** through `podstack train`. You upload a dataset, choose a base model and method (LoRA or QLoRA), and Podstack runs the training job for you — provisioning, running, and tearing down the GPUs automatically. There's no instance to SSH into or terminate.

Use managed fine-tuning when you want a fine-tuned model without operating the box. If you'd rather run your own training script on a raw GPU, [provision a TrainPod](/docs/trainpod/provision-a-gpu/) and SSH in instead.

## The flow at a glance

1. **Upload** your dataset — `podstack files upload`.
2. **Pick a base model** — `podstack train models`.
3. **Create the job** — `podstack train create`.
4. **Watch it** — `podstack train events --follow`.
5. **Collect the result** — `podstack train get`.

---

## Step 1 — Prepare and upload your dataset

Training data is typically a JSONL file. Upload it and note the returned file id — you'll pass it to the job. The default purpose is `fine-tune`.

```bash
podstack files upload ./data.jsonl --purpose fine-tune
```

```
Uploaded data.jsonl (1048576 bytes) as file_123
```

Record the file id (`file_123`).

> `--purpose` defaults to `fine-tune`, so `podstack files upload ./data.jsonl` is equivalent for training data.

---

## Step 2 — Choose a base model

List the base models available to fine-tune:

```bash
podstack train models
```

```
MODEL                           MODALITY   STATUS
podstack/gemma-4-31b-it    text       available
podstack/llama-3.1-8b-instruct  text       available
...
```

Model ids are Podstack-namespaced (e.g. `podstack/gemma-4-31b-it`). Pick one from the `MODEL` column.

---

## Step 3 — Create the fine-tuning job

`podstack train create` starts the job. `--model` and `--training-file` are required; `--method` defaults to `lora`.

```bash
podstack train create \
  --model podstack/gemma-4-31b-it \
  --training-file file_123 \
  --method lora
```

```
Started job ft_job_abc (status: queued)
```

### Flags

| Flag | Purpose | Default |
|------|---------|---------|
| `--model` | Base model to fine-tune — **required** | — |
| `--training-file` | Uploaded training file id — **required** | — |
| `--method` | Training method: `lora` or `qlora` | `lora` |
| `--suffix` | Suffix for the fine-tuned model name | — |
| `--seed` | Training seed (for reproducibility) | — |
| `--budget` | Max budget in USD (caps spend on the job) | none |

A fuller example with a name suffix, a fixed seed, and a spend cap:

```bash
podstack train create \
  --model podstack/llama-3.1-8b-instruct \
  --training-file file_123 \
  --method qlora \
  --suffix my-assistant \
  --seed 42 \
  --budget 25.00
```

> **`lora` vs `qlora`:** LoRA trains low-rank adapters on top of the base model; QLoRA does the same on a quantized base, cutting memory use — useful for larger models on tighter budgets.

---

## Step 4 — Monitor the job

List all your jobs:

```bash
podstack train list
```

```
ID          MODEL                          STATUS      CREATED
ft_job_abc  podstack/gemma-4-31b-it   running     2026-07-17T10:30:00Z
```

Stream events live with `--follow` (polls for new events; Ctrl-C to stop):

```bash
podstack train events ft_job_abc --follow
```

```
2026-07-17T10:30:05Z  [info] Job queued
2026-07-17T10:31:12Z  [info] Provisioning training GPU
2026-07-17T10:33:40Z  [info] Training started
2026-07-17T10:58:02Z  [info] Epoch 1 complete
...
```

Without `--follow`, `events` prints the events so far and exits.

---

## Step 5 — Get your fine-tuned model

Check job detail — once finished, it shows the resulting fine-tuned model id:

```bash
podstack train get ft_job_abc
```

```
ID:         ft_job_abc
Model:      podstack/gemma-4-31b-it
Status:     succeeded
Train file: file_123
Result:     podstack/gemma-4-31b-it:my-assistant
Created:    2026-07-17T10:30:00Z
```

The `Result` line is your fine-tuned model id, ready to use for inference.

### Cancel a running job

```bash
podstack train cancel ft_job_abc
```

```
Cancelled job ft_job_abc (status: cancelled)
```

---

## Scenario — Fine-tune Llama on an H100 from the CLI

Managed fine-tuning runs the GPU for you — you never pick or SSH into the box; Podstack schedules the training GPU (an H100-class card for larger jobs) behind the scenes.

```bash
# 1. Upload the dataset
podstack files upload ./instructions.jsonl --purpose fine-tune
#    -> Uploaded instructions.jsonl (...) as file_456

# 2. Confirm the base model is available
podstack train models

# 3. Launch a QLoRA job with a spend cap
podstack train create \
  --model podstack/llama-3.1-8b-instruct \
  --training-file file_456 \
  --method qlora \
  --suffix support-bot \
  --budget 30.00
#    -> Started job ft_job_xyz (status: queued)

# 4. Follow it to completion
podstack train events ft_job_xyz --follow

# 5. Grab the fine-tuned model id
podstack train get ft_job_xyz
```

> **Want full control instead?** To run your own training loop (custom framework, custom data pipeline, multi-GPU script), [provision a raw GPU](/docs/trainpod/provision-a-gpu/), [SSH in](/docs/trainpod/ssh-access/), [move your data](/docs/trainpod/move-data/), and run your script directly.

## Managed fine-tuning vs your own script

| | **`podstack train` (managed)** | **Raw TrainPod + your script** |
|---|---|---|
| GPU management | Automatic — no box to launch or terminate | You launch, SSH in, and terminate |
| Methods | LoRA / QLoRA | Anything you can run |
| Data | Upload a JSONL file | Move data in with `cp` / `send` |
| Best for | Standard LLM fine-tuning, hands-off | Custom pipelines, full control |
| Billing | Per-job (cap with `--budget`) | Per-hour while the instance runs |

## FAQs

**What format should my dataset be?**
A JSONL file uploaded with `podstack files upload`. Follow your base model's expected instruction/chat format for the records.

**How is a managed job billed?**
By the training run, against your wallet. Use `--budget <USD>` to cap spend. See [Pricing & billing](/docs/trainpod/pricing-and-billing/).

**What's the difference between LoRA and QLoRA?**
Both train low-rank adapters. QLoRA quantizes the base model to save memory, which helps fit larger models or reduce cost. Set it with `--method qlora`.

**Can I reproduce a run?**
Pass `--seed <n>` to fix the training seed.

**How do I use the fine-tuned model after training?**
`podstack train get <id>` shows the resulting model id under `Result`. Use that id for inference. See the [Inference docs](/docs/inference/).

**Can I cancel a job?**
Yes — `podstack train cancel <id>` stops a queued or running job.

**Where do I see progress?**
`podstack train events <id> --follow` streams events; `podstack train list` and `podstack train get <id>` show status.

## Next steps

- [Move data](/docs/trainpod/move-data/) — prepare and move datasets.
- [Pricing & billing](/docs/trainpod/pricing-and-billing/) — job budgets and the wallet.
- [CLI reference](/docs/cli/) — every `podstack` command.

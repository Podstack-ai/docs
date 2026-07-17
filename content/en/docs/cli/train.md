---
title: Fine-tuning
weight: 80
description: "Run managed fine-tuning jobs on Podstack from the CLI — upload a dataset, start a LoRA/full fine-tune, and follow job events with podstack train."
keywords:
  - fine-tuning CLI
  - podstack train
  - LoRA fine-tune
  - managed training job
  - dataset upload fine-tune
---

# Fine-tuning — `podstack train`

Run **managed** fine-tuning ("train") jobs — you provide a dataset and a base model, Podstack runs the training on GPUs and gives you a fine-tuned model. No box to provision or babysit.

## 1. Upload a dataset

Fine-tuning reads a dataset file (e.g. JSONL). Upload it first with [`podstack files`](/docs/cli/files/):

```sh
podstack files upload ./data.jsonl --purpose fine-tune
# → prints a file id like file_123
```

## 2. Pick a base model

```sh
podstack train models                # list available base models
```

## 3. Start a job

```sh
podstack train create \
  --model podstack/qwen2.5-7b-instruct \
  --training-file file_123 \
  --method lora
```

Common options: `--model` (base model), `--training-file` (the uploaded file id), `--method` (e.g. `lora`). Run `podstack train create --help` for the full list (epochs, learning rate, validation file, etc.).

## 4. Track the job

```sh
podstack train list                  # all your jobs and their status
podstack train get <id>              # details for one job
podstack train events <id> --follow  # stream job events live
podstack train cancel <id>           # cancel a running job
```

## Scenario: fine-tune and serve

1. `podstack files upload ./train.jsonl --purpose fine-tune`
2. `podstack train create --model podstack/qwen2.5-7b-instruct --training-file file_… --method lora`
3. `podstack train events <id> --follow` until it completes.
4. Use the resulting model on [Inference Cloud](/docs/inference/) or list it with [`podstack models`](/docs/cli/models/).

## Related

- [Files](/docs/cli/files/) — dataset upload.
- [Models](/docs/cli/models/) — list models, including your fine-tunes.
- [Inference](/docs/inference/) — serve the fine-tuned model over an API.

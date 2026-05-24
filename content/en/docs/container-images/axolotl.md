---
title: axolotl
weight: 20
---

# axolotl — LLM fine-tuning framework

OpenAccess-AI-Collective's **Axolotl** — a YAML-driven framework for full fine-tunes, LoRA, QLoRA, and DPO across PyTorch, DeepSpeed, and FSDP backends.

## Image tag

`docker.io/manvarharsh/axolotl:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- Axolotl + dependencies (`transformers`, `accelerate`, `deepspeed`, `peft`, `bitsandbytes`)
- Flash Attention 2
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- Full fine-tunes of 7B–70B Llama / Mistral / Qwen models
- QLoRA / LoRA on consumer GPUs
- DPO / KTO preference tuning
- Multi-GPU training via DeepSpeed / FSDP
- Reproducible YAML-config training runs

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Place training configs in `/data/configs/`, datasets in `/data/datasets/`, outputs in `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

---
title: unsloth
weight: 22
---

# unsloth — fast LLM fine-tuning

**Unsloth** fine-tunes Llama / Mistral / Qwen / Gemma models **2–5× faster** with up to **70% less VRAM** vs. vanilla Hugging Face — using hand-written Triton kernels.

## Image tag

`docker.io/manvarharsh/unsloth:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- Unsloth, transformers, peft, trl, bitsandbytes
- xformers, Flash Attention
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- LoRA / QLoRA fine-tunes on consumer GPUs (T4, 3090, 4090)
- Fast fine-tuning of Llama 3.x, Mistral, Qwen, Gemma
- DPO / ORPO preference tuning with Unsloth's kernels
- Notebook-driven experimentation with the Unsloth examples

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Datasets under `/data/datasets/`, fine-tune outputs under `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [unsloth-studio](/docs/container-images/unsloth-studio/) — managed UI variant
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

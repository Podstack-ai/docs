---
title: kohya-ss
weight: 13
---

# kohya-ss — Kohya LoRA / fine-tune trainer

The standard toolkit for training Stable Diffusion LoRAs, LyCORIS, DreamBooth, and full fine-tunes. Bundled with the Kohya GUI.

## Image tag

`docker.io/manvarharsh/kohya-ss:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- bmaltais/kohya_ss (with submodules)
- bitsandbytes, accelerate, xformers
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 7860 | Kohya GUI |

## Use cases

- Training SD 1.5 / SDXL LoRAs on character / style datasets
- DreamBooth fine-tunes
- Textual inversion embeddings
- LyCORIS variants (LoCon, LoHa, LoKr)
- Batch dataset captioning + bucketed training

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_KOHYA` | Start the GUI on port 7860 |
| `KOHYA_EXTRA_ARGS` | Extra CLI args for `kohya_gui.py` |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Put training images under `/data/datasets/<name>/`, base checkpoints under `/data/models/`, and outputs under `/data/output/loras/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

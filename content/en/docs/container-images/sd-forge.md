---
title: sd-forge
weight: 11
---

# sd-forge — SD WebUI Forge

A1111-compatible fork by lllyasviel focused on **faster inference** and **lower VRAM use**, with native support for SVD, Flux, and modern attention kernels.

## Image tag

`docker.io/manvarharsh/sd-forge:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12 support
- lllyasviel/stable-diffusion-webui-forge
- xformers
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 7860 | Forge WebUI |

## Use cases

- A1111 workflows on lower-VRAM GPUs (e.g. RTX 3060, T4)
- Faster image generation than vanilla A1111
- Flux.1 schnell / dev image generation
- Stable Video Diffusion (SVD) experiments

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_FORGE` | Start the WebUI on port 7860 |
| `FORGE_EXTRA_ARGS` | Extra CLI args (`--xformers`, `--cuda-malloc`) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Forge follows A1111's directory conventions — checkpoints under `/data/models/Stable-diffusion/`, LoRAs under `/data/models/Lora/`, outputs under `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

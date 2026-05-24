---
title: ubuntu-ssh-cuda
weight: 80
---

# ubuntu-ssh-cuda — bare Ubuntu + CUDA + SSH

A minimal **Ubuntu 22.04 + CUDA 12.4** image with just SSH and the essentials. Use this when you want full control over the stack and you'll install everything yourself.

## Image tag

`docker.io/manvarharsh/ubuntu-ssh-cuda:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda) — minimal
- Hugging Face Hub CLI (handy for downloading models)
- OpenSSH server
- No JupyterHub, no Python ML libs preinstalled

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |

## Use cases

- Bring-your-own-stack environments
- Reproducing a colleague's exact `pip install` setup
- Testing custom CUDA code without framework interference
- Lightweight remote dev box for GPU work

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server (typically `true` for this image) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Install your stack into `/data/venv/` (or use `pip install --user`) so it survives restarts.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [jupyterlab-gpu](/docs/container-images/jupyterlab-gpu/) — if you want JupyterLab pre-wired
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

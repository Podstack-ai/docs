---
title: sam3
weight: 72
---

# sam3 — Meta Segment Anything Model 3

Meta's **SAM 3** segmentation model — promptable image and video segmentation. The image bakes in the `facebook/sam3` checkpoint at build time so cold-start is instant.

## Image tag

`docker.io/manvarharsh/sam3:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.6.3-cudnn-devel-ubuntu22.04`
- Python 3.12 (conda)
- PyTorch 2.10 (CUDA 12.8 wheels)
- SAM 3 (cloned from `facebookresearch/sam3`)
- Bundled checkpoint at `/opt/sam3_checkpoints/sam3.pt`
- Optional flash-attn-3
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- Promptable segmentation (point / box / mask prompts)
- Video object tracking / segmentation
- Building annotation tools and dataset prep pipelines
- Research on top of SAM 3 weights

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SAM3_CHECKPOINT_DIR` | Override checkpoint directory (default `/opt/sam3_checkpoints`) |
| `SAM3_CHECKPOINT` | Override specific checkpoint file (default `sam3.pt`; use e.g. `sam3.1_multiplex.pt`) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Place input images / videos in `/data/inputs/` and write masks / annotations to `/data/output/`. Point `SAM3_CHECKPOINT_DIR` at `/data/checkpoints/` if you want to use a custom checkpoint stored on the volume.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

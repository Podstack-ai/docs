---
title: comfyui
weight: 12
---

# comfyui — ComfyUI

Node-graph based image (and video) generation UI. More flexible than A1111 for building custom pipelines — txt2img, img2img, animation, SVD, LTX, Flux, and anything you can wire up.

## Image tag

`docker.io/manvarharsh/comfyui:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12 (`torch`, `torchvision`, `torchaudio`)
- ComfyUI (cloned at build time)
- ComfyUI-Manager — install custom nodes from the UI
- 8 pre-installed custom nodes including:
  - ComfyUI-Impact-Pack
  - ComfyUI-Impact-Subpack
- JupyterHub with the Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |
| 8188 | ComfyUI WebUI |

## Use cases

- Building reproducible image-generation pipelines via node graph
- Stable Diffusion, SDXL, SD3, Flux, LTX, SVD workflows
- Animation, ControlNet, IP-Adapter pipelines
- Headless API rendering (`--listen` + REST calls into ComfyUI)

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `ENABLE_COMFYUI` | Start ComfyUI on port 8188 |
| `COMFYUI_PORT` | Override the listening port (default 8188) |
| `COMFYUI_EXTRA_ARGS` | Extra CLI args (`--highvram`, `--fp16-vae`, `--listen 0.0.0.0`) |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence — important

Mount your storage at **`/data`** — and **do not change this path**.

ComfyUI's custom nodes, models, workflows, and outputs are stored under `/data`. If you remap the mount point, every custom node you install will disappear on restart. Pin the mount to `/data`.

Typical layout:

```
/data/
├── models/checkpoints/    # SD/SDXL/Flux checkpoints
├── models/loras/
├── models/controlnet/
├── custom_nodes/          # nodes installed via ComfyUI-Manager
├── workflows/             # saved .json workflows
└── output/                # generated images/videos
```

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

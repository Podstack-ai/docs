---
title: pytorch
weight: 40
---

# pytorch — PyTorch + Jupyter

A GPU-ready **PyTorch** environment with JupyterHub, SSH, and common computer-vision libraries. Use this when you want a clean PyTorch sandbox without committing to a specific framework on top.

## Image tag

`docker.io/manvarharsh/pytorch:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch (CUDA 12), torchvision, torchaudio
- ultralytics (YOLO), opencv-python-headless
- NumPy, Pandas, Matplotlib, scikit-learn
- JupyterHub with the Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- General-purpose PyTorch development
- Training computer-vision models (detection, segmentation, classification)
- Notebook-driven ML experimentation
- A solid base for installing any PyTorch ecosystem package

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Notebooks under `/data/notebooks/`, models under `/data/models/`, datasets under `/data/datasets/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

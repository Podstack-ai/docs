---
title: jupyterlab-gpu
weight: 42
---

# jupyterlab-gpu — bare JupyterLab on GPU

A clean **JupyterLab** environment on top of CUDA 12 — no opinionated ML libs preinstalled, just Jupyter and Python. Bring your own `pip install`.

## Image tag

`docker.io/manvarharsh/jupyterlab-gpu:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- JupyterLab + JupyterHub
- Podstack authenticator
- OpenSSH server
- Build essentials and common CUDA dev headers

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- A blank-slate notebook environment when none of the preset images fits
- Teaching / coursework where students install their own stack
- Quick sandbox for trying a new library on GPU

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Notebooks and any installed packages (`pip install --target=/data/site-packages`) live there.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [pytorch](/docs/container-images/pytorch/) and [tensorflow](/docs/container-images/tensorflow/) for opinionated alternatives
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

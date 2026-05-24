---
title: gromacs
weight: 61
---

# gromacs — molecular dynamics

**GROMACS** — a fast, parallel molecular-dynamics simulator. The image is built with CUDA GPU acceleration enabled.

## Image tag

`docker.io/manvarharsh/gromacs:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- GROMACS (built with CUDA, installed under `/opt/gromacs`)
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- Protein / lipid / membrane MD simulations on GPU
- Free-energy calculations
- Enhanced-sampling methods (REMD, metadynamics via PLUMED if you install it)
- Reproducible computational chemistry pipelines via notebooks

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Input topologies in `/data/inputs/`, trajectory output in `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

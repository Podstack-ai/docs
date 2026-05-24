---
title: alphafold
weight: 60
---

# alphafold — protein structure prediction

DeepMind's **AlphaFold** — state-of-the-art protein structure prediction from sequence alone. The image ships AlphaFold + the genetic / template databases it needs at inference time.

## Image tag

`docker.io/manvarharsh/alphafold:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- AlphaFold inference pipeline
- HMMER, HHsuite, Kalign for MSA / template search
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- Predicting 3D structure from a protein sequence
- Multimer predictions
- High-throughput structural biology screens
- Reproducible MSA + structure pipelines

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. AlphaFold's reference databases are large (several TB) — point the genetic-database flags at a mounted NFS volume under `/data/alphafold-db/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

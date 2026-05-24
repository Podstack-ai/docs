---
title: rapids
weight: 43
---

# rapids — NVIDIA RAPIDS

NVIDIA's **RAPIDS** suite — `cuDF`, `cuML`, `cuGraph`, and friends. GPU-accelerated drop-in replacements for pandas, scikit-learn, NetworkX.

## Image tag

`docker.io/manvarharsh/rapids:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- cuDF, cuML, cuGraph, cuPy, cuSpatial
- Dask, Dask-CUDA for multi-GPU workloads
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- GPU-accelerated ETL on large dataframes
- Multi-GPU data processing with Dask
- Fast classical ML (Random Forest, XGBoost) on big tabular data
- Graph analytics on GPU (PageRank, community detection)

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Datasets and notebooks under `/data/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

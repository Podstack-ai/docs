---
title: tensorflow
weight: 41
---

# tensorflow — TensorFlow + Jupyter

A GPU-ready **TensorFlow** environment with JupyterHub, SSH, and standard data-science packages. Ships in two flavors for newer and older NVIDIA hardware.

## Image tags

- `docker.io/manvarharsh/tensorflow:cuda12` — CUDA 12.4 + TensorFlow 2.18 (RTX 40xx, L4, L40S, H100)
- `docker.io/manvarharsh/tensorflow:cuda11` — CUDA 11.8 + TensorFlow 2.13 (RTX 30xx, Ampere, Volta, Turing)

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04` (or 11.8 variant)
- Python 3.10 (conda)
- TensorFlow 2.18 (cuda12) or 2.13 (cuda11)
- NumPy, Pandas, Matplotlib, scikit-learn
- JupyterHub with the Podstack authenticator
- NVDashboard GPU monitoring
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- TensorFlow / Keras model training
- TFRecord-based pipelines
- TPU-compatible code paths
- General notebook-driven TF experimentation

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

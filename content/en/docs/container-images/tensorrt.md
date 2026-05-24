---
title: tensorrt
weight: 44
---

# tensorrt — NVIDIA TensorRT

NVIDIA's **TensorRT** optimizer and runtime for high-performance deep-learning inference. Convert PyTorch / ONNX models into optimized engines.

## Image tag

`docker.io/manvarharsh/tensorrt:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- TensorRT (CUDA 12 build)
- PyTorch, ONNX, onnx-graphsurgeon, polygraphy
- TensorRT-LLM (optional, when present)
- JupyterHub with Podstack authenticator
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub |

## Use cases

- Converting trained PyTorch / ONNX models to TRT engines
- Benchmarking inference latency / throughput
- Compiling TRT-LLM engines for large-model serving
- Mixed-precision (FP16 / INT8 / FP8) optimization

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_JUPYTERHUB` | Enable JupyterHub on port 8000 |
| `PODSTACK_API_URL` | Backend URL for JupyterHub token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Compiled engines (`.plan` / `.engine`) under `/data/engines/`, source models under `/data/models/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [triton](/docs/container-images/triton/) — for serving the compiled TRT engines
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

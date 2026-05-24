---
title: triton
weight: 35
---

# triton — NVIDIA Triton Inference Server

NVIDIA's production-grade inference server. Supports TensorFlow, PyTorch, ONNX, TensorRT, vLLM, and custom backends with dynamic batching, model ensembles, and gRPC/HTTP APIs.

## Image tag

`docker.io/manvarharsh/triton:cuda12`

## What's in this image

- Base: `nvcr.io/nvidia/tritonserver:26.03-vllm-python-py3`
- Triton Inference Server with vLLM, Python, and PyTorch backends
- Hugging Face Hub CLI
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | HTTP / REST inference |
| 8001 | gRPC inference |
| 8002 | Prometheus metrics |

## Use cases

- Hosting many models behind one endpoint (model registry + ensembles)
- Mixed-framework serving (PyTorch + ONNX + TensorRT in one server)
- vLLM-backend LLM serving with Triton's dynamic batching
- Prometheus-instrumented model metrics

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_TRITON` | Start Triton server |
| `TRITON_MODEL_REPOSITORY` | Path to model repo (default `/data/models`) |
| `TRITON_EXTRA_ARGS` | Extra CLI args (`--strict-model-config=false`, `--log-verbose=1`) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Put your Triton-style model repository under `/data/models/`:

```
/data/models/
├── my-model/
│   ├── config.pbtxt
│   └── 1/model.onnx
```

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

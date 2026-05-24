---
title: vllm
weight: 30
---

# vllm — vLLM inference server

High-throughput, low-latency LLM serving with PagedAttention and continuous batching. Exposes an OpenAI-compatible API.

## Image tag

`docker.io/manvarharsh/vllm:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- vLLM (latest stable)
- Hugging Face Hub CLI for model downloads
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | vLLM OpenAI-compatible API |

## Use cases

- High-throughput LLM serving for production traffic
- OpenAI-API drop-in replacement (`/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`)
- Tensor-parallel serving across multiple GPUs
- LoRA-adapter swapping at request time

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_VLLM` | Start the vLLM server on port 8000 |
| `VLLM_MODEL` | Hugging Face model ID to load (e.g. `meta-llama/Llama-3.1-8B-Instruct`) |
| `VLLM_EXTRA_ARGS` | Extra CLI args (`--tensor-parallel-size 2`, `--max-model-len 8192`, `--quantization awq`) |
| `HF_TOKEN` | Hugging Face token for gated models |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Quick test

```bash
curl http://<pod-url>:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"<model>","messages":[{"role":"user","content":"Hello"}]}'
```

## Persistence

Mount at **`/data`**. Place downloaded Hugging Face weights under `/data/models/` and set `HF_HOME=/data/hf-cache` to keep the cache persistent.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

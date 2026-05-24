---
title: sglang
weight: 31
---

# sglang — SGLang structured-generation server

LMSYS's **SGLang** — an LLM serving runtime optimized for **structured output**, multi-turn agent workloads, and complex prompt programs. OpenAI-compatible API.

## Image tag

`docker.io/manvarharsh/sglang:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- SGLang runtime + frontend
- Flash Attention, FlashInfer
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | SGLang OpenAI-compatible API |

## Use cases

- JSON-schema-constrained generation (function calling, structured output)
- Multi-turn agent tool-use with low overhead
- Speculative decoding via SGLang's runtime
- Faster constrained generation than vanilla vLLM in many cases

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_SGLANG` | Start the SGLang server |
| `SGLANG_MODEL` | Hugging Face model ID to load |
| `SGLANG_EXTRA_ARGS` | Extra CLI args (`--tp 2`, `--mem-fraction 0.85`) |
| `HF_TOKEN` | Hugging Face token for gated models |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Set `HF_HOME=/data/hf-cache` to keep model weights persistent across pod restarts.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [vllm](/docs/container-images/vllm/) — alternative serving runtime
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

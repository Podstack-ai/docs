---
title: ollama
weight: 32
---

# ollama — local LLM runner

**Ollama** packages popular open LLMs into easy-to-pull bundles with sensible defaults. One-line model installs and a simple HTTP API.

## Image tag

`docker.io/manvarharsh/ollama:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Ollama server (CUDA build)
- Hugging Face Hub CLI for sideloading GGUFs
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 11434 | Ollama HTTP API |

## Use cases

- Quick local LLM experimentation (`ollama run llama3.1`)
- Bring-up of a chat backend for prototypes
- Running GGUF-quantized models on small GPUs
- Lightweight inference where vLLM/SGLang is overkill

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_OLLAMA` | Start the Ollama server on port 11434 |
| `OLLAMA_MODELS` | Override model store path (default `/data/.ollama/models`) |
| `OLLAMA_HOST` | Bind address (default `0.0.0.0:11434`) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Quick test

```bash
ollama pull llama3.1:8b
curl http://<pod-url>:11434/api/generate \
  -d '{"model":"llama3.1:8b","prompt":"Hello"}'
```

## Persistence

Mount at **`/data`**. Ollama stores pulled models under `/data/.ollama/models/` so they survive restarts.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

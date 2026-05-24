---
title: tei
weight: 34
---

# tei — Text Embeddings Inference

Hugging Face's **Text Embeddings Inference** — a Rust-based server for embeddings, re-ranking, and classification models. Production-grade with batching, ONNX, and FlashAttention.

## Image tag

`docker.io/manvarharsh/tei:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- HuggingFace Text Embeddings Inference (CUDA build)
- Hugging Face Hub CLI
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8080 | TEI HTTP API |

## Use cases

- Hosting BGE / E5 / GTE embedding models for RAG pipelines
- Hosting BAAI / Cohere re-rankers
- Bulk embedding of document corpora
- Drop-in replacement for OpenAI's `/v1/embeddings` API (with TEI's OpenAI-compatible mode)

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_TEI` | Start the TEI server on port 8080 |
| `TEI_MODEL_ID` | Hugging Face model ID (e.g. `BAAI/bge-large-en-v1.5`) |
| `TEI_EXTRA_ARGS` | Extra CLI args |
| `HF_TOKEN` | Hugging Face token for gated models |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Quick test

```bash
curl http://<pod-url>:8080/embed \
  -H 'Content-Type: application/json' \
  -d '{"inputs":"The quick brown fox"}'
```

## Persistence

Mount at **`/data`**. Set `HF_HOME=/data/hf-cache` to persist model weights.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

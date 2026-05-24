---
title: text-gen-webui
weight: 33
---

# text-gen-webui — oobabooga text-generation-webui

The **oobabooga text-generation-webui** — a Gradio interface for chatting with, evaluating, and fine-tuning open LLMs. Supports transformers, llama.cpp, ExLlamaV2, and AutoGPTQ backends.

## Image tag

`docker.io/manvarharsh/text-gen-webui:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- text-generation-webui (cloned at build time)
- transformers, ExLlamaV2, llama-cpp-python, AutoGPTQ, AWQ
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 7860 | text-generation-webui Gradio UI |

## Use cases

- Interactive chat / instruct testing of open LLMs
- Comparing GGUF / GPTQ / AWQ / EXL2 quantizations
- Prompt-engineering and persona experimentation
- Lightweight LoRA training from the UI

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_TEXTGEN` | Start the WebUI on port 7860 |
| `TEXTGEN_EXTRA_ARGS` | Extra CLI args (`--listen`, `--api`, `--load-in-4bit`) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Models in `/data/models/`, characters in `/data/characters/`, LoRAs in `/data/loras/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

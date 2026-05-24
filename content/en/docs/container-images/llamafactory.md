---
title: llamafactory
weight: 21
---

# llamafactory — LLaMA-Factory

A unified GUI + CLI for LLM training, fine-tuning, evaluation, and inference. Supports 100+ models out of the box.

## Image tag

`docker.io/manvarharsh/llamafactory:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- PyTorch with CUDA 12
- LLaMA-Factory (`hiyouga/LLaMA-Factory`)
- bitsandbytes, accelerate, deepspeed, peft, trl
- Gradio web UI
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 7860 | LLaMA-Factory web UI |
| 8000 | API server |

## Use cases

- Web-UI driven LLM fine-tuning (SFT, DPO, ORPO, KTO, PPO)
- LoRA / QLoRA / full fine-tunes for Llama, Qwen, Gemma, Yi, Mistral
- One-click model export to GGUF / vLLM / Ollama formats
- Built-in eval against MMLU, IFEval, etc.

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_LLAMAFACTORY` | Start the web UI on port 7860 |
| `LLAMAFACTORY_EXTRA_ARGS` | Extra CLI args |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Datasets in `/data/datasets/`, checkpoints in `/data/output/`, base models in `/data/models/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

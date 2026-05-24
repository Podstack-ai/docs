---
title: Container Images

weight: 35
description: "Pre-built Podstack container images for GPU workloads — image generation, LLM training and serving, scientific computing, and more."
keywords:
  - container images
  - GPU container
  - PyTorch container
  - ComfyUI container
  - vLLM container
  - LLM container
  - podstack images
---

# Podstack Container Images

Podstack ships a catalog of pre-built, GPU-ready container images covering the most common AI/ML workloads. Pick one from the **Template Catalog** when creating a pod, or pull the image directly from Docker Hub.

All images are published at `docker.io/manvarharsh/<image>:cuda12` (TensorFlow also has a `cuda11` tag for older GPUs).

## Conventions

### Default Mount Path: `/data`

Every Podstack image expects your persistent storage at **`/data`**. Mount an NFS volume or attach a persistent disk here and your work survives pod restarts and recreations.

```bash
# Typical layout inside the pod
/data/
├── datasets/      # input data
├── models/        # checkpoints, weights
└── output/        # results
```

> **ComfyUI exception.** For the [ComfyUI](/docs/container-images/comfyui/) image, **do not change `/data`**. Custom nodes, models, and workflows are stored under `/data` and need to live there to survive a restart. Change it and you'll lose your custom-node setup every time the pod restarts.

### CUDA Base

All GPU images are built on `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04` unless noted. They run on any modern NVIDIA GPU — RTX 30/40 series, L4, L40S, A100, H100. The `cuda11` TensorFlow variant covers older Ampere/Volta/Turing hardware.

### SSH + Service Architecture

Every image follows the same pattern:

- **Port 22**: SSH (controlled by `ENABLE_SSH=true`)
- **Main service port**: the application — JupyterHub (8000), Gradio (7860), the app's native port (e.g. 8188 for ComfyUI, 11434 for Ollama)
- **Entrypoint**: `/opt/podstack/scripts/entrypoint.sh` wires env vars to services

### Common Environment Variables

| Variable | Description |
|---|---|
| `ENABLE_SSH=true/false` | Enable SSH server on port 22 |
| `ENABLE_JUPYTERHUB=true/false` | Enable JupyterHub on port 8000 (where supported) |
| `SSH_PUBLIC_KEY=ssh-ed25519 …` | Public key to authorize |
| `PODSTACK_API_URL=https://…` | Backend URL for JupyterHub token validation |
| `NVIDIA_VISIBLE_DEVICES=all` | Which GPUs to expose |

Image-specific variables (e.g. `ENABLE_COMFYUI`, `COMFYUI_EXTRA_ARGS`, `VNC_PORT`) are listed on each image's page.

### JupyterHub Auth

For images with JupyterHub, log in with:

- **Username**: any name (it's just a session label)
- **Password**: your Podstack API token (`psk_...`) — generate one at **Account > API Tokens**

The token is validated against the Podstack backend.

## Accessing Output Files in the Browser

Many workflows produce output files (renders, generated images, processed video) under `/data/output/`. To browse those files in your browser:

### 1. Expose a Port on the Pod

1. Open the pod's detail page in the portal.
2. Click **Edit Deployment**.
3. Add a new exposed port (e.g. `8080`).
4. Save. A new URL mapped to that port appears on the pod page.

### 2. SSH into the Pod and `cd` to the Output Directory

```bash
ssh root@<pod-subdomain>.cloud.podstack.ai
cd /data/output
```

Use whichever directory your app writes to — `/data/output`, `/data/comfyui/output`, `/data/renders`, etc.

### 3. Start Python's Built-In HTTP Server

```bash
python3 -m http.server 8080
```

You should see:

```
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```

### 4. Open the Mapped URL

Open the URL surfaced under the pod's exposed port (from step 1) — it routes traffic to port 8080 inside the container. You'll see a directory listing with every file in `/data/output/` available to download or preview.

Press **Ctrl+C** in the SSH session to stop the server when you're done.

**Note**: This serves your files publicly to anyone with the URL. Don't expose sensitive data this way, or stop the server immediately after you're done.

## Image Catalog

### Image Generation

- [a1111](/docs/container-images/a1111/) — Automatic1111 Stable Diffusion WebUI
- [sd-forge](/docs/container-images/sd-forge/) — SD WebUI Forge (faster A1111 fork)
- [comfyui](/docs/container-images/comfyui/) — ComfyUI node-graph image/video generator
- [kohya-ss](/docs/container-images/kohya-ss/) — Kohya LoRA / fine-tune trainer

### LLM Training

- [axolotl](/docs/container-images/axolotl/) — Axolotl LLM fine-tuning framework
- [llamafactory](/docs/container-images/llamafactory/) — LLaMA-Factory GUI training
- [unsloth](/docs/container-images/unsloth/) — Unsloth 2–5× faster fine-tuning
- [unsloth-studio](/docs/container-images/unsloth-studio/) — Unsloth Studio (managed UI)

### LLM Serving & Inference

- [vllm](/docs/container-images/vllm/) — vLLM high-throughput inference server
- [sglang](/docs/container-images/sglang/) — SGLang structured-generation server
- [ollama](/docs/container-images/ollama/) — Ollama local LLM runner
- [text-gen-webui](/docs/container-images/text-gen-webui/) — oobabooga text-generation-webui
- [tei](/docs/container-images/tei/) — Hugging Face Text Embeddings Inference
- [triton](/docs/container-images/triton/) — NVIDIA Triton Inference Server

### ML Frameworks & Notebooks

- [pytorch](/docs/container-images/pytorch/) — PyTorch + Jupyter
- [tensorflow](/docs/container-images/tensorflow/) — TensorFlow + Jupyter (CUDA 11 and 12)
- [jupyterlab-gpu](/docs/container-images/jupyterlab-gpu/) — Bare JupyterLab on GPU
- [rapids](/docs/container-images/rapids/) — NVIDIA RAPIDS (cuDF, cuML)
- [tensorrt](/docs/container-images/tensorrt/) — NVIDIA TensorRT optimizer / runtime

### Speech & Audio

- [cloudtts](/docs/container-images/cloudtts/) — MOSS-TTS + Chatterbox TTS
- [whisperx](/docs/container-images/whisperx/) — WhisperX speech-to-text + diarization

### Science & HPC

- [alphafold](/docs/container-images/alphafold/) — AlphaFold protein structure prediction
- [gromacs](/docs/container-images/gromacs/) — GROMACS molecular dynamics
- [octave](/docs/container-images/octave/) — GNU Octave numerical computing

### Video, Graphics & Vision

- [cloudblenderrender](/docs/container-images/cloudblenderrender/) — Blender 4.4 GPU rendering
- [ffmpeg-gpu](/docs/container-images/ffmpeg-gpu/) — FFmpeg with NVENC/NVDEC
- [sam3](/docs/container-images/sam3/) — Meta Segment Anything Model 3

### Base

- [ubuntu-ssh-cuda](/docs/container-images/ubuntu-ssh-cuda/) — Bare Ubuntu + CUDA + SSH (BYO stack)

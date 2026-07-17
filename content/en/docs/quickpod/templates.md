---
title: Templates
weight: 30
description: "Podstack QuickPods 1-click template catalog — launch ComfyUI, Ollama, vLLM, Jupyter, PyTorch, and 20+ more GPU apps in one click, or save your own pod config as a reusable template."
keywords:
  - 1-click templates
  - GPU app templates
  - ComfyUI template
  - Ollama template
  - vLLM template
  - Jupyter template
  - PyTorch container
  - save pod template
  - launch template catalog
  - Podstack container images
---
# Templates

Templates turn a full pod configuration — image, ports, environment, resources — into a one-click launch. Podstack offers two kinds:

- **1-click templates (catalog)** — pre-built, GPU-ready apps maintained by Podstack (ComfyUI, Ollama, vLLM, Jupyter, and more). You pick one inside the launch wizard.
- **Your saved templates** — pod configurations you save yourself and reuse across your team. These live on the **Templates** page.

## Using a 1-click template

The Podstack catalog is browsed **inside the launch wizard**, on the **Choose a Template** step:

1. Go to **Pods** and click **Launch Pod**.
2. Pick a GPU on the **Instance Type** step (see [Launch a Pod](/docs/quickpod/launch-a-pod/)).
3. On the **Choose a Template** step, find your app. Filter with the **Search templates by name, image, GPU...** box or the **All Categories** dropdown. Templates are grouped into collapsible categories.
4. Click the template card. Its image, ports, environment variables, and startup command are applied, and you jump to the **Configure** step.
5. Adjust anything you like, then click **Launch Pod**.

<!-- screenshot: the "Choose a Template" step in the launch wizard, categories expanded -->
![The 1-click template catalog in the launch wizard](/images/quickpod/template-catalog.png)

Prefer to build from scratch? Click **Custom Configuration** at the top of the step instead.

## The 1-click catalog

Every image is GPU-ready, expects persistent storage at **`/data`**, exposes SSH on port 22, and runs its app on its native port. Each has its own reference page under [Container Images](/docs/container-images/) with ports and environment variables.

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
- [ubuntu-ssh-cuda](/docs/container-images/ubuntu-ssh-cuda/) — Bare Ubuntu + CUDA + SSH (bring your own stack)

> **JupyterHub login.** On images with JupyterHub, log in with any username and your Podstack API token (`psk_...`) as the password. Generate one at **Account > API Tokens**.

## Save your own template

Any configuration you build in the launch wizard can be saved for reuse:

1. In the launch wizard, get to the **Configure** step and set everything the way you want.
2. In the **Summary** panel, click **Save as Template**.
3. In the **Save as Template** dialog, enter a **Template Name**, an optional **Description**, and choose **Save to Project** (the template becomes available to that project's members).
4. Click **Save Template**.

Your saved templates then appear:

- On the **Templates** page (**My Templates**), and
- In the launch wizard under the **User Templates** category, tagged **User template**.

## Managing saved templates

The **Templates** page (titled **Launch Templates**) lists your saved pod and VM configurations as cards. Filter by project with the **All Projects** dropdown. Each card shows the name, description, image, resource chips, and tags.

Per-template actions:

- **Launch Pod** — opens the launch wizard pre-filled with this template, jumping straight to the Instance Type step.
- **Edit** (pencil) — opens the **Edit Template** dialog. You can change the **Docker Image**, **CPU Cores**, **Memory (GB)**, **GPU Type**, **GPU Count**, **Exposed Ports**, **Environment Variables**, **Startup Command**, and **Tags**. Click **Save Changes**.
- **Delete** (trash) — removes the template after confirmation.

To create a template from scratch, click **Create Template** on the Templates page — it opens the launch wizard, where you configure and then **Save as Template**.

> Editing or deleting a template does **not** affect pods already launched from it.

## Next steps

- [Launch a Pod](/docs/quickpod/launch-a-pod/) — the full launch flow.
- [Storage & Data](/docs/quickpod/storage-and-data/) — persist your models and outputs.
- [Scenarios & Walkthroughs](/docs/quickpod/scenarios/) — deploy ComfyUI, run Jupyter on an A100, and more.

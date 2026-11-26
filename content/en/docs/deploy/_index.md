---
title: Deploy
description: "Launch a ready-to-run app on a Podstack GPU. The app list is the live template catalog in the console."
weight: 47
aliases:
  - /docs/gpu-cloud/templates/
  - /docs/advanced/templates/
  - /docs/container-images/
  - /docs/container-images/a1111/
  - /docs/container-images/alphafold/
  - /docs/container-images/axolotl/
  - /docs/container-images/cloudblenderrender/
  - /docs/container-images/cloudtts/
  - /docs/container-images/comfyui/
  - /docs/container-images/ffmpeg-gpu/
  - /docs/container-images/gromacs/
  - /docs/container-images/jupyterlab-gpu/
  - /docs/container-images/kohya-ss/
  - /docs/container-images/llamafactory/
  - /docs/container-images/octave/
  - /docs/container-images/ollama/
  - /docs/container-images/pytorch/
  - /docs/container-images/rapids/
  - /docs/container-images/sam3/
  - /docs/container-images/sd-forge/
  - /docs/container-images/sglang/
  - /docs/container-images/tei/
  - /docs/container-images/tensorflow/
  - /docs/container-images/tensorrt/
  - /docs/container-images/text-gen-webui/
  - /docs/container-images/triton/
  - /docs/container-images/ubuntu-ssh-cuda/
  - /docs/container-images/unsloth/
  - /docs/container-images/unsloth-studio/
  - /docs/container-images/vllm/
  - /docs/container-images/whisperx/
keywords:
  - deploy
  - Jupyter
  - ComfyUI
---

# Deploy

[Deploy](https://podstack.ai/app/deploy) launches a ready-to-run app on a dedicated GPU. The app list is loaded live. These docs do not keep a second catalog.

The console and the site name apps such as JupyterLab, ComfyUI, vLLM, Axolotl, Ollama, and Open WebUI. Search and category filters on the page are the full list. Each card shows a minimum VRAM, a GPU count, and a container disk size when the template has them.

## Deploy an app

1. Add an [SSH key](/docs/account/ssh-keys/) if you do not have one.
2. Open the app and click **Deploy**.
3. Pick a GPU. The form offers `rtx_4090`, `l40s`, `a100_80gb`, and `h100_sxm`.
4. Pick an SSH key.

The app is an instance. It shows up under [Instances](/docs/gpu-cloud/instances/). It is billed per second from the hourly rate until you terminate it, the same way as any other GPU Cloud machine.

Running apps are listed from **View running apps** on the Deploy page.

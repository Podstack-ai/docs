---
title: cloudtts
weight: 50
---

# cloudtts — MOSS-TTS + Chatterbox TTS

Two best-in-class open TTS engines in one image: **MOSS-TTS** (OpenMOSS) and **Chatterbox TTS**. Runs each in its own conda env to sidestep dependency conflicts.

## Image tag

`docker.io/manvarharsh/cloudtts:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- **MOSS-TTS** in a Python 3.12 conda environment (with Gradio UI)
- **Chatterbox TTS** in a Python 3.11 conda environment (REST API)
- Flash Attention
- OpenSSH server
- No JupyterHub — interact via the TTS UIs or SSH

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 7860 | MOSS-TTS Gradio UI |
| 8000 | Chatterbox TTS API |

## Use cases

- Voice cloning and zero-shot TTS via MOSS-TTS
- Programmatic TTS via Chatterbox's REST API
- Comparing TTS engines side-by-side on the same hardware
- Audio dataset generation for fine-tuning

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_MOSS_TTS` | Start MOSS-TTS Gradio UI on port 7860 |
| `ENABLE_CHATTERBOX` | Start Chatterbox TTS server on port 8000 |
| `MOSS_TTS_PORT` | Override MOSS-TTS port |
| `CHATTERBOX_PORT` | Override Chatterbox port |
| `MOSS_TTS_EXTRA_ARGS` | Extra CLI args for MOSS-TTS |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Voice samples in `/data/voices/`, generated audio in `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

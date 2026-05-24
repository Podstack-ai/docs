---
title: unsloth-studio
weight: 23
---

# unsloth-studio — Unsloth managed UI

A managed web UI for Unsloth fine-tuning — config, launch, and monitor runs from the browser, no Python required. Built on top of the official `unsloth/unsloth:stable` image.

## Image tag

`docker.io/manvarharsh/unsloth-studio:cuda12`

## What's in this image

- Base: `unsloth/unsloth:stable` (upstream Unsloth image)
- Unsloth Studio web UI
- All Unsloth dependencies
- JupyterHub and Jupyter Notebook (port 8888)
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | JupyterHub / Unsloth Studio |
| 8888 | Jupyter Notebook |

## Use cases

- Point-and-click LoRA / QLoRA fine-tunes
- Browser-driven dataset prep and run management
- Quick iteration without writing training scripts
- Pair with the Unsloth notebook workflow on Podstack

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_UNSLOTH_STUDIO` | Start the Studio UI (defaults to `true`) |
| `PODSTACK_API_URL` | Backend URL for token validation |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. The Studio writes runs, configs, and outputs under `/data/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [unsloth](/docs/container-images/unsloth/) — CLI/notebook variant
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

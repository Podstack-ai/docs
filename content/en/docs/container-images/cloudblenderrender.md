---
title: cloudblenderrender
weight: 70
---

# cloudblenderrender — Blender 4.4 GPU rendering

**Blender 4.4 LTS** with **Cycles GPU rendering** enabled — interactive (via noVNC) or headless CLI renders over SSH.

## Image tag

`docker.io/manvarharsh/cloudblenderrender:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Blender 4.4 LTS with Cycles GPU (CUDA + OptiX)
- noVNC + x11vnc + Xvfb + openbox
- OpenSSH server
- No JupyterHub — use noVNC for the GUI or SSH for CLI

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 6080 | noVNC web desktop |

## Default workspace

```
/opt/blender/
├── projects/   # .blend files
├── output/     # rendered frames
└── scripts/    # Python render scripts
```

## Use cases

- Interactive Blender editing via the browser
- Headless batch rendering (`blender -b scene.blend -o //output/frame_##### -f 1`)
- Render farms with multiple pods
- Python-scripted procedural generation

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_VNC` | Enable noVNC web desktop |
| `VNC_PORT` | Override noVNC port (default 6080) |
| `VNC_RESOLUTION` | Display resolution (default `1920x1080`) |
| `VNC_PASSWORD` | Optional VNC password |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Put your `.blend` files under `/data/projects/` and render output to `/data/output/`. Use the [output-access workflow](/docs/container-images/#accessing-output-files-in-the-browser) to download finished frames from the browser.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

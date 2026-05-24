---
title: octave
weight: 62
---

# octave — GNU Octave with noVNC desktop

**GNU Octave** — open-source MATLAB-compatible numerical computing — running on a GPU with a noVNC web desktop for the GUI experience.

## Image tag

`docker.io/manvarharsh/octave:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- GNU Octave with Forge packages: `control`, `image`, `io`, `optim`, `signal`, `statistics`, `struct`
- gnuplot
- noVNC + x11vnc + Xvfb + openbox (web desktop)
- OpenSSH server
- No JupyterHub

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 6080 | noVNC web desktop |

## Use cases

- Running MATLAB-style code without a MATLAB license
- Signal processing, image processing, control-systems work
- Coursework that targets Octave
- CLI batch runs of `.m` files via SSH

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_VNC` | Enable noVNC web desktop |
| `VNC_PORT` | Override noVNC port (default 6080) |
| `VNC_RESOLUTION` | Display resolution (default `1920x1080`) |
| `VNC_PASSWORD` | Optional VNC password (empty = no auth) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Octave scripts and outputs persist here.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

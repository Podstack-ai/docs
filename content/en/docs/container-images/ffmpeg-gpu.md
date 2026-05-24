---
title: ffmpeg-gpu
weight: 71
---

# ffmpeg-gpu — FFmpeg with GPU encode / decode

A custom **FFmpeg** build with NVIDIA NVENC, NVDEC, and CUDA filters enabled. Drop-in `ffmpeg` CLI for hardware-accelerated video work.

## Image tag

`docker.io/manvarharsh/ffmpeg-gpu:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- FFmpeg built with `--enable-nvenc --enable-nvdec --enable-cuda-nvcc`
- nv-codec-headers
- Python 3.10 with `huggingface-hub` CLI for fetching assets
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | API / app port (if you wrap FFmpeg behind a service) |

## Use cases

- GPU-accelerated video transcoding (H.264, H.265, AV1, VP9)
- Real-time video pipelines (NVDEC → CUDA filter → NVENC)
- Batch encoding of large video archives
- Frame extraction for ML training datasets

## Quick test

```bash
ffmpeg -hwaccel cuda -i input.mp4 -c:v h264_nvenc -preset p5 output.mp4
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Input video under `/data/input/`, output under `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

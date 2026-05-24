---
title: whisperx
weight: 51
---

# whisperx — speech-to-text + diarization

**WhisperX** — OpenAI Whisper with word-level timestamps and speaker diarization. Faster than vanilla Whisper via `faster-whisper`'s CTranslate2 backend.

## Image tag

`docker.io/manvarharsh/whisperx:cuda12`

## What's in this image

- Base: `nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04`
- Python 3.10 (conda)
- WhisperX, faster-whisper, pyannote (diarization)
- ffmpeg
- OpenSSH server

## Default ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 8000 | API / app port |

## Use cases

- Transcribing long-form audio with word-level timestamps
- Speaker diarization (who-said-what)
- Subtitle / caption generation in many languages
- Bulk transcription of audio archives

## Environment variables

| Variable | Description |
|----------|-------------|
| `ENABLE_SSH` | Enable SSH server |
| `ENABLE_WHISPERX` | Start the WhisperX service |
| `WHISPERX_EXTRA_ARGS` | Extra CLI args |
| `HF_TOKEN` | Hugging Face token (required for pyannote diarization model access) |
| `SSH_PUBLIC_KEY` | Public key for SSH |

## Persistence

Mount at **`/data`**. Input audio in `/data/audio/`, output transcripts in `/data/output/`.

## See also

- [Conventions and shared environment variables](/docs/container-images/#conventions)
- [Accessing output files in the browser](/docs/container-images/#accessing-output-files-in-the-browser)

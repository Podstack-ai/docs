---
title: Inference
weight: 40
description: "Serve open-source LLMs on low-latency, OpenAI-compatible endpoints with API keys, per-token wallet billing, and autoscaling on the Podstack Inference Cloud."
keywords:
  - Podstack Inference Cloud
  - OpenAI-compatible API
  - open-source LLM inference
  - hosted LLM endpoint
  - chat completions API
  - per-token billing
  - LLM autoscaling
  - inference API key
---

# Inference

The **Podstack Inference Cloud** serves open-source models on **low-latency, OpenAI-compatible endpoints** with autoscaling. Browse a catalog of hosted models, generate an API key, and call them from any OpenAI SDK — no infrastructure to manage. Usage is metered per token and billed directly from your Podstack wallet.

If you already have code that talks to OpenAI, you can point it at Podstack by changing two things: the **base URL** and the **API key**.

## The endpoint

All requests go to the OpenAI-compatible gateway:

```
https://cloud.podstack.ai/infer/v1
```

Authenticate with a Podstack API key (prefix `psk_`) as a bearer token:

```
Authorization: Bearer psk_xxxxxxxxxxxxxxxxxxxx
```

## Quick example

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://cloud.podstack.ai/infer/v1",
    api_key="psk_xxxxxxxxxxxxxxxxxxxx",
)

resp = client.chat.completions.create(
    model="<MODEL_ID>",  # list real ids: podstack models list
    messages=[{"role": "user", "content": "Hello"}],
)
print(resp.choices[0].message.content)
```

> Model IDs are **not fixed** — the catalog is managed per deployment. Always pull a real ID from the catalog before hardcoding one. See [Models](/docs/inference/models/).

## When to use it

- You want to call **open-source models** (chat, code, embeddings, vision) without provisioning or scaling GPUs yourself.
- You want a **drop-in OpenAI replacement** — same SDK, same request/response shape, streaming included.
- You want **per-token, pay-as-you-go** pricing billed from a wallet, with usage analytics per API key.
- You are using `podstack code` (the CLI coding agent), which calls this same gateway.

For always-warm, dedicated serving or cold-start pay-per-GPU-second workloads (including video generation), see [Serverless Inference](/docs/inference/serverless/).

## What's supported

| Capability | Endpoint | Status |
|------------|----------|--------|
| Chat completions (streaming) | `POST /v1/chat/completions` | Available |
| Embeddings | `POST /v1/embeddings` | Available (self-hosted models) |
| List / describe models | `GET /v1/models`, `GET /v1/models/{id}` | Available |
| Pricing | `GET /v1/pricing` | Available (public) |
| Usage analytics | `GET /v1/usage/summary`, `GET /v1/usage/requests` | Available |
| Audio transcription | `POST /v1/audio/transcriptions` | Coming soon (returns `501`) |

## In this section

| Guide | Description |
|-------|-------------|
| [Quickstart](/docs/inference/quickstart/) | Get a key and make your first request with curl and the OpenAI SDK |
| [Models](/docs/inference/models/) | The model catalog and how to list real model IDs |
| [Authentication](/docs/inference/authentication/) | Create, use, limit, and revoke API keys |
| [API Reference](/docs/inference/api-reference/) | OpenAI-compatible routes, parameters, streaming, and errors |
| [Pricing & Usage](/docs/inference/pricing-and-usage/) | Per-token billing, the wallet, and usage tracking |
| [Playground](/docs/inference/playground/) | Test models interactively in the portal |
| [Serverless Inference](/docs/inference/serverless/) | Cold-start pay-per-use GPU inference |
| [FAQs](/docs/inference/faqs/) | Common questions |

## Next steps

- New here? Start with the [Quickstart](/docs/inference/quickstart/).
- Prefer the terminal? `podstack models list` prints the catalog — see the [CLI](/docs/cli/).

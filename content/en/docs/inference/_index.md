---
title: Inference
weight: 40
description: "Call Podstack models with an OpenAI-compatible API at https://api.podstack.ai/v1. Authenticate with a ps_live_ key. Inference is billed per token from a prepaid wallet."
keywords:
  - Podstack inference
  - OpenAI-compatible API
  - api.podstack.ai
  - ps_live_ key
  - chat completions API
  - per-token billing
  - podstack/kimi-k3
---

# Inference

Podstack serves models on an **OpenAI-compatible API**. Set the base URL to `https://api.podstack.ai/v1`, send a `ps_live_` API key, and set `model` to a catalog id such as `podstack/kimi-k3`.

Inference is billed **per token** from your prepaid wallet. There is no monthly or annual subscription.

## The endpoint

```
https://api.podstack.ai/v1
```

```
Authorization: Bearer ps_live_...
```

Create a key in the console under **API Keys**. The full key is shown once. See [Authentication](/docs/inference/authentication/).

## Quick example

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.podstack.ai/v1",
    api_key=os.environ["PODSTACK_API_KEY"],
)

resp = client.chat.completions.create(
    model="podstack/kimi-k3",
    messages=[{"role": "user", "content": "Hello"}],
)
print(resp.choices[0].message.content)
```

`podstack/kimi-k3` is an example id. Confirm it is still listed before you hardcode it. The live catalog is at [podstack.ai/app/models](https://podstack.ai/app/models) and at `GET /v1/models`. See [Models](/docs/inference/models/).

## What's supported

| Capability | Endpoint |
|------------|----------|
| Chat completions, including streaming | `POST /v1/chat/completions` |
| Embeddings | `POST /v1/embeddings` |
| Image generation | `POST /v1/images/generations` |
| Video generation | `POST /v1/videos` |
| List models (no key required) | `GET /v1/models` |

Live rates are on each model in the console and on [podstack.ai](https://podstack.ai/#pricing). India is shown in INR. Every other location is shown in USD. See [Pricing & Usage](/docs/inference/pricing-and-usage/).

## In this section

| Guide | Description |
|-------|-------------|
| [Quickstart](/docs/inference/quickstart/) | Create a key and send a chat completion |
| [Models](/docs/inference/models/) | How to read the live catalog |
| [Authentication](/docs/inference/authentication/) | `ps_live_` keys and access levels |
| [API Reference](/docs/inference/api-reference/) | Routes, streaming, and errors |
| [Pricing & Usage](/docs/inference/pricing-and-usage/) | Per-token billing and where to read prices |
| [Playground](/docs/inference/playground/) | Try a model in the console |
| [Serverless Inference](/docs/inference/serverless/) | The same hosted API, billed per token |
| [FAQs](/docs/inference/faqs/) | Common questions |

## Next steps

- New here? Start with the [Quickstart](/docs/inference/quickstart/).
- Browse models at [podstack.ai/app/models](https://podstack.ai/app/models).

---
title: Models
weight: 30
description: "Browse the Podstack Inference model catalog and list real model IDs from the CLI, the API, or the portal. Chat, code, embedding, and vision models."
keywords:
  - Podstack model catalog
  - list inference models
  - podstack models list
  - open-source LLM catalog
  - model id
  - embedding models
  - GET v1 models
---

# Models

The Podstack Inference Cloud hosts a catalog of open-source models served over the OpenAI-compatible API. The catalog is **managed per deployment and evolves over time**, so there is no fixed, hardcoded list of model IDs — always list the catalog and copy a real ID before you wire it into code.

## Model types

Each model has a task type:

| Type | Use it for | Endpoint |
|------|------------|----------|
| `text-generation` | Chat and code models | `POST /v1/chat/completions` |
| `embedding` | Vector embeddings for search / RAG | `POST /v1/embeddings` |
| `vision` | Multimodal (image + text) chat | `POST /v1/chat/completions` |
| `audio-transcription` | Speech-to-text (coming soon) | `POST /v1/audio/transcriptions` |

Models are served from one of several sources — self-hosted on Podstack GPUs (vLLM / Triton) or proxied to a partner provider — but this is transparent to you: the request and response shape is the same OpenAI contract in every case.

## List models from the CLI

The quickest way is the [Podstack CLI](/docs/cli/):

```bash
podstack models list
```

```
NAME                    CONTEXT   ID
...                     ...       ...
```

The **ID** column is what you pass as the `model` field in an API call. Add `--output json` for scripting:

```bash
podstack models list --output json
```

See the [CLI Models guide](/docs/cli/models/) for details.

## List models over the API

`GET /v1/models` returns an OpenAI-style list. It accepts either a Podstack account token or an inference API key (`psk_`) as a bearer token:

```bash
curl https://cloud.podstack.ai/infer/v1/models \
  -H "Authorization: Bearer $PODSTACK_API_KEY"
```

```json
{
  "object": "list",
  "data": [
    {
      "id": "...",
      "display_name": "...",
      "description": "...",
      "task_type": "text-generation",
      "context_length": 32768,
      "parameters_b": 8
    }
  ]
}
```

With the OpenAI SDK:

```python
for m in client.models.list().data:
    print(m.id)
```

Fetch a single model's details with `GET /v1/models/{id}`.

## Referencing a model

When you send a request, the `model` field is resolved against the catalog by, in order:

1. The model's catalog **ID**, or
2. Its **display name**, or
3. Its **Hugging Face repository ID** (for self-hosted models).

Only **enabled** models resolve — a disabled or unknown value returns `404 model_not_found`. Using the exact `id` from `GET /v1/models` is the most robust choice.

## Browse in the portal

The **Inference > Catalog** view in the portal shows every model with its display name, description, task type, context length, size, and per-token pricing. From there you can open the [Playground](/docs/inference/playground/) with a model preselected, or copy a ready-made curl / Python / JavaScript snippet.

## Requesting a new model

If a model you need isn't in the catalog, use **Request Model** in the portal (submit the Hugging Face model ID). The team evaluates requests and may add the model.

## Next steps

- [Quickstart](/docs/inference/quickstart/) — call a model end to end.
- [API Reference](/docs/inference/api-reference/) — request parameters and streaming.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — see each model's per-token rate.

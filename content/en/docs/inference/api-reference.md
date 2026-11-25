---
title: API Reference
weight: 50
description: "OpenAI-compatible API reference for Podstack: https://api.podstack.ai/v1, ps_live_ keys, chat completions, embeddings, images, and video."
keywords:
  - OpenAI-compatible API reference
  - chat completions endpoint
  - embeddings endpoint
  - api.podstack.ai
  - ps_live_ key
  - podstack/kimi-k3
---

# API Reference

The API follows the OpenAI contract. Official OpenAI SDKs work after you set the base URL and a Podstack key.

- **Base URL:** `https://api.podstack.ai/v1`
- **Auth:** `Authorization: Bearer ps_live_...` (see [Authentication](/docs/inference/authentication/))
- **Content type:** `application/json` for request bodies

There is no `/infer/v1` path. Keys that do not start with `ps_live_` are rejected.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/v1/chat/completions` | Key | Chat completions, streaming and non-streaming |
| `POST` | `/v1/embeddings` | Key | Embeddings |
| `POST` | `/v1/images/generations` | Key | Image generation |
| `POST` | `/v1/videos` | Key | Start a video generation |
| `GET` | `/v1/videos/{id}` | Key | Video job status |
| `GET` | `/v1/videos/{id}/content` | Key | Download a finished video |
| `GET` | `/v1/models` | Public | List models and their rates |
| `GET` | `/v1/models/{id}` | Public | One model's details |

`model` must be an id from that list. An unknown id is rejected before the request runs.

## Chat completions

`POST /v1/chat/completions`

`model` and `messages` are required. Standard OpenAI chat fields (`temperature`, `top_p`, `max_tokens`, `stop`, `tools`, `response_format`, `stream`, and the rest) are accepted. A model may ignore a field it does not implement.

```bash
curl https://api.podstack.ai/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "podstack/kimi-k3",
    "messages": [
      {"role": "system", "content": "You are concise."},
      {"role": "user", "content": "What is a vector database?"}
    ],
    "temperature": 0.3,
    "max_tokens": 300
  }'
```

A non-streaming response uses the OpenAI chat completion shape, including a `usage` object with `prompt_tokens` and `completion_tokens`. Those counts are what the per-token charge uses.

### Streaming

Set `"stream": true`. The body is `text/event-stream`: `data:` chunks, then `data: [DONE]`.

```python
stream = client.chat.completions.create(
    model="podstack/kimi-k3",
    messages=[{"role": "user", "content": "Stream me a limerick."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

```javascript
const stream = await client.chat.completions.create({
  model: "podstack/kimi-k3",
  messages: [{ role: "user", content: "Stream me a limerick." }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}
```

## Embeddings

```bash
curl https://api.podstack.ai/v1/embeddings \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<EMBEDDING_MODEL_ID>",
    "input": "The quick brown fox jumps over the lazy dog."
  }'
```

Use an embedding model id from `GET /v1/models`. Do not reuse a chat id.

## Images and video

Image generation is `POST /v1/images/generations` with `model`, `prompt`, and the usual OpenAI image fields (`n`, `size`).

Video generation is `POST /v1/videos` with `model` and `prompt`. Poll `GET /v1/videos/{id}` until `status` is `completed`, then download `GET /v1/videos/{id}/content`.

Copy a working sample from the model in the [console](https://podstack.ai/app/models). The snippet uses this base URL and `PODSTACK_API_KEY`.

## Models

- `GET /v1/models` returns the catalog. No API key is required.
- `GET /v1/models/{id}` returns one model.

See [Models](/docs/inference/models/).

## Errors

Podstack errors use this shape:

```json
{
  "error": {
    "message": "human-readable description"
  }
}
```

| HTTP | When |
|------|------|
| 400 | The body is not JSON, or `model` is missing from the catalog |
| 401 | The key is missing, revoked, or does not start with `ps_live_` |
| 402 | The wallet cannot cover the request |
| 403 | The key's access level does not allow the route, or the account is suspended |

A 402 on chat means the balance does not cover the hold taken before generation starts. Add credits, or lower `max_tokens`.

## Point an existing OpenAI app at Podstack

Keep the SDK. Change the base URL, the key, and the model id.

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
```

## Next steps

- [Authentication](/docs/inference/authentication/) — keys and access levels.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — where to read live rates.
- [FAQs](/docs/inference/faqs/).

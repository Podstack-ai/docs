---
title: API Reference
weight: 50
description: "OpenAI-compatible API reference for Podstack Inference: chat completions, embeddings, models, streaming (SSE), request parameters, and error codes."
keywords:
  - OpenAI-compatible API reference
  - chat completions endpoint
  - embeddings endpoint
  - streaming SSE
  - inference parameters
  - error codes
  - v1 chat completions
  - podstack inference API
---

# API Reference

The Podstack Inference Cloud implements the OpenAI API contract, so the OpenAI SDKs and any OpenAI-compatible tooling work unchanged once you set the base URL and key.

- **Base URL:** `https://cloud.podstack.ai/infer/v1`
- **Auth:** `Authorization: Bearer psk_...` (see [Authentication](/docs/inference/authentication/))
- **Content type:** `application/json` for request bodies

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/chat/completions` | Chat completions, streaming and non-streaming |
| `POST` | `/v1/embeddings` | Generate embeddings (self-hosted models) |
| `GET` | `/v1/models` | List available models |
| `GET` | `/v1/models/{id}` | Get a single model's details |
| `GET` | `/v1/pricing` | Per-token pricing (public, no auth) |
| `GET` | `/v1/usage/summary` | Aggregate usage for your account |
| `GET` | `/v1/usage/requests` | Per-request usage history |
| `POST` | `/v1/audio/transcriptions` | Audio transcription — **coming soon, returns `501`** |

## Chat completions

`POST /v1/chat/completions`

### Request parameters

The `model` field is required. The gateway is a faithful pass-through: standard OpenAI chat parameters are forwarded to the serving engine, so you can send any of them.

| Parameter | Type | Notes |
|-----------|------|-------|
| `model` | string | **Required.** A catalog ID, display name, or HF repo ID. See [Models](/docs/inference/models/). |
| `messages` | array | **Required.** `role` (`system` / `user` / `assistant`) + `content`. |
| `stream` | boolean | Stream tokens as SSE. Default `false`. |
| `stream_options` | object | e.g. `{"include_usage": true}` to get a final usage chunk. |
| `temperature` | number | Sampling temperature. |
| `top_p` | number | Nucleus sampling. |
| `max_tokens` | integer | Max tokens to generate. |
| `stop` | string / array | Stop sequence(s). |
| `frequency_penalty`, `presence_penalty` | number | Repetition controls. |
| `seed` | integer | Best-effort determinism. |
| `tools`, `tool_choice` | array / string | Function/tool calling (if the model supports it). |
| `response_format` | object | e.g. structured/JSON output (if the model supports it). |

> Parameters beyond `model` and `stream` are forwarded to and enforced by the serving engine — support and valid ranges depend on the specific model. If a model doesn't support a parameter, the upstream engine decides how to handle it.

### Non-streaming example

```bash
curl https://cloud.podstack.ai/infer/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [
      {"role": "system", "content": "You are concise."},
      {"role": "user", "content": "What is a vector database?"}
    ],
    "temperature": 0.3,
    "max_tokens": 300
  }'
```

Response (OpenAI shape):

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "<MODEL_ID>",
  "choices": [
    {
      "index": 0,
      "message": {"role": "assistant", "content": "..."},
      "finish_reason": "stop"
    }
  ],
  "usage": {"prompt_tokens": 24, "completion_tokens": 58, "total_tokens": 82}
}
```

### Streaming

Set `"stream": true`. The response is `text/event-stream` with `data:` chunks terminated by `data: [DONE]`. Each chunk carries a `choices[].delta`. Add `stream_options: {"include_usage": true}` to receive a final chunk with the `usage` totals.

Python:

```python
stream = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Stream me a limerick."}],
    stream=True,
    stream_options={"include_usage": True},
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

Node.js:

```javascript
const stream = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Stream me a limerick." }],
  stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}
```

**Reasoning models.** Models that emit thinking tokens expose them separately on the delta as `reasoning` / `reasoning_content`, so the visible answer in `delta.content` stays clean. A `finish_reason` of `"length"` means the response was truncated at `max_tokens` — raise the budget and retry if needed.

## Embeddings

`POST /v1/embeddings` (available for self-hosted embedding models).

```bash
curl https://cloud.podstack.ai/infer/v1/embeddings \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<EMBEDDING_MODEL_ID>",
    "input": "The quick brown fox jumps over the lazy dog."
  }'
```

```python
resp = client.embeddings.create(
    model="<EMBEDDING_MODEL_ID>",
    input=["first document", "second document"],
)
print(len(resp.data), len(resp.data[0].embedding))
```

List embedding models by filtering the catalog for `task_type == "embedding"` — see [Models](/docs/inference/models/).

## Models

- `GET /v1/models` → `{"object": "list", "data": [ ... ]}`
- `GET /v1/models/{id}` → a single model's details

See [Models](/docs/inference/models/) for the field list and how IDs resolve.

## Errors

Errors use the OpenAI-style nested envelope:

```json
{
  "error": {
    "message": "human-readable description",
    "type": "billing_error",
    "code": "insufficient_funds"
  }
}
```

Common codes:

| HTTP | `code` | Meaning |
|------|--------|---------|
| 400 | `model_not_found` | `model` missing, unknown, or disabled |
| 401 | `unauthorized` | Missing / invalid / expired key |
| 402 | `insufficient_funds` | Wallet balance is zero or negative |
| 429 | `rate_limit_exceeded` | Requests-per-minute limit hit |
| 429 | `tokens_limit_exceeded` | Tokens-per-minute limit hit |
| 429 | `concurrency_limit_exceeded` | Too many in-flight requests |
| 429 | `monthly_quota_exceeded` | Monthly token limit reached |
| 501 | `not_implemented` | Endpoint not yet available (e.g. audio transcription) |
| 503 | `billing_unavailable` / `pricing_unavailable` | Billing or pricing check failed — retry with backoff |
| 5xx | `upstream_error` | Transient serving-engine error — retry |

The `type` field is one of `invalid_request_error`, `auth_error`, `billing_error`, `rate_limit_error`, `not_implemented`, `upstream_error`, or `server_error`. Upstream provider errors are sanitized so the underlying provider is never leaked. On `429`, honor the `Retry-After` header.

## Scenarios

### 1. Swap an existing OpenAI app to Podstack

Change only the base URL and key — the rest of your code is untouched.

```python
# Before
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# After
client = OpenAI(
    base_url="https://cloud.podstack.ai/infer/v1",
    api_key=os.environ["PODSTACK_API_KEY"],
)
```

Then set `model` to a Podstack catalog ID (`podstack models list`).

### 2. Stream a chat completion

```python
stream = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Explain SSE in two sentences."}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)
```

### 3. Build a minimal RAG loop (embed + chat)

```python
# 1) Embed your documents and the query with an embedding model
docs = ["Podstack serves open models.", "Billing is per token from a wallet."]
emb = client.embeddings.create(model="<EMBEDDING_MODEL_ID>", input=docs)
query_vec = client.embeddings.create(
    model="<EMBEDDING_MODEL_ID>", input="How is inference billed?"
).data[0].embedding

# 2) Retrieve the most similar doc (your vector store / similarity search here),
#    then ground a chat model on it
context = docs[1]  # result of your retrieval step
answer = client.chat.completions.create(
    model="<CHAT_MODEL_ID>",
    messages=[
        {"role": "system", "content": f"Answer using only this context:\n{context}"},
        {"role": "user", "content": "How is inference billed?"},
    ],
)
print(answer.choices[0].message.content)
```

## Next steps

- [Authentication](/docs/inference/authentication/) — keys, limits, and headers.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — how tokens map to cost.
- [FAQs](/docs/inference/faqs/) — quick answers.

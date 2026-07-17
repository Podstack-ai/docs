---
title: FAQs
weight: 90
description: "Frequently asked questions about the Podstack Inference Cloud: base URL, model IDs, OpenAI compatibility, billing, streaming, rate limits, and keys."
keywords:
  - inference FAQ
  - OpenAI-compatible
  - base URL
  - model ids
  - per-token billing
  - rate limits
  - streaming
---

# FAQs

### What is the base URL and how do I authenticate?

The OpenAI-compatible base URL is `https://cloud.podstack.ai/infer/v1`. Authenticate with a Podstack API key (prefix `psk_`) sent as a bearer token: `Authorization: Bearer psk_...`. See [Authentication](/docs/inference/authentication/).

### Is it really OpenAI-compatible? Can I use the OpenAI SDK?

Yes. The API implements the OpenAI contract for chat completions and embeddings, so the official OpenAI Python and Node.js SDKs (and OpenAI-compatible tools) work once you set `base_url`/`baseURL` and `api_key`. Point them at the base URL above and use a Podstack model ID. See the [API Reference](/docs/inference/api-reference/).

### Which models are available and what model ID do I use?

The catalog is managed per deployment, so there is no fixed list — always list the current catalog and copy a real ID. Run `podstack models list`, call `GET /v1/models`, or browse **Inference > Catalog**. The `model` field accepts a catalog ID, display name, or (for self-hosted models) the Hugging Face repo ID. See [Models](/docs/inference/models/).

### How am I billed?

Per token — input plus output — at a per-model rate, deducted from your Podstack wallet. There's no subscription. A request against a zero-or-negative wallet returns `402 insufficient_funds`. Pricing is available at `GET /v1/pricing` and on each model's catalog card. See [Pricing & Usage](/docs/inference/pricing-and-usage/).

### Does it support streaming?

Yes. Set `"stream": true` to receive tokens over Server-Sent Events, terminated by `data: [DONE]`. Add `stream_options: {"include_usage": true}` for a final usage chunk. Reasoning models expose thinking tokens separately on the delta (`reasoning` / `reasoning_content`). See [API Reference](/docs/inference/api-reference/).

### Do you support embeddings and audio transcription?

Embeddings are supported at `POST /v1/embeddings` for self-hosted embedding models. Audio transcription (`POST /v1/audio/transcriptions`) is **not yet available** — it currently returns `501`.

### What parameters can I send to chat completions?

`model` and `messages` are required. Standard OpenAI parameters — `temperature`, `top_p`, `max_tokens`, `stop`, `frequency_penalty`, `presence_penalty`, `seed`, `tools`, `response_format`, `stream` — are forwarded to the serving engine, which enforces them. Actual support and valid ranges depend on the specific model. See [API Reference](/docs/inference/api-reference/).

### What are the rate limits?

Per API key: 60 requests/minute and 10 concurrent requests by default, with optional per-minute and monthly token limits. Exceeding a limit returns `429` with a specific `code` and a `Retry-After` header. Adjust limits on the API Keys page. See [Authentication](/docs/inference/authentication/).

### How do I move an existing OpenAI app to Podstack?

Change two things: set the base URL to `https://cloud.podstack.ai/infer/v1`, set the key to your `psk_` key, and use a Podstack model ID. Everything else in your OpenAI SDK code stays the same. See the swap scenario in the [API Reference](/docs/inference/api-reference/).

### How do I list models from the CLI?

`podstack models list` prints the catalog (add `--output json` for scripting). The CLI uses the same inference gateway. See the [CLI](/docs/cli/) and [CLI Models guide](/docs/cli/models/).

### What's the difference between Inference and Serverless Inference?

Standard Inference serves catalog models over the OpenAI-compatible API with autoscaling. [Serverless Inference](/docs/inference/serverless/) is a cold-start, pay-per-use GPU surface for chat, code, embedding, and video-generation models that sleep when idle — useful for bursty or low-volume workloads.

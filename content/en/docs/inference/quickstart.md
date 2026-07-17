---
title: Quickstart
weight: 20
description: "Get an API key and make your first Podstack Inference request in minutes with curl and the OpenAI Python and Node.js SDKs."
keywords:
  - inference quickstart
  - OpenAI-compatible API
  - first chat completion
  - OpenAI SDK base URL
  - podstack API key
  - curl chat completions
  - openai python podstack
---

# Quickstart

Make your first call to the Podstack Inference Cloud. You will get an API key, list the available models, and send a chat completion with **curl**, the **OpenAI Python SDK**, and the **OpenAI Node.js SDK** — all against the real endpoint.

## Prerequisites

- A Podstack account with a **funded wallet** (inference is billed per token; a request with a zero balance returns `402 insufficient_funds`).
- The endpoint base URL: `https://cloud.podstack.ai/infer/v1`

## Step 1 — Create an API key

1. Open the Podstack **Inference** portal and go to **API Keys**.
2. Click **Create API Key**, give it a name (e.g. `dev-laptop`), and pick an expiry.
3. **Copy the key immediately** — it's shown only once. Keys start with `psk_`.

Store it as an environment variable so you never hardcode it:

```bash
export PODSTACK_API_KEY="psk_xxxxxxxxxxxxxxxxxxxx"
```

See [Authentication](/docs/inference/authentication/) for key limits, rotation, and revocation.

## Step 2 — Find a model ID

The catalog is managed per deployment, so **model IDs are not fixed** — list them before you hardcode one.

From the terminal with the [CLI](/docs/cli/):

```bash
podstack models list
```

```
NAME                    CONTEXT   ID
...                     ...       ...
```

Or over HTTP:

```bash
curl https://cloud.podstack.ai/infer/v1/models \
  -H "Authorization: Bearer $PODSTACK_API_KEY"
```

Pick an `id` from the output and use it as the `model` value below. In the examples we write it as `<MODEL_ID>`.

## Step 3 — Send your first request

### curl

```bash
curl https://cloud.podstack.ai/infer/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### OpenAI Python SDK

```bash
pip install openai
```

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://cloud.podstack.ai/infer/v1",
    api_key="PODSTACK_API_KEY",  # or read os.environ["PODSTACK_API_KEY"]
)

resp = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in one sentence."},
    ],
    temperature=0.7,
    max_tokens=500,
)

print(resp.choices[0].message.content)
```

### OpenAI Node.js SDK

```bash
npm install openai
```

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://cloud.podstack.ai/infer/v1",
  apiKey: process.env.PODSTACK_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "<MODEL_ID>",
  messages: [{ role: "user", content: "Hello" }],
});

console.log(resp.choices[0].message.content);
```

## Step 4 — Stream the response

Set `stream: true` to receive tokens as they are generated (Server-Sent Events under the hood):

```python
stream = client.chat.completions.create(
    model="<MODEL_ID>",
    messages=[{"role": "user", "content": "Write a haiku about GPUs."}],
    stream=True,
)
for chunk in stream:
    delta = chunk.choices[0].delta.content
    if delta:
        print(delta, end="", flush=True)
```

## Step 5 — Check your usage

Every request is metered and billed from your wallet. See per-key request counts, token totals, and cost under **Inference > Usage** in the portal, or read [Pricing & Usage](/docs/inference/pricing-and-usage/).

## Next steps

- [API Reference](/docs/inference/api-reference/) — every supported route, parameter, and error code.
- [Models](/docs/inference/models/) — browse and filter the catalog.
- [Playground](/docs/inference/playground/) — try a model in the browser first.

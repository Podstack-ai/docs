---
title: Quickstart
weight: 20
description: "Create a ps_live_ API key and call https://podstack.ai/api/v1 with curl and the OpenAI Python and Node.js SDKs."
keywords:
  - inference quickstart
  - OpenAI-compatible API
  - podstack.ai/api/v1
  - ps_live_ key
  - podstack/kimi-k3
  - chat completions
---

# Quickstart

Send a chat completion to Podstack. You need a funded wallet — inference is billed per token — and a `ps_live_` API key.

Base URL:

```
https://podstack.ai/api/v1
```

## Step 1 — Create an API key

1. Open **API Keys** in the [Podstack console](https://podstack.ai/app/api-keys).
2. Click **Create key**, give it a name, and choose an access level. **Inference** is enough for chat, embeddings, images, and video.
3. **Copy the key immediately.** It is shown once and starts with `ps_live_`.

```bash
export PODSTACK_API_KEY="ps_live_..."
```

See [Authentication](/docs/inference/authentication/) for access levels and revocation.

## Step 2 — Pick a model id

The catalog changes. List it before you hardcode an id:

```bash
curl https://podstack.ai/api/v1/models
```

Or open [podstack.ai/app/models](https://podstack.ai/app/models). Copy the `id` field. The examples below use `podstack/kimi-k3`.

## Step 3 — Send a chat completion

### curl

```bash
curl https://podstack.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "podstack/kimi-k3",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### OpenAI Python SDK

```bash
pip install openai
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://podstack.ai/api/v1",
    api_key=os.environ["PODSTACK_API_KEY"],
)

resp = client.chat.completions.create(
    model="podstack/kimi-k3",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in one sentence."},
    ],
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
  baseURL: "https://podstack.ai/api/v1",
  apiKey: process.env.PODSTACK_API_KEY,
});

const resp = await client.chat.completions.create({
  model: "podstack/kimi-k3",
  messages: [{ role: "user", content: "Hello" }],
});

console.log(resp.choices[0].message.content);
```

## Step 4 — Stream the response

```python
stream = client.chat.completions.create(
    model="podstack/kimi-k3",
    messages=[{"role": "user", "content": "Write a haiku about GPUs."}],
    stream=True,
)
for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

## Step 5 — Read the price

Each request is billed per token from your wallet. Current rates are on the model in [podstack.ai/app/models](https://podstack.ai/app/models). India is shown in INR. Every other location is shown in USD. See [Pricing & Usage](/docs/inference/pricing-and-usage/).

## Next steps

- [API Reference](/docs/inference/api-reference/) — routes and errors.
- [Models](/docs/inference/models/) — how ids are chosen.
- [Playground](/docs/inference/playground/) — try a model in the browser.

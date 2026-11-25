---
title: Authentication
weight: 40
description: "Create and revoke Podstack API keys. Keys use the ps_live_ prefix and authenticate https://api.podstack.ai/v1 as a bearer token."
keywords:
  - inference API key
  - ps_live_ key
  - bearer token auth
  - create API key
  - revoke API key
  - PODSTACK_API_KEY
---

# Authentication

Requests that spend money or read your project use a **Podstack API key** as a bearer token. Keys start with **`ps_live_`**.

```
Authorization: Bearer ps_live_...
```

A key that does not start with `ps_live_` is rejected. `GET /v1/models` is public and does not need a key. Chat, embeddings, images, and video do.

## Create a key

1. Open **API Keys** in the [console](https://podstack.ai/app/api-keys).
2. Click **Create key**.
3. Enter a name and an access level:
   - **Full access** — project admins and owners.
   - **Read only** — `GET` requests.
   - **Jobs** — jobs and secrets, plus public reads.
   - **Functions & endpoints** — functions and endpoints, plus public reads.
   - **Inference** — chat, images, embeddings, models, and video.
4. **Copy the key now.** It is not shown again.

Store it in the environment:

```bash
export PODSTACK_API_KEY="ps_live_..."
```

The same variable is what the OpenAI SDK examples in these docs read. Viewers cannot create keys. Members cannot create a full-access key.

## Call the API

```bash
curl https://api.podstack.ai/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "podstack/kimi-k3",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.podstack.ai/v1",
    api_key=os.environ["PODSTACK_API_KEY"],
)
```

A key is bound to the project where you created it. Usage is billed to that project's wallet.

## Revoke a key

On **API Keys**, choose **Revoke** and confirm. The key stops working on the next request.

## Security

1. Call the API from your backend. Do not put a `ps_live_` key in browser or mobile code.
2. Keep the key in an environment variable or a secret store.
3. Use a separate key per environment so you can revoke one without stopping the others.
4. Prefer the **Inference** access level for an app that only calls models.

## Troubleshooting

**401 Invalid API key** — the key is missing, mistyped, or revoked. The value must start with `ps_live_` and the header must be `Authorization: Bearer`.

**402** — the project wallet cannot cover the request. Add credits in Billing. For a chat call, a lower `max_tokens` reduces the amount held before the request starts.

**403** — the key's access level does not allow this route, or the account is suspended.

## Next steps

- [API Reference](/docs/inference/api-reference/) — routes and error shape.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — how tokens are billed.

---
title: API keys
description: "Create a ps_live_ Podstack API key and choose Full, Read only, Jobs, Functions and endpoints, or Inference."
weight: 20
keywords:
  - ps_live_
  - API key
---

# API keys

Keys for the Podstack API start with `ps_live_`. Create one at [API Keys](https://podstack.ai/app/api-keys).

1. Click **Create key**.
2. Name it (up to 60 characters).
3. Choose an access level:
   - **Full** — any route. Only owners and admins can create this. A full key stops working as full access if its creator is no longer an owner or admin.
   - **Read only** — `GET` only.
   - **Jobs** — jobs and secrets, plus public reads.
   - **Functions & endpoints** — functions and endpoints, plus public reads.
   - **Inference** — chat, images, embeddings, models, video, and operations.
4. Copy the key. It is shown once.

```bash
export PODSTACK_API_KEY="ps_live_..."
```

A key is bound to the project where you created it. Spend is billed to that project's wallet. Viewers cannot create keys. Members cannot create a full-access key.

Send it as a bearer token:

```bash
curl https://podstack.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"podstack/kimi-k3","messages":[{"role":"user","content":"Hello"}]}'
```

`GET /v1/models`, `GET /v1/pricing`, `GET /v1/gpu-types`, `GET /v1/templates`, and `GET /v1/environments` are public.

Revoke a key on the same page. The next request with that key fails.

More on calling models: [Inference authentication](/docs/inference/authentication/).

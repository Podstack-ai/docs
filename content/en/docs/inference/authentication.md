---
title: Authentication
weight: 40
description: "Create, use, rate-limit, and revoke Podstack Inference API keys. Bearer-token auth with psk_ keys for OpenAI-compatible requests."
keywords:
  - inference API key
  - psk_ key
  - bearer token auth
  - create API key
  - revoke API key
  - API key rate limits
  - authorization header
---

# Authentication

Every request to the Podstack Inference Cloud is authenticated with a **Podstack API key** sent as a bearer token. Keys are prefixed **`psk_`**.

```
Authorization: Bearer psk_xxxxxxxxxxxxxxxxxxxx
```

Only the `Bearer` scheme is accepted — there is no `x-api-key` header. A missing or empty token returns `401`.

## Create an API key

1. Open the Podstack **Inference** portal and go to **API Keys**.
2. Click **Create API Key** and enter a descriptive name (e.g. `production-app`).
3. Choose an expiry: **Never, 7 days, 30 days, 90 days, or 1 year**.
4. Click **Create**, then **copy the key immediately** — the full secret is shown only once.

You can hold up to **5 API keys** at a time. Revoke an old one to create another.

> The same `psk_` key authenticates the Podstack CLI (`podstack code`, `podstack models`). You do not need a separate credential for the CLI.

## Use the key

Store it in an environment variable and never commit it:

```bash
export PODSTACK_API_KEY="psk_xxxxxxxxxxxxxxxxxxxx"
```

### curl

```bash
curl https://cloud.podstack.ai/infer/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<MODEL_ID>",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### OpenAI SDK (Python)

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://cloud.podstack.ai/infer/v1",
    api_key=os.environ["PODSTACK_API_KEY"],
)
```

### Python requests

```python
import os, requests

headers = {
    "Authorization": f"Bearer {os.environ['PODSTACK_API_KEY']}",
    "Content-Type": "application/json",
}
resp = requests.post(
    "https://cloud.podstack.ai/infer/v1/chat/completions",
    headers=headers,
    json={"model": "<MODEL_ID>", "messages": [{"role": "user", "content": "Hi"}]},
)
```

## Scoping requests to a project

To attribute usage and billing to a specific project, add the `X-Project-ID` header. It overrides the project encoded in the token:

```bash
curl https://cloud.podstack.ai/infer/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "X-Project-ID: <PROJECT_ID>" \
  -H "Content-Type: application/json" \
  -d '{ "model": "<MODEL_ID>", "messages": [{"role":"user","content":"Hi"}] }'
```

## Per-key limits

Each key carries independent limits, editable from the API Keys page:

| Limit | Default | Behavior when exceeded |
|-------|---------|------------------------|
| Requests per minute | 60 | `429 rate_limit_exceeded` |
| Max concurrency | 10 | `429 concurrency_limit_exceeded` |
| Tokens per minute | Unlimited | `429 tokens_limit_exceeded` |
| Monthly token limit | Unlimited | `429 monthly_quota_exceeded` |

Rate-limited responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` headers — respect `Retry-After` and back off exponentially. Two other per-key toggles are available: **Store request data** and **Response cache** (cache hits are served for free and don't count against your limits).

## Revoke a key

1. Find the key in the **API Keys** list.
2. Click **Delete** and confirm.
3. The key is invalidated immediately — any request using it stops working on the next call.

## Security best practices

1. **Never ship keys in client-side code.** Call the API from a backend and proxy requests.
2. **Use environment variables**, not hardcoded strings.
3. **Use separate keys** for development, CI, and production so you can revoke one without disrupting the others.
4. **Rotate periodically** — create a new key, roll it out, then delete the old one.
5. **Set a monthly token limit** on each key as a spend guardrail.

## Troubleshooting

**401 Unauthorized** — the key is missing, mistyped, expired, or revoked. Confirm the `Bearer ` prefix and that there's no stray whitespace.

**402 insufficient_funds** — your wallet balance is at or below zero. Top up under [Pricing & Usage](/docs/inference/pricing-and-usage/).

**429 Too Many Requests** — you hit a rate or quota limit. Check the `code` field (`rate_limit_exceeded`, `tokens_limit_exceeded`, `concurrency_limit_exceeded`, or `monthly_quota_exceeded`) and back off using `Retry-After`.

## Next steps

- [API Reference](/docs/inference/api-reference/) — full error format and route details.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — the wallet and usage analytics.

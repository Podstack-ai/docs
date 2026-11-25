---
title: API Tokens
weight: 30
description: "Create Podstack API keys (ps_live_) for the API, CLI, and SDK. The key is shown once. Revoke it from API Keys."
keywords:
  - Podstack API key
  - ps_live_ key
  - PODSTACK_API_KEY
  - API key GPU cloud
  - programmatic access
---

# API Tokens

API keys let scripts, CI, and the OpenAI-compatible API act as your project. Every key starts with `ps_live_` and is billed to the project where you created it.

## Create a key

1. Open **API Keys** in the [console](https://podstack.ai/app/api-keys).
2. Choose **Create key**.
3. Enter a name and an access level (full, read only, jobs, functions and endpoints, or inference).
4. **Copy the key now.** It starts with `ps_live_` and is shown only once.

Viewers cannot create keys. Only project admins and owners can create a full-access key.

## Use it

```bash
export PODSTACK_API_KEY="ps_live_..."

curl https://api.podstack.ai/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"podstack/kimi-k3","messages":[{"role":"user","content":"Hello"}]}'
```

Listing models does not require a key:

```bash
curl https://api.podstack.ai/v1/models
```

Details, access levels, and errors: [Inference authentication](/docs/inference/authentication/).

## Revoke a key

On **API Keys**, choose **Revoke**. The key stops working on the next request. If you lose the secret, revoke it and create another. It cannot be displayed again.

## Related

- [Inference authentication](/docs/inference/authentication/)
- [CLI authentication](/docs/cli/authentication/)
- [Settings](/docs/account/settings/)

---
aliases:
  - /docs/advanced/serverless-gpu/
  - /docs/cli/models/
title: Serverless Inference
weight: 80
description: "Podstack serverless inference is the OpenAI-compatible API at https://api.podstack.ai/v1. You do not manage GPUs. Usage is billed per token from the prepaid wallet."
keywords:
  - serverless inference
  - OpenAI-compatible API
  - per-token billing
  - api.podstack.ai
  - ps_live_ key
---

# Serverless Inference

Serverless inference is the hosted model API. You do not launch a GPU for it. Send an OpenAI-compatible request to `https://api.podstack.ai/v1` and Podstack serves the model. Usage is billed **per token** from your prepaid wallet.

There is one base URL. There is no separate inference host and no `/infer/v1` path.

```bash
curl https://api.podstack.ai/v1/chat/completions \
  -H "Authorization: Bearer $PODSTACK_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "podstack/kimi-k3",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true
  }'
```

`PODSTACK_API_KEY` is a `ps_live_` key from **API Keys**. Browse models and try them in the console at [podstack.ai/app/inference](https://podstack.ai/app/inference).

## Next steps

- [Quickstart](/docs/inference/quickstart/) — first request.
- [Models](/docs/inference/models/) — live ids and rates.
- [Authentication](/docs/inference/authentication/) — create the key.

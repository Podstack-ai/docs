---
title: FAQs
weight: 90
description: "FAQs for the Podstack inference API: base URL https://api.podstack.ai/v1, ps_live_ keys, model ids, and per-token billing."
keywords:
  - inference FAQ
  - OpenAI-compatible
  - api.podstack.ai
  - ps_live_ key
  - per-token billing
---

# FAQs

### What is the base URL and how do I authenticate?

The base URL is `https://api.podstack.ai/v1`. Send `Authorization: Bearer ps_live_...`. See [Authentication](/docs/inference/authentication/).

### Can I use the OpenAI SDK?

Yes. Set `base_url` / `baseURL` to `https://api.podstack.ai/v1`, set the key to your `ps_live_` key, and set `model` to a Podstack id such as `podstack/kimi-k3`. See the [API Reference](/docs/inference/api-reference/).

### Which model id do I use?

Take it from [podstack.ai/app/models](https://podstack.ai/app/models) or from `GET https://api.podstack.ai/v1/models`. The catalog is not a fixed list in these docs. See [Models](/docs/inference/models/).

### How am I billed?

Per token, from your prepaid wallet. There is no monthly or annual subscription. A request the wallet cannot cover returns `402`. Live rates are on the model card. India is shown in INR and every other location in USD. See [Pricing & Usage](/docs/inference/pricing-and-usage/).

### Does it support streaming?

Yes. Set `"stream": true` on `POST /v1/chat/completions`. See the [API Reference](/docs/inference/api-reference/).

### Do you support embeddings, images, and video?

Yes. `POST /v1/embeddings`, `POST /v1/images/generations`, and `POST /v1/videos`. Use a model id of that kind from the catalog.

### What if my old base URL or key no longer works?

Older docs used a different host and a different key prefix. The API accepts `https://api.podstack.ai/v1` and `ps_live_` keys only. Create a new key under **API Keys**.

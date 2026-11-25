---
title: Models
weight: 30
description: "Find Podstack model ids. The live catalog is at podstack.ai/app/models and GET https://api.podstack.ai/v1/models. Example id: podstack/kimi-k3."
keywords:
  - Podstack model catalog
  - list inference models
  - podstack/kimi-k3
  - model id
  - GET v1 models
---

# Models

Model ids are not a fixed list in these docs. Read them from the live catalog, then pass the `id` as `model`.

An example id is `podstack/kimi-k3`. Check that it is still listed before you ship it in code.

## In the console

Open [podstack.ai/app/models](https://podstack.ai/app/models) or [podstack.ai/app/inference](https://podstack.ai/app/inference). Each card shows the id and the current rate. Prices are in **INR** when your location is India and in **USD** everywhere else. Set the location under **Settings**.

## Over the API

`GET /v1/models` is public:

```bash
curl https://api.podstack.ai/v1/models
```

Use the `id` string from `data[]` as the `model` field. One model is `GET /v1/models/{id}`.

```python
for m in client.models.list().data:
    print(m.id)
```

An id that is not in the catalog is rejected with `400` and the request is not billed.

## Rates

Do not copy prices out of this documentation. The console and `GET /v1/models` are the source of truth. A model may be priced per million input and output tokens, per image, or per second of video. See [Pricing & Usage](/docs/inference/pricing-and-usage/).

## Next steps

- [Quickstart](/docs/inference/quickstart/) — call a model.
- [API Reference](/docs/inference/api-reference/) — request fields and streaming.
- [Playground](/docs/inference/playground/) — try a model in the browser.

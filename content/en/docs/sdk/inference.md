---
title: SDK inference
weight: 90
description: "Chat, streaming chat, and embeddings on https://podstack.ai/api/v1. Each call needs confirm=True because it spends wallet credits."
keywords:
  - chat.completions
  - chat.stream
  - embeddings
---

# SDK inference

> Releasing soon: `pip install "podstack>=1.8.0"`

Chat, streaming, and embeddings go to `https://podstack.ai/api/v1`. Each of those calls spends wallet credits, so each one needs `confirm=True`. `dry_run=True` returns the JSON and sends nothing.

Model ids come from `client.models.list()` or from [Models](https://podstack.ai/app/models). A 404 for one model id is `NotFoundError`, not `NotAvailableYet`.

```python
import os
from podstack import DryRun, Podstack

with Podstack() as client:
    model = os.environ.get("PODSTACK_MODEL") or client.models.list()[0].id
    embed_model = os.environ.get("PODSTACK_EMBED_MODEL") or model
    messages = [{"role": "user", "content": "Say hello in one sentence."}]

    print(client.chat.completions(model=model, messages=messages, dry_run=True).to_dict())

    completion = client.chat.completions(model=model, messages=messages, confirm=True)
    if not isinstance(completion, DryRun):
        print(completion.content)

    stream = client.chat.stream(model=model, messages=messages, confirm=True)
    if not isinstance(stream, DryRun):
        for chunk in stream:
            print(chunk.content, end="", flush=True)
        print()

    vectors = client.embeddings.create(model=embed_model, input="hello", confirm=True)
    if not isinstance(vectors, DryRun) and vectors.data:
        print("embedding dims", len(vectors.data[0].get("embedding", [])))
```

Image generation is `client.images.generate(...)` and also needs `confirm=True`. Use a model id the models list marks for that modality.

The OpenAI-compatible HTTP API used by other clients is documented on [Inference](/docs/inference/quickstart/). This page is the `podstack` package.

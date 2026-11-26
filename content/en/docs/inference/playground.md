---
title: Playground
weight: 70
description: "Try Podstack models in the console at podstack.ai/app/models. The playground uses your signed-in session. API snippets call https://podstack.ai/api/v1 with a ps_live_ key."
keywords:
  - inference playground
  - try a model
  - podstack.ai models
  - streaming chat
---

# Playground

The console playground lets you try a model before you write a client. It runs as your signed-in session and bills the project wallet the same way an API call does.

## Open it

1. Sign in at [podstack.ai](https://podstack.ai).
2. Open [Models](https://podstack.ai/app/models) and choose a model, or start from [Inference](https://podstack.ai/app/inference).
3. Use the playground on that model. Chat models stream a reply. Image and video models take a prompt and return media.

You do not paste an API key into the playground. The session is enough. To call the same model from code, create a `ps_live_` key and use the snippet on the model page. Those snippets use `https://podstack.ai/api/v1` and `PODSTACK_API_KEY`.

## What you can compare

The inference catalog lets you select two to four models of the same kind and open them together. Rates on the cards are the live rates: INR in India, USD elsewhere.

## Next steps

- [Quickstart](/docs/inference/quickstart/) — the same call from curl or an OpenAI SDK.
- [API Reference](/docs/inference/api-reference/) — fields beyond the playground controls.
- [Pricing & Usage](/docs/inference/pricing-and-usage/) — how the turn is billed.

---
title: Pricing & Usage
weight: 60
description: "Podstack inference is billed per token from a prepaid wallet. Live prices are on podstack.ai, in INR for India and USD elsewhere."
keywords:
  - per-token billing
  - inference pricing
  - prepaid wallet
  - INR USD pricing
  - podstack.ai pricing
---

# Pricing & Usage

Inference is **billed per token** from your **prepaid wallet**. There is no monthly or annual subscription and no separate inference plan.

GPU time, jobs, and extra disk are billed separately. See [Billing](/docs/billing/).

## Where to read prices

Rates change, and they are not listed in these docs.

- Model rates: [podstack.ai/app/models](https://podstack.ai/app/models) and `GET https://podstack.ai/api/v1/models`
- GPU and platform pricing: [podstack.ai/#pricing](https://podstack.ai/#pricing)

Prices are shown in **INR** for India and in **USD** for every other location. A signed-in user sets that location in **Settings**. Until they do, Podstack uses the country of the connection.

Each model card shows the rate that applies to it: input and output per million tokens, per image, or per second of video. Use that card. Do not hardcode a rate from an old example.

## How a chat request is billed

1. The wallet must be able to cover the request before it starts. If it cannot, the API returns `402` and nothing is generated.
2. The response `usage` object reports `prompt_tokens` and `completion_tokens`.
3. The charge is those tokens times the model's current input and output rates, deducted from the project wallet.

Image and video models use the rate shown on their card, not the chat token rate.

## The wallet

Add credits in **Billing** before you call the API. A project at zero credits cannot start a new request. Running out mid-flight stops further calls until you add credits.

## Controlling spend

- Use a smaller model when the quality is enough. Compare cards in the console.
- Set `max_tokens` so a single completion cannot run away.
- Give production apps an **Inference** key, and revoke it when the app is retired. See [Authentication](/docs/inference/authentication/).

## Next steps

- [Models](/docs/inference/models/) — how to copy an id.
- [API Reference](/docs/inference/api-reference/) — the `usage` object and `402`.
- [Wallet](/docs/billing/wallet/) — the prepaid balance.

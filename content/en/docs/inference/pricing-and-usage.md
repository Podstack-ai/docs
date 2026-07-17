---
title: Pricing & Usage
weight: 60
description: "How Podstack Inference bills per token from your wallet, how to read the pricing endpoint, and how to track requests, tokens, latency, and cost."
keywords:
  - per-token billing
  - inference pricing
  - wallet balance
  - usage analytics
  - v1 pricing
  - token cost
  - inference usage tracking
---

# Pricing & Usage

Podstack Inference is **pay-as-you-go, billed per token** and deducted directly from your Podstack **wallet** — there's no subscription and no separate invoicing step. You pay for the input (prompt) and output (completion) tokens you actually use, at a per-model rate.

## How billing works

1. **Pre-request check.** Before a request runs, the gateway verifies your wallet has a positive balance. If it's zero or negative, the request returns `402 insufficient_funds` and nothing is charged.
2. **Token counting.** The serving engine reports `prompt_tokens` and `completion_tokens` in the response `usage` object. Those counts drive the charge.
3. **Cost = tokens x per-model rate.** Each model has an input rate and an output rate, priced per **1M tokens** (in INR by default).
4. **Wallet debit.** The computed cost is deducted from your wallet, attributed to the request and model.

**Cache hits are free.** If you enable the per-key response cache and a request is served from cache, it is recorded with zero cost and doesn't count against your rate or token limits.

## Check pricing

Pricing is available from a public endpoint (no auth required):

```bash
curl https://cloud.podstack.ai/infer/v1/pricing
```

```json
{
  "models": [
    { "model": "...", "input_per_1m": "...", "output_per_1m": "...", "currency": "INR" }
  ]
}
```

You can also see each model's input/output rate on its card in the **Inference > Catalog** view. See [Models](/docs/inference/models/).

## The wallet

Your wallet balance funds all inference usage. In the portal:

- The **Usage** view shows your current balance (in ₹) with a **Top up** button and a low-balance banner.
- Top-ups are processed through the portal (card/UPI via Razorpay, or PayPal), with preset amounts and a minimum top-up.

Keep a buffer above zero — a wallet at or below zero blocks new requests with `402 insufficient_funds`.

## Usage analytics

Track spend and performance under **Inference > Usage**, or over the API.

### Summary

`GET /v1/usage/summary` returns aggregate metrics:

- `total_requests`, `cached_requests`
- `total_tokens`, `prompt_tokens`, `completion_tokens`
- `total_cost`
- `avg_latency_ms`, `avg_ttft_ms` (time to first token)

### Per-request history

`GET /v1/usage/requests` (supports `limit` / `offset`) returns individual requests with time, model, input/output tokens, cost, latency, and status (including whether a response was a cache hit).

```bash
curl "https://cloud.podstack.ai/infer/v1/usage/requests?limit=20" \
  -H "Authorization: Bearer $PODSTACK_API_KEY"
```

Use these to attribute spend across teams and keys, spot runaway clients, and pick the right model for your latency and cost budget.

## Controlling spend

- **Set a monthly token limit per key** so a single client can't overspend. See [Authentication](/docs/inference/authentication/).
- **Enable the response cache** on keys with repetitive prompts — cache hits are free.
- **Prefer smaller models** where quality allows; the per-token rate scales with model size.
- **Cap `max_tokens`** to bound the output (and cost) of each request.

## Next steps

- [Authentication](/docs/inference/authentication/) — per-key limits and guardrails.
- [Models](/docs/inference/models/) — per-model rates and sizes.
- [API Reference](/docs/inference/api-reference/) — the `usage` object and error codes.

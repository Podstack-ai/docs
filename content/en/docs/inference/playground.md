---
title: Playground
weight: 70
description: "Test Podstack Inference models interactively in the portal: streaming chat, temperature and max-token controls, live token usage and cost, and copy-ready code."
keywords:
  - inference playground
  - test LLM in browser
  - streaming chat playground
  - temperature max tokens
  - reasoning tokens
  - copy code snippet
  - prompt engineering
---

# Playground

The Playground lets you test models interactively in the browser before writing any integration code. It streams responses in real time and shows the exact request and cost for each turn.

## Open the Playground

1. Go to **Inference > Playground** in the portal (or click **Try in Playground** from a model's card in the [Catalog](/docs/inference/models/)).
2. Select a model.
3. Type a message and send.

You can authenticate the Playground with your signed-in session or by pasting a `psk_` API key.

## What you can do

### Streaming chat

Responses stream token by token over Server-Sent Events, exactly like `stream: true` in the API. For **reasoning models**, thinking tokens are shown in a separate, collapsible **Reasoning** section so the final answer stays clean.

### Parameter controls

The Playground exposes the two most-used sampling controls:

| Parameter | Range | Default |
|-----------|-------|---------|
| Temperature | 0.0 – 2.0 | 0.7 |
| Max tokens | 1 – model max | 4096 |

If a response stops because it hit the token limit (`finish_reason: "length"`), the Playground flags it as **truncated** and offers a one-click retry with a larger budget.

### Live usage and cost

Each turn reports the input and output tokens consumed and the per-turn cost, computed from the [pricing endpoint](/docs/inference/pricing-and-usage/). This is real usage — Playground requests are billed from your wallet like any other request.

### Inspector: copy-ready code

An Inspector panel shows the **Request** and **Response** payloads and a **Code** tab with ready-to-paste **curl**, **Python**, and **JavaScript** snippets for the current model and settings — a fast way to move from experimenting to integrating.

## Use it for

- **Prompt engineering** — iterate on a system prompt and see results immediately.
- **Model evaluation** — send the same prompt to different models and compare quality, speed, and cost.
- **Quick prototyping** — confirm a model handles your domain before writing code, then copy the snippet from the Inspector.

## Next steps

- [Quickstart](/docs/inference/quickstart/) — take a Playground prompt into code.
- [API Reference](/docs/inference/api-reference/) — the full parameter set beyond temperature and max tokens.
- [Serverless Inference](/docs/inference/serverless/) — a dedicated playground for cold-start GPU models, including video generation.

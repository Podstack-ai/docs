---
title: Serverless Inference
description: "Cold-start GPU inference for chat, code, embedding, and video-generation models. Pay only for actual usage with per-token billing."
keywords:
  - serverless GPU
  - serverless inference
  - LLM inference
  - video generation
  - vllm-omni
  - GPU dashboard
---

# Serverless Inference

Serverless Inference (internally **Podvirt**) is Podstack's pay-per-use GPU inference surface. Models cold-start on demand, run for the duration of your requests, and sleep when idle — you only pay for the GPU seconds you actually consume.

Find it under **Inference > Serverless** in the sidebar. The feature is gated by `REACT_APP_ENABLE_PODVIRT_INFERENCE`.

## Model Catalog

The catalog (`/inference/serverless`) lists every serverless-enabled model with:

- Vendor and display name
- Type — **chat**, **code**, **embedding**, or **video-generation**
- Token usage bar (used vs. plan limit, color-coded green → yellow → red)
- API snippet to call the model from your code

Filter the catalog by category (chat / code / embedding / video-generation) or search by name, vendor, or type.

## Chat Playground

For chat- and code-type models, click **Chat** to open a streaming playground (`/inference/serverless/:id/chat`):

- Token-streamed responses
- Per-conversation **chat history** (sidebar lists prior sessions)
- Configurable **system prompt**
- JSON tab showing the exact request/response payload sent to the API — useful for porting prompts into your own code
- **Stop** button cancels in-flight generation

### Chain-of-Thought Display

Models that emit `<think>...</think>` reasoning blocks have those segments rendered separately from the user-visible answer. The clean answer is what's saved to chat history; the think block is shown collapsed for inspection.

### Session Affinity

Chat sessions are pinned to a backing GPU instance via the `X-Podvirt-Session-Id` header. This keeps the KV cache warm across messages in the same conversation, reducing per-message latency.

## Video Generation

Video-generation models have a dedicated **Video** view (`/inference/serverless/:id/video`) with a prompt input and embedded player. The frame goes through the same serverless GPU lifecycle — first generation cold-starts the model, subsequent generations reuse the warm instance.

The underlying engine is **vllm-omni**, a multimodal extension supporting video and audio outputs alongside text.

## API Access

Every model exposes a chat-completions-style endpoint:

```bash
curl -X POST https://inference.podstack.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "MODEL_ID",
    "messages": [{"role": "user", "content": "Hello"}],
    "stream": true
  }'
```

Streaming, system prompts, temperature, max tokens, and stop sequences all follow the OpenAI chat-completions contract.

Generate API keys at **Inference > API Keys**.

## GPU Dashboard

The GPU dashboard (`/inference/gpu-dashboard`) shows fleet-wide health and economics:

- **Per-model status**: Active / Warming Up / Sleeping / Cold / Failed, plus GPU type, memory, total requests, and startup duration
- **Last 1 hour and last 24 hours** usage summaries: request count, token totals, average latency, average time-to-first-token (TTFT), total cost
- **Per-model breakdown**: which models drove your spend
- **Hourly time series**: request rate, total tokens, average latency, tokens-per-second, and cost

Use it to spot cold-start tax, identify which models dominate your bill, and watch for latency regressions after a model swap.

## Lifecycle States

| State | Meaning |
|-------|---------|
| **Cold** | No instance running — next request cold-starts the model |
| **Warming Up** | Model loading onto a GPU (counted via `startup_duration_ms`) |
| **Active / Running** | Serving requests |
| **Sleeping** | Idle, instance held briefly for fast re-warm |
| **Failed / Error** | Last startup or request errored — see logs |

## Billing

Serverless inference is billed per token (prompt + completion) at a model-specific rate. Cold-start GPU seconds during warm-up are not separately billed — only the tokens you generate.

Find rates and usage under the **Usage Analytics** tab and on monthly invoices.

## Use Cases

- Low-volume LLM workloads where keeping a dedicated GPU idle is wasteful
- Bursty inference traffic with high cold-start tolerance
- Quick model comparison via the playground before committing to a managed deployment
- Video generation without managing a long-running serving cluster

## Next Steps

- [Model Catalog](/docs/inference/catalog/) — for always-on managed inference
- [API Keys](/docs/inference/api-keys/) — generate keys for programmatic access
- [Playground](/docs/inference/playground/) — interactive testing for managed inference models

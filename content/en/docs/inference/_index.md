---
title: Inference
---

# Inference

The Podstack Inference service provides an OpenAI-compatible API for running large language models, embeddings, and audio transcription. Deploy models from the catalog or bring your own fine-tuned models.

## Overview

Inference includes:

- **Model Catalog** — browse and deploy inference-ready models
- **Playground** — test models interactively in the browser
- **API Keys** — manage authentication for API access
- **Serverless Inference** — pay-per-token cold-start GPU inference (chat, code, embedding, video)
- **OpenAI-Compatible API** — drop-in replacement for OpenAI endpoints
- **Streaming and system prompts** — first-class support for streamed responses and per-request system prompts
- **Chain-of-thought rendering** — `<think>` blocks separated from user-visible answers
- **Usage Analytics** — request counts, token usage, latency, and cost breakdowns
- **GPU Dashboard** — fleet-wide health and economics for serverless models

## Getting Started

1. Browse the [Model Catalog](/docs/inference/catalog/) to find a model
2. Generate an [API Key](/docs/inference/api-keys/) for authentication
3. Test in the [Playground](/docs/inference/playground/) or call the API directly
4. For pay-per-token cold-start workloads, see [Serverless Inference](/docs/inference/serverless/)

## OpenAI-Compatible API

The Inference API is compatible with the OpenAI SDK format, making migration easy:

### Chat Completions

```python
import openai

client = openai.OpenAI(
    api_key="YOUR_PODSTACK_INFERENCE_KEY",
    base_url="https://cloud.podstack.ai/inference/v1"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content)
```

### Embeddings

```python
response = client.embeddings.create(
    model="BAAI/bge-large-en-v1.5",
    input="The quick brown fox jumps over the lazy dog."
)

print(response.data[0].embedding[:5])  # First 5 dimensions
```

### Audio Transcription

```python
with open("audio.mp3", "rb") as audio_file:
    response = client.audio.transcriptions.create(
        model="whisper-large-v3",
        file=audio_file
    )

print(response.text)
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/chat/completions` | POST | Chat completions (streaming supported) |
| `/v1/embeddings` | POST | Generate embeddings |
| `/v1/audio/transcriptions` | POST | Audio transcription |
| `/v1/models` | GET | List available models |
| `/v1/models/:id` | GET | Get model details |

## Pricing

Inference is billed per token:
- **Input tokens**: Cost per million input tokens (varies by model)
- **Output tokens**: Cost per million output tokens (varies by model)
- Pricing is shown per model in the catalog

## Feature Availability

Inference requires:
- Feature flag enabled
- Sufficient wallet balance
- An active API key

Contact support if Inference isn't visible in your portal.

## Streaming

Set `stream: true` to receive tokens as they're generated:

```python
stream = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[{"role": "user", "content": "Hello"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

The playground also streams responses by default and exposes a **Stop** button to cancel in-flight generation.

## System Prompts and Chat History

The chat playground supports a persistent **system prompt** per session and stores chat history in a sidebar so you can revisit prior conversations. Use the **JSON** tab to see the exact request payload — useful when porting a prompt into your own code.

## Chain-of-Thought Display

Models that emit `<think>...</think>` reasoning blocks have those segments rendered separately from the final answer. Only the cleaned answer is saved to chat history; the think block is shown collapsed for inspection.

## Usage Analytics

Per-API-key analytics show:

- Request count and token totals (prompt + completion)
- Average latency and time-to-first-token (TTFT)
- Per-model cost breakdown
- Hourly time series

Use these to detect runaway clients, attribute spend across teams, and pick the right model for your latency budget.

## Cost Recommendations

The platform suggests cheaper or faster model alternatives based on your recent traffic shape. Recommendations appear on the **Cost Recommendations** view inside the Inference section.

## Next Steps

- [Browse the Model Catalog](/docs/inference/catalog/)
- [Generate API Keys](/docs/inference/api-keys/)
- [Test in the Playground](/docs/inference/playground/)
- [Serverless Inference](/docs/inference/serverless/) for cold-start pay-per-token workloads

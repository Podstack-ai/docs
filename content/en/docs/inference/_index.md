---
title: Inference
---

# Inference

The Podstack Inference service provides an OpenAI-compatible API for running large language models, embeddings, and audio transcription. Deploy models from the catalog or bring your own fine-tuned models.

## Overview

Inference includes:

- **Model Catalog** - Browse and deploy inference-ready models
- **Playground** - Test models interactively in the browser
- **API Keys** - Manage authentication for API access
- **OpenAI-Compatible API** - Drop-in replacement for OpenAI endpoints
- **Usage Tracking** - Monitor request counts and costs

## Getting Started

1. Browse the [Model Catalog](/docs/inference/catalog/) to find a model
2. Generate an [API Key](/docs/inference/api-keys/) for authentication
3. Test in the [Playground](/docs/inference/playground/) or call the API directly

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

## Next Steps

- [Browse the Model Catalog](/docs/inference/catalog/)
- [Generate API Keys](/docs/inference/api-keys/)
- [Test in the Playground](/docs/inference/playground/)

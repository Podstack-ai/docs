---
title: Inference API Keys
---

# Inference API Keys

Manage API keys for authenticating with the Podstack Inference API.

## Overview

Inference API keys are separate from your account API tokens. They are specifically for authenticating inference requests (chat completions, embeddings, audio transcription).

## Creating an API Key

1. Navigate to **Inference > API Keys**
2. Click **Create API Key**
3. Enter a descriptive name (e.g., "Production App", "Development")
4. Click **Create**
5. **Copy the key immediately** - it won't be shown again

## Using API Keys

### Authentication Header

Include the key in the `Authorization` header:

```bash
curl -X POST https://cloud.podstack.ai/inference/v1/chat/completions \
  -H "Authorization: Bearer YOUR_INFERENCE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3.1-8B-Instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

### With OpenAI SDK

```python
import openai

client = openai.OpenAI(
    api_key="YOUR_INFERENCE_KEY",
    base_url="https://cloud.podstack.ai/inference/v1"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3.1-8B-Instruct",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

### With Python Requests

```python
import requests

headers = {
    "Authorization": "Bearer YOUR_INFERENCE_KEY",
    "Content-Type": "application/json"
}

response = requests.post(
    "https://cloud.podstack.ai/inference/v1/chat/completions",
    headers=headers,
    json={
        "model": "meta-llama/Llama-3.1-8B-Instruct",
        "messages": [{"role": "user", "content": "Hello!"}]
    }
)
```

## Managing Keys

### Viewing Keys

The API Keys page shows:
- Key name
- Key prefix (for identification)
- Creation date
- Usage statistics

### Rate Limits

Each API key has rate limits:
- Requests per minute
- Tokens per minute
- Update limits via the key settings (or contact support for higher limits)

### Deleting Keys

1. Find the key in the list
2. Click **Delete**
3. Confirm deletion
4. Key is immediately invalidated

## Usage Tracking

Monitor your inference usage:

### Usage Summary

Navigate to **Inference > API Keys** to view:
- Total requests made
- Total tokens consumed (input + output)
- Breakdown by model

### Per-Key Usage

Each key tracks:
- Request count
- Token usage
- Last used timestamp

## Security Best Practices

1. **Never expose keys in client-side code** - Use a backend proxy
2. **Use environment variables** - Don't hardcode keys
3. **Rotate keys periodically** - Delete old keys and create new ones
4. **Use separate keys** - Different keys for development and production
5. **Monitor usage** - Watch for unexpected spikes

```bash
# Store as environment variable
export PODSTACK_INFERENCE_KEY="your_key_here"
```

```python
import os
api_key = os.environ.get("PODSTACK_INFERENCE_KEY")
```

## Troubleshooting

### 401 Unauthorized
- Verify the key is correct
- Check the key hasn't been deleted
- Ensure you're using `Bearer` prefix

### 429 Too Many Requests
- You've hit the rate limit
- Implement exponential backoff
- Contact support for higher limits

### Key Not Working
- Verify you're using an inference key, not an account API token
- Check the key was copied correctly (no extra whitespace)

## Next Steps

- [Browse the Model Catalog](/docs/inference/catalog/)
- [Test in the Playground](/docs/inference/playground/)
- [View Inference API Reference](/docs/inference/)

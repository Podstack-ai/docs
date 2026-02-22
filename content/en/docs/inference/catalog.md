---
title: Model Catalog
---

# Model Catalog

Browse and deploy inference-ready models from the Podstack model catalog.

## Browsing Models

Navigate to **Inference > Catalog** to explore available models.

### Model Information

Each model listing shows:
- **Name**: Model identifier (e.g., `meta-llama/Llama-3.1-8B-Instruct`)
- **Description**: Model capabilities and use cases
- **Parameters**: Model size
- **Pricing**: Cost per million tokens (input/output)
- **Status**: Available, deploying, or disabled
- **GPU Requirements**: Required GPU type and memory

### Filtering Models

Filter the catalog by:
- **Task Type**: Chat, embeddings, audio, code generation
- **Model Size**: Small, medium, large
- **Status**: Available, all
- **Search**: Filter by model name or keyword

## Model Details

Click on a model to view:
- Full description and capabilities
- Pricing breakdown (input/output tokens)
- API endpoint information
- Status and health check
- Example API calls

## Requesting a Model

If a model you need isn't in the catalog:
1. Click **Request Model**
2. Enter the Hugging Face model ID or name
3. Submit the request
4. The team will evaluate and potentially add it

## Model Status

| Status | Description |
|--------|-------------|
| Available | Ready for inference |
| Deploying | Being provisioned |
| Disabled | Temporarily unavailable |
| Keep Warm | Always ready with minimal latency |

## Cold Starts

Some models may have cold starts if they're not kept warm:
- First request may take longer (30s-2min depending on model size)
- Subsequent requests are fast
- Frequently used models are kept warm automatically

## Next Steps

- [Generate API Keys](/docs/inference/api-keys/) for authentication
- [Test in the Playground](/docs/inference/playground/)

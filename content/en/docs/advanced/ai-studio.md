---
title: AI Studio
---

# AI Studio

AI Studio provides end-to-end model management capabilities: browse model catalogues, fine-tune models on your data, evaluate performance, and deploy for inference.

## Overview

AI Studio includes:

- **Model Catalogue** - Browse available base and fine-tuned models
- **Fine-Tuning** - Train models on your custom datasets
- **Evaluation** - Assess model performance
- **Deployments** - Serve models for inference

## Model Catalogue

### Browsing Models

Navigate to **AI Studio > Models** to explore:

**Base Models**
Pre-trained foundation models:
- Large language models
- Vision models
- Multi-modal models

**Fine-Tuned Models**
Your custom-trained models.

### Model Information

Each model shows:
- Model name and description
- Parameters and architecture
- Pricing (per token for inference)
- Domain and capabilities
- Documentation links

### Filtering Models

Filter by:
- Model type (LLM, vision, etc.)
- Domain (general, code, etc.)
- Status (available, coming soon)

## Fine-Tuning

Train models on your custom data to improve performance for specific tasks.

### Preparing Data

**Dataset Requirements**
- Format: JSONL, CSV, or supported formats
- Quality: Clean, representative data
- Size: Minimum samples depend on model

**Upload Dataset**
1. Go to **AI Studio > Fine-Tuning**
2. Click **Upload Dataset**
3. Select your file
4. Verify upload completed

### Creating a Fine-Tuning Job

1. Click **Create Fine-Tuning Job**
2. Configure:

**Model Selection**
- Choose base model to fine-tune
- Review model capabilities

**Dataset**
- Select uploaded training dataset
- Optionally select validation dataset

**Training Parameters**
| Parameter | Description |
|-----------|-------------|
| Learning Rate | How fast the model learns (e.g., 1e-5) |
| Batch Size | Samples per training step |
| Epochs | Passes through the dataset |
| Max Sequence Length | Maximum input length |

3. Click **Start Training**

### Monitoring Training

Track progress on the fine-tuning page:
- Training status
- Current epoch
- Loss metrics
- Training time

### Training Results

When complete:
- Model saved to your catalogue
- Training metrics available
- Checkpoints accessible
- Ready for evaluation or deployment

## Evaluation

Assess how well your models perform.

### Creating an Evaluation Job

1. Go to **AI Studio > Evaluation**
2. Click **New Evaluation**
3. Configure:
   - Model to evaluate
   - Evaluation dataset
   - Metrics to compute
4. Run evaluation

### Evaluation Metrics

Depending on task type:
- **Accuracy**: Correct predictions
- **Perplexity**: Language model quality
- **BLEU/ROUGE**: Text generation quality
- **Custom metrics**: Task-specific measures

### Comparing Models

Compare multiple models:
- Side-by-side metrics
- Performance across datasets
- Cost vs. quality tradeoffs

## Deployments

Deploy models for inference via API.

### Creating a Deployment

1. Go to **AI Studio > Deployments**
2. Click **Deploy Model**
3. Configure:
   - Model to deploy
   - Instance type
   - Scaling settings
4. Click **Deploy**

### Deployment Settings

| Setting | Description |
|---------|-------------|
| Model | Which model to serve |
| GPU Type | Hardware for inference |
| Min Replicas | Minimum instances |
| Max Replicas | Maximum for scaling |

### Using Deployed Models

Access via API:
```python
import requests

response = requests.post(
    'https://api.podstack.ai/v1/inference/your-deployment',
    headers={'Authorization': 'Bearer YOUR_TOKEN'},
    json={'prompt': 'Your input text'}
)

print(response.json()['output'])
```

### Managing Deployments

- **Scale**: Adjust replica count
- **Monitor**: View request metrics
- **Stop**: Pause the deployment
- **Delete**: Remove deployment

## Pricing

AI Studio costs include:

### Fine-Tuning
- GPU time during training
- Based on GPU type and duration

### Inference
- Per-token pricing
- Varies by model size
- Volume discounts available

### Storage
- Dataset storage
- Model storage

## Best Practices

### Data Preparation

1. **Clean data thoroughly** - Remove noise and errors
2. **Balance classes** - Avoid skewed distributions
3. **Validate format** - Ensure correct structure
4. **Start small** - Test with subset first

### Fine-Tuning

1. **Start with defaults** - Use recommended parameters
2. **Monitor metrics** - Watch for overfitting
3. **Use validation set** - Track generalization
4. **Save checkpoints** - Enable recovery

### Evaluation

1. **Use held-out data** - Don't evaluate on training data
2. **Multiple metrics** - Don't rely on single measure
3. **Compare baselines** - Measure improvement

### Deployment

1. **Test thoroughly** - Validate before production
2. **Start small** - Begin with minimal replicas
3. **Monitor usage** - Track latency and errors
4. **Scale gradually** - Increase based on demand

## Feature Availability

AI Studio may require:
- Feature flag enabled
- Minimum account level
- Sufficient wallet balance

Contact support if AI Studio isn't visible in your portal.

## Next Steps

- [Create a Pod](/docs/compute/pods/) for custom training setups
- [Set up Storage](/docs/storage/) for datasets
- [Manage Billing](/docs/billing/) for AI Studio costs

---
title: AI Studio
---

# AI Studio

AI Studio provides end-to-end model management capabilities: browse model catalogues, import from Hugging Face, fine-tune models on your data, evaluate performance, and deploy for inference.

## Overview

AI Studio includes:

- **Model Catalogue** - Browse available base and fine-tuned models
- **Hugging Face Integration** - Search and import models from Hugging Face Hub
- **Model Playground** - Test models interactively before deploying
- **Fine-Tuning** - Train models using Unsloth or Axolotl engines
- **Evaluation** - Assess model performance with custom datasets and metrics
- **Deployments** - Serve models for inference via API

## Model Catalogue

### Browsing Models

Navigate to **AI Studio > Models** to explore:

**Base Models**
Pre-trained foundation models ready for deployment or fine-tuning:
- Large language models (LLMs)
- Vision models
- Multi-modal models
- Embedding models

**Fine-Tuned Models**
Your custom-trained models appear here after training completes.

### Model Information

Each model card shows:
- **Name and Description**: Model identity and capabilities
- **Parameters**: Model size (7B, 13B, 70B, etc.)
- **Architecture**: Model architecture type
- **Tags**: Categorization labels (text-generation, NLP, computer-vision, etc.)
- **License**: Usage rights (Apache 2.0, MIT, commercial, etc.)
- **Pricing**: Cost per million tokens (input and output separately)
- **Status**: Available, coming soon, or deprecated

### Filtering and Search

**Search**
Type model name or keywords to find specific models.

**Filter by Tags**
- text-generation
- language-model
- computer-vision
- NLP
- embedding
- multi-modal

**Filter by Model Type**
- Base models
- Fine-tuned models
- Your models

**Model Statistics**
View aggregate stats including total models, active deployments, and fine-tuning jobs.

## Hugging Face Integration

Import models directly from the Hugging Face Hub.

### Searching Hugging Face

1. Go to **AI Studio > Models**
2. Click **Import from Hugging Face**
3. Search by model name, task, or keyword
4. Browse popular models by category

### Importing a Model

1. Find the model on Hugging Face
2. Click **Import**
3. Podstack validates model access and compatibility
4. Model is added to your catalogue
5. Ready for fine-tuning or deployment

### Model Categories

Browse Hugging Face models by category:
- Text Generation
- Text Classification
- Question Answering
- Summarization
- Translation
- Image Classification
- Object Detection
- Audio Processing

### Access Validation

For gated models on Hugging Face:
- Podstack checks if you have access to the model
- You may need to accept the model's license on Hugging Face first
- Provide your Hugging Face token if required

## Model Playground

Test models interactively before deploying:

### Accessing the Playground

1. Navigate to a model's detail page
2. Click **Playground**
3. Or go to **AI Studio > Playground** and select a model

### Playground Features

**Chat Interface**
- Send prompts and receive responses
- View conversation history
- Clear conversation and start fresh

**Parameter Controls**
- **Temperature**: Control randomness (0.0 - 2.0)
- **Max Tokens**: Limit response length
- **Top P**: Nucleus sampling parameter
- **Stop Sequences**: Custom stop tokens

**Playground Configuration**
Each model can have a custom playground config with:
- Default parameters
- System prompt templates
- Example prompts

### Use Cases

- Evaluate model capabilities before deployment
- Test prompts and prompt engineering
- Compare models for specific tasks
- Demo models to stakeholders

## Fine-Tuning

Train models on your custom data to improve performance for specific tasks.

### Training Engines

Podstack supports multiple training engines:

**Unsloth (Recommended for LoRA)**
- Optimized for fast LoRA fine-tuning
- 2-5x faster than standard training
- Lower memory requirements
- Pre-configured templates for popular models
- Best for: Quick fine-tuning, LoRA adapters, memory-constrained setups

**Axolotl (Full Fine-Tuning)**
- Full parameter fine-tuning support
- Advanced configuration options
- Custom training recipes
- Best for: Full fine-tuning, advanced users, custom training pipelines

**Selecting an Engine**
1. When creating a fine-tuning job, choose your engine
2. Use **Get Recommendation** to let Podstack suggest the best engine for your model and use case
3. View engine capabilities and compatible models

### Preparing Data

**Dataset Requirements**
- Format: JSONL, CSV, or supported formats
- Quality: Clean, representative data
- Size: Minimum samples depend on model and engine

**Upload Dataset**
1. Go to **AI Studio > Fine-Tuning**
2. Click **Upload Dataset**
3. Select your file
4. Dataset is automatically validated for format and compatibility
5. View dataset details including sample count, size, and format

**Dataset Validation**
Podstack validates datasets before training:
- Schema validation against model requirements
- Format checking (JSONL structure, required fields)
- Sample preview for verification

### Creating a Fine-Tuning Job

1. Click **Create Fine-Tuning Job**
2. Configure:

**Model Selection**
- Choose base model to fine-tune
- Or select from Hugging Face quickstart models

**Training Engine**
- Select Unsloth or Axolotl
- Or use the recommendation engine

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
| LoRA Rank | LoRA adapter dimension (Unsloth) |
| LoRA Alpha | LoRA scaling factor (Unsloth) |

**Unsloth Templates**
When using Unsloth, select from optimized templates:
- Templates are pre-configured for specific model families
- Automatic parameter recommendations
- Validated configurations that work out-of-the-box

**Cost Estimation**
Before starting, review the estimated training cost based on:
- GPU type and count
- Estimated training duration
- Dataset size and epoch count

3. Click **Start Training**

### Monitoring Training

Track progress on the fine-tuning page:
- **Training Status**: Queued, running, completed, failed
- **Current Epoch**: Progress through the dataset
- **Loss Metrics**: Training and validation loss curves (real-time via WebSocket)
- **Training Time**: Elapsed and estimated remaining time
- **Resource Usage**: GPU utilization during training

### Training Results

When training completes successfully:
- Model saved to your catalogue under "My Fine-Tuned Models"
- Training metrics and loss curves available for review
- Model ready for evaluation or direct deployment
- Download option for model weights
- Deploy directly to AI Studio or Inference

### Managing Training Jobs

View all your training jobs:
- **Active Jobs**: Currently running
- **Completed Jobs**: Successfully finished
- **Failed Jobs**: Jobs that encountered errors

For each job you can:
- View detailed logs
- View resource usage metrics
- Cancel running jobs
- Delete completed jobs

### Fine-Tuning Analytics

View aggregate analytics across all fine-tuning activity:
- Total jobs run
- GPU hours consumed
- Success/failure rates
- Resource utilization trends

## Evaluation

Assess how well your models perform with structured evaluation jobs.

### Evaluation Datasets

Before running evaluations, prepare your evaluation data:

**Upload Dataset**
1. Go to **AI Studio > Evaluation**
2. Click **Upload Dataset**
3. Select your evaluation file
4. Dataset is validated for format

**Generate Dataset**
Podstack can help generate evaluation datasets:
1. Click **Generate Dataset**
2. Configure generation parameters
3. Review and edit generated samples

**Dataset Templates**
Use pre-built templates for common evaluation tasks:
- Question-answering evaluation
- Summarization evaluation
- Classification evaluation
- Custom task evaluation

**Supported Formats**
View supported dataset formats for your evaluation type.

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
- **F1 Score**: Precision and recall balance
- **Custom metrics**: Task-specific measures

View all available metric types in the metrics catalog.

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
   - Model to deploy (base, fine-tuned, or from registry)
   - GPU type for inference
   - Scaling settings
4. Click **Deploy**

### Deployment Settings

| Setting | Description |
|---------|-------------|
| Model | Which model to serve |
| GPU Type | Hardware for inference |
| Min Replicas | Minimum instances |
| Max Replicas | Maximum for scaling |

### Deployment Lifecycle

**Deploy**: Start serving the model
```
Model → Deploying → Active
```

**Undeploy**: Stop serving without deleting configuration
```
Active → Undeploying → Inactive
```

### Using Deployed Models

Access via API:
```python
import requests

response = requests.post(
    'https://api.podstack.ai/v1/inference/deployments/<deployment_id>/predict',
    headers={'Authorization': 'Bearer YOUR_TOKEN'},
    json={'prompt': 'Your input text'}
)

print(response.json()['output'])
```

**Batch Predictions**
Send multiple inputs in a single request:
```python
response = requests.post(
    'https://api.podstack.ai/v1/inference/deployments/<deployment_id>/batch-predict',
    headers={'Authorization': 'Bearer YOUR_TOKEN'},
    json={'inputs': ['Input 1', 'Input 2', 'Input 3']}
)
```

### Managing Deployments

**Monitor**
- Request count and latency metrics
- Error rates and status codes
- GPU utilization per replica
- Token throughput (tokens per second)
- Deployment logs

**Deployment Actions**
- **Deploy**: Start serving the model
- **Undeploy**: Stop serving requests
- **Update**: Change model version or settings
- **Delete**: Permanently remove deployment

### Endpoint Details

View deployment information:
- **Endpoint URL**: Full API endpoint for inference
- **Health Status**: Check deployment health
- **Model Info**: Currently deployed model details
- **Uptime**: Time since last deployment/restart

### Direct Deployment from Registry

Deploy models directly from the Model Registry:
1. Go to **MLOps > Model Registry**
2. Find a model with a Production stage version
3. Click **Deploy to AI Studio**
4. Configure deployment settings
5. Model is deployed for inference

## Pricing

AI Studio costs include:

### Fine-Tuning
- GPU time during training
- Based on GPU type and duration
- Cost estimation available before starting

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
3. **Validate format** - Use Podstack's validation tool
4. **Start small** - Test with subset first

### Fine-Tuning

1. **Use Unsloth for LoRA** - Faster and more memory-efficient
2. **Start with templates** - Use pre-configured Unsloth templates
3. **Monitor loss curves** - Watch for overfitting via real-time metrics
4. **Use validation set** - Track generalization
5. **Review cost estimates** - Check estimated cost before starting

### Evaluation

1. **Use held-out data** - Don't evaluate on training data
2. **Multiple metrics** - Don't rely on single measure
3. **Compare baselines** - Measure improvement over base model
4. **Use dataset templates** - Start with structured evaluation formats

### Deployment

1. **Test in playground first** - Validate before deploying
2. **Start small** - Begin with minimal replicas
3. **Monitor usage** - Track latency and errors
4. **Scale gradually** - Increase based on demand

## Feature Availability

AI Studio requires:
- Feature flag enabled (`REACT_APP_ENABLE_AI_STUDIO`)
- Sufficient wallet balance for training and inference

Contact support if AI Studio isn't visible in your portal.

## Next Steps

- [Create a Pod](/docs/compute/pods/) for custom training setups
- [Set up Storage](/docs/storage/) for datasets
- [Use the Model Registry](/docs/mlops/model-registry/) to version models
- [Manage Billing](/docs/billing/) for AI Studio costs

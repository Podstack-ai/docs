---
title: Inference Playground
---

# Inference Playground

Test inference models interactively in your browser before integrating into your applications.

## Accessing the Playground

1. Navigate to **Inference > Playground**
2. Select a model from the dropdown
3. Start sending messages

## Features

### Chat Interface

- Send messages and receive model responses
- View full conversation history
- Clear conversation to start fresh
- Real-time streaming responses

### Model Selection

Choose from any available model in the catalog:
- Switch models mid-conversation
- Compare responses across models
- View model details and pricing

### Parameter Tuning

Adjust inference parameters in real-time:

| Parameter | Description | Range |
|-----------|-------------|-------|
| Temperature | Controls randomness | 0.0 - 2.0 |
| Max Tokens | Maximum response length | 1 - model max |
| Top P | Nucleus sampling | 0.0 - 1.0 |
| Top K | Top-k sampling | 1 - 100 |
| Stop Sequences | Custom stop tokens | Custom strings |

### Token Usage

The playground tracks token usage per conversation:
- Input tokens per message
- Output tokens per response
- Total tokens consumed
- Estimated cost

### Performance Metrics

View real-time performance:
- Time to first token
- Tokens per second
- Total response time

## Use Cases

### Prompt Engineering

Test and refine prompts before deployment:
```
System: You are a technical documentation writer.
User: Write a brief explanation of GPU memory bandwidth.
```

### Model Evaluation

Compare models for your specific use case:
1. Send the same prompt to different models
2. Compare response quality
3. Compare speed and cost
4. Choose the best model for your needs

### Quick Prototyping

Test model capabilities before writing integration code:
- Verify the model understands your domain
- Test edge cases
- Validate output format

## Limitations

- Playground uses your inference API quota
- Conversations are not persisted between sessions
- Large responses may be truncated at the model's context limit

## Next Steps

- [Generate API Keys](/docs/inference/api-keys/) to integrate into your application
- [Browse the Model Catalog](/docs/inference/catalog/) for more models
- [View API Reference](/docs/inference/) for programmatic access

---
title: Endpoints
description: "Serve a Hugging Face model on dedicated Podstack GPUs that scale to zero. The URL speaks the OpenAI chat format."
weight: 45
keywords:
  - endpoints
  - autoscale
  - Hugging Face
---

# Endpoints

An endpoint is a dedicated model server. It autoscales, including down to zero, and gives you a private URL that speaks the OpenAI chat-completions format.

Open [Endpoints](https://podstack.ai/app/endpoints) and click **New endpoint**.

| Field | What to enter |
| --- | --- |
| Name | Starts with a letter. Lowercase letters, numbers, and hyphens. 36 characters at most. Example: `llama-prod`. |
| Model | A Hugging Face model id, such as `meta-llama/Llama-3.1-8B-Instruct`. |
| GPU | One of the types in the form: `l40s`, `a100_80gb`, `h100_sxm`, or `h200`. |
| Min replicas | `0` means you pay nothing when there is no traffic. |
| Max replicas | The form starts at `2`. |

You need a wallet balance above zero to create one. The machines behind the endpoint are billed for the time they exist, per second from their hourly rate.

Set min replicas to 0 to scale to zero. While replicas are up, they draw from the wallet like any other GPU. If the project runs out of credits, its endpoints are deleted.

The card shows status, GPU, replica count, request count, and the URL when one is assigned. Deleting an endpoint removes it.

Point an OpenAI client at that URL with a `ps_live_` key. Hosted catalog models, which you do not deploy yourself, are [Inference](/docs/inference/) at `https://api.podstack.ai/v1`.

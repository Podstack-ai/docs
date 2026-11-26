---
title: FAQs
description: "Short answers about Podstack billing, sign-in, inference, and SSH."
weight: 50
keywords:
  - FAQ
---

# FAQs

**How am I billed?** GPU instances are billed for the time they run, pro-rated by the second from the hourly rate, from boot until you terminate them. Extra disk is billed per GB-hour. Jobs are billed for the time they run. Inference is billed per token. Every project has its own wallet. There is no monthly or annual subscription.

**Where are prices?** In the console and on [podstack.ai/#pricing](https://podstack.ai/#pricing). India sees INR. Everywhere else sees USD.

**How do I pay?** Razorpay, with cards, UPI, or netbanking. See [Wallet](/docs/billing/wallet/).

**Is the API OpenAI-compatible?** Yes. Point an OpenAI SDK at `https://api.podstack.ai/v1` and send a `ps_live_` key. Model ids look like `podstack/kimi-k3`. See [Inference](/docs/inference/).

**What is Secured versus Community?** Each GPU offer is one or the other. They are priced and stocked separately. An offer that does not name a class is Secured.

**Can my team share one wallet?** Yes. [Create a project and invite by email](/docs/account/team/).

**Where do I SSH?** Copy the command on the instance. When the host is a Podstack name, it is on `cloud.podstack.ai`. See [Instances and SSH](/docs/gpu-cloud/instances/).

**Do you allow crypto mining?** No. Mining is prohibited by the [acceptable use policy](https://podstack.ai/terms#section-4) and is stopped.

---
title: Scenarios
description: "What to do for a Podstack charge you do not recognize, a missing GPU, or a locked-out account."
weight: 30
keywords:
  - support scenarios
---

# Scenarios

## A charge I do not recognize

1. Open [Billing](https://podstack.ai/app/billing) and set the period that covers the charge.
2. Match the amount to a service chip: GPU Cloud, Jobs, Inference, Endpoints, Functions, or Deploy.
3. GPU Cloud time runs from boot until terminate, per second from the hourly rate. Extra disk is per GB-hour. A dedicated IP adds its own hourly fee and transfer.
4. Jobs charge only while they run. Inference charges per token.
5. If the row still does not match, email [support@podstack.ai](mailto:support@podstack.ai) with the project name and the time of the row.

## The GPU I want is not on the board

The cloud board only lists machines that are free. Create a [watchlist](/docs/gpu-cloud/watchlists/) for that GPU, or pick another region in the launch wizard. For 16 or more GPUs, [request a reservation](/docs/reservations/).

## I cannot get into the account

Sign in again with Google, Microsoft, or GitHub at [podstack.ai/auth](https://podstack.ai/auth). If the account was suspended, the API returns a message telling you to contact support@podstack.ai.

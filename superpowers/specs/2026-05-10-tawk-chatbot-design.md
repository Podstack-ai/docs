# Tawk.to Chatbot Design — Podstack.ai
**Date:** 2026-05-10  
**Status:** Approved  
**Plan:** Free tawk.to plan  
**Language:** English only  

---

## Overview

Configure Podstack.ai's tawk.to live chat widget to serve two purposes:
1. **Lead generation** — engage and capture visitors on podstack.ai
2. **User support** — assist logged-in users on cloud.podstack.ai

The implementation uses tawk.to's free plan capabilities: proactive trigger messages, canned responses (shortcuts), pre-chat forms, offline forms, and contact tagging. No external AI backend required.

**Tone:** Professional but conversational — works for developers and newcomers alike.

---

## Widget Placement

| Context | Domain | Purpose |
|---|---|---|
| Landing site | `podstack.ai` | Visitor conversion + lead capture |
| Dashboard | `cloud.podstack.ai` | User support |

---

## Widget Appearance & Settings

- **Agent display name:** Podstack Support
- **Avatar:** Podstack logo
- **Chat bubble text:** "Chat with us"
- **Position:** Bottom-right on all pages
- **Auto-open:** Disabled (triggers appear, widget opens on click)
- **Sound notifications:** Enabled
- **Typing indicator:** Enabled

### Operating Hours
Set team's working hours in tawk.to settings. Outside hours, the offline form fires automatically. Include timezone in offline messages.

---

## Pre-Chat Forms

### Landing Site (podstack.ai)
- **No pre-chat form** — reduce friction for conversion
- Lead info captured inline during conversation via canned response `#welcome`

### Dashboard (cloud.podstack.ai)
- **Pre-chat form fields:**
  - Name (required)
  - Email (required)
  - Topic (dropdown): Billing / Compute / Storage / AI Studio / Other

### Offline Form (both sites)
- **Fields:** Name, Email, Message
- **Thank-you message:** *"Thanks! We'll get back to you within 24 hours. For urgent issues email support@podstack.ai"*
- **Tagging:**
  - podstack.ai visitors → tag: `Lead`
  - cloud.podstack.ai users → tag: `Support`

---

## Proactive Triggers

| # | Trigger Name | Page Match | Condition | Message |
|---|---|---|---|---|
| 1 | Welcome | `podstack.ai` | Time on page > 15s | *"Hey! Looking for affordable GPU compute? I can help you get started or answer any questions."* |
| 2 | Pricing nudge | `podstack.ai/pricing` | Time on page > 20s | *"GPU pricing can get confusing — I can break down exactly what you'd pay for your workload. What are you building?"* |
| 3 | Dashboard idle | `cloud.podstack.ai/portal*` | Time on page > 60s | *"Need help with anything? I'm just a message away."* |
| 4 | Billing page | `cloud.podstack.ai/billing*` | Page visit | *"Questions about your wallet or billing? I can help with top-ups, invoices, and cost optimization."* |
| 5 | Platform/Pods | `cloud.podstack.ai/platform*` | Time on page > 90s | *"Pods or VMs taking longer than expected? I can help troubleshoot."* |
| 6 | AI Studio | `cloud.podstack.ai/ai-studio*` | Time on page > 60s | *"Fine-tuning or deploying a model? Happy to walk you through it."* |
| 7 | Marketplace | `cloud.podstack.ai/marketplace*` | Time on page > 30s | *"Looking for the right GPU? I can help you pick based on your workload."* |
| 8 | Notebooks | `cloud.podstack.ai/notebooks*` | Time on page > 45s | *"Setting up a notebook? I can help with setup or troubleshooting."* |

---

## Canned Responses (Shortcuts)

### Account & Onboarding

| Shortcut | Response |
|---|---|
| `#welcome` | *"Welcome to Podstack! I'm here to help. Are you looking to get started, or do you have a specific question about our platform?"* |
| `#signup` | *"Getting started is easy — head to podstack.ai, create an account, verify your email, add funds to your wallet, and deploy your first GPU pod in minutes."* |
| `#otp` | *"OTP codes expire after 10 minutes. Click 'Resend OTP' for a fresh one. If it's still not arriving, check your spam folder or reply with your email and we'll look into it."* |

### Billing & Wallet

| Shortcut | Response |
|---|---|
| `#topup` | *"To add funds: go to cloud.podstack.ai/billing, click 'Add Funds', and pay via UPI, card, or net banking through Razorpay. Your balance updates instantly."* |
| `#suspended` | *"Your resources were suspended due to a low wallet balance. Top up at cloud.podstack.ai/billing to resume them immediately."* |
| `#invoice` | *"You can download invoices from cloud.podstack.ai/billing under Transaction History."* |
| `#pricing` | *"Pods and VMs are billed per-second while running. Storage is billed hourly. Inference is per-token. You only pay for what you use — no contracts."* |

### Compute — Pods & VMs

| Shortcut | Response |
|---|---|
| `#podpending` | *"A pod stuck in Pending usually means: (1) insufficient wallet balance, (2) the selected GPU is unavailable — try a different type, or (3) resource limits are too high. Which GPU were you trying to use?"* |
| `#podcreating` | *"If your pod is stuck in Creating, it's likely pulling a large Docker image — this can take 10+ minutes. If it's been over 20 minutes, let me know the image name and pod ID."* |
| `#ssh` | *"To SSH in: make sure your pod is in Running state, your SSH key is added under Account Settings, and the SSH port (22) is exposed. What error are you seeing?"* |
| `#gpu` | *"We support NVIDIA A100 (40/80GB), H100 (80GB), H200 (141GB), L40S (48GB), V100 (16/32GB), and T4 (16GB). Which workload are you optimizing for?"* |

### Storage

| Shortcut | Response |
|---|---|
| `#bucket` | *"S3-compatible buckets are available at cloud.podstack.ai/portal. Buckets support public/private access and are billed hourly by capacity."* |
| `#nfs` | *"NFS volumes can be mounted across pods and VMs for shared persistent storage. Create one under Storage in your project dashboard."* |

### AI Studio & Inference

| Shortcut | Response |
|---|---|
| `#finetune` | *"To fine-tune a model: go to AI Studio → browse the model catalog → select a base model → create a fine-tuning job with your dataset and parameters. Need help choosing between Unsloth (fast LoRA) and Axolotl (full fine-tuning)?"* |
| `#inference` | *"Our Inference API is OpenAI-compatible. Deploy a model from the catalog at cloud.podstack.ai/infer and use it with your existing OpenAI SDK — just swap the base URL."* |

### Documentation

| Shortcut | Response |
|---|---|
| `#docs` | *"Our full documentation is at https://docs.podstack.ai/ — covers getting started through advanced MLOps workflows."* |
| `#docs-pods` | *"Pod setup guide: https://docs.podstack.ai/compute/pods — creation, SSH, custom Docker images, and scaling."* |
| `#docs-vms` | *"VM setup guide: https://docs.podstack.ai/compute/vms — OS selection, GPU passthrough, SSH, and persistent storage."* |
| `#docs-billing` | *"Billing guide: https://docs.podstack.ai/billing — top-up, invoices, run-rate projections, and cost optimization."* |
| `#docs-cli` | *"CLI guide: https://docs.podstack.ai/developer/cli — install via brew, curl, or winget. Auth, commands, CI/CD."* |
| `#docs-sdk` | *"Python SDK docs: https://docs.podstack.ai/developer/sdk — typing, async/await, retry logic, IDE autocomplete."* |
| `#docs-aistudio` | *"AI Studio guide: https://docs.podstack.ai/ai-studio — fine-tuning, inference deployment, experiment tracking."* |
| `#docs-storage` | *"Storage guide: https://docs.podstack.ai/storage — S3 buckets, NFS volumes, permissions, mounting."* |
| `#docs-api` | *"REST API reference: https://docs.podstack.ai/developer/api — JWT auth and Swagger docs."* |
| `#selfhelp` | *"Most common issues are covered at https://docs.podstack.ai/ — search your topic first. If you're still stuck, I'm here."* |

### Escalation

| Shortcut | Response |
|---|---|
| `#escalate` | *"Let me connect you with our support team. Could you share your account email, the resource ID (pod/VM/bucket), and a brief description of the issue? We'll get this sorted."* |
| `#offline` | *"Our team is currently offline but we'll get back to you within 24 hours. You can also email us at support@podstack.ai. Please include your account email and resource ID for faster resolution."* |

---

## Escalation Flow

```
User sends message
       ↓
Agent available online?
   ├── YES → Agent picks up chat, uses #shortcuts to respond
   └── NO  →
         Offline form fires:
         "Our team is offline. Leave your message and we'll reply
          within 24 hours, or email support@podstack.ai"
         ↓
         Offline form captures: Name, Email, Topic, Message
         ↓
         Tagged by context:
           podstack.ai/*        → tag: "Lead"
           cloud.podstack.ai/*  → tag: "Support"
         ↓
         Lands in tawk.to inbox for agent follow-up
```

**During live chat — agent types `#escalate`:**
1. Agent collects: account email, resource ID, issue description
2. If unresolved → agent emails support@podstack.ai with full transcript
3. tawk.to attaches transcript automatically

**Lead capture during live conversation (landing site):**
1. If no form filled, agent uses `#welcome` to ask for name + email
2. Agent manually adds contact to tawk.to Contacts with tag `Lead`

---

## Lead Capture Summary

| Source | Method | Tag |
|---|---|---|
| Landing site — live chat | Inline via `#welcome` canned response | `Lead` |
| Landing site — offline | Offline form (Name, Email, Message) | `Lead` |
| Dashboard — pre-chat | Pre-chat form (Name, Email, Topic) | `Support` |
| Dashboard — offline | Offline form (Name, Email, Message) | `Support` |

All captured contacts land in tawk.to's **Contacts** tab for follow-up.

---

## Implementation Checklist

- [ ] Create tawk.to property for podstack.ai
- [ ] Install tawk.to widget on podstack.ai (landing site)
- [ ] Install tawk.to widget on cloud.podstack.ai (dashboard)
- [ ] Configure widget appearance (name, avatar, color, position)
- [ ] Set up operating hours + timezone
- [ ] Configure pre-chat form on cloud.podstack.ai only
- [ ] Configure offline form on both sites with correct thank-you message
- [ ] Set up 8 proactive triggers with correct page matches and delays
- [ ] Create all canned responses (shortcuts) — 30 total
- [ ] Set up contact tags: `Lead`, `Support`
- [ ] Test trigger firing on each page
- [ ] Test offline form submission and tagging
- [ ] Test escalation flow (live + offline)
- [ ] Brief support agents on shortcut keys and escalation protocol

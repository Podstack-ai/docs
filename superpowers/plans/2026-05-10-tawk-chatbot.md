# Tawk.to Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure tawk.to across podstack.ai and cloud.podstack.ai with proactive triggers, canned responses, lead capture, and contextual support flows.

**Architecture:** Two surfaces share one tawk.to property (`69e63442561f681d7042ed06/1jmljo9ad`). The landing site gets a plain embed script (visitors, no auth). The dashboard's existing `Tawk.tsx` component is updated to show the widget by default and pass page context. Tawk.to admin is then configured with 8 triggers, 30 canned responses, pre-chat/offline forms, and contact tags.

**Tech Stack:** React (TSX), tawk.to free plan, Vite (landing site), Zustand (dashboard state)

**Spec:** `docs/superpowers/specs/2026-05-10-tawk-chatbot-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `landing-site/index.html` | Modify | Add tawk.to embed script for visitor-facing widget |
| `dashboard-core/customer-portal/src/components/Tawk.tsx` | Modify | Show widget by default, pass page path as attribute |
| `dashboard-core/customer-portal/src/components/Tawk.test.tsx` | Create | Unit tests for updated Tawk component behaviour |

All tawk.to admin configuration (triggers, canned responses, forms) is done via the tawk.to dashboard — no additional code files.

---

## Task 1: Show widget by default on dashboard & pass page context

The current `Tawk.tsx` calls `hideWidget()` on load, which prevents proactive triggers from appearing. We need to show the widget and pass the current page path so tawk.to's URL-based triggers fire correctly.

**Files:**
- Modify: `dashboard-core/customer-portal/src/components/Tawk.tsx`
- Create: `dashboard-core/customer-portal/src/components/Tawk.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `dashboard-core/customer-portal/src/components/Tawk.test.tsx`:

```tsx
import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock stores
vi.mock('../store/authStore', () => ({
  useAuthStore: () => ({
    user: { id: 'u1', name: 'Test User', email: 'test@example.com' },
    isAuthenticated: true,
  }),
}));
vi.mock('../store/tawkStore', () => ({
  useTawkStore: (sel: (s: { increment: () => void; reset: () => void }) => unknown) =>
    sel({ increment: vi.fn(), reset: vi.fn() }),
}));

describe('Tawk', () => {
  beforeEach(() => {
    window.Tawk_API = {
      hideWidget: vi.fn(),
      showWidget: vi.fn(),
      setAttributes: vi.fn(),
      onLoad: undefined,
    };
  });

  it('does NOT call hideWidget on load', async () => {
    const { default: Tawk } = await import('./Tawk');
    render(<Tawk />);
    // Simulate onLoad firing
    window.Tawk_API?.onLoad?.();
    expect(window.Tawk_API?.hideWidget).not.toHaveBeenCalled();
  });

  it('calls setAttributes with source and page on load', async () => {
    const { default: Tawk } = await import('./Tawk');
    render(<Tawk />);
    window.Tawk_API?.onLoad?.();
    expect(window.Tawk_API?.setAttributes).toHaveBeenCalledWith(
      expect.objectContaining({ source: 'customer-portal', page: expect.any(String) }),
      expect.any(Function),
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd ~/Podstack/dashboard-core/customer-portal
npx vitest run src/components/Tawk.test.tsx
```

Expected: FAIL — `hideWidget` is currently called, `setAttributes` not called on load.

- [ ] **Step 3: Update Tawk.tsx**

Replace the entire `useEffect` that loads the script in `dashboard-core/customer-portal/src/components/Tawk.tsx`. The key changes are:
1. Remove `window.Tawk_API?.hideWidget?.()` from `onLoad`
2. Add `setAttributes` call inside `onLoad` with page context

```tsx
  useEffect(() => {
    if (!isAuthenticated) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    let readyToCount = false;

    window.Tawk_API.onLoad = () => {
      // Widget stays visible — proactive triggers need it shown
      reset();
      setTimeout(() => {
        readyToCount = true;
      }, 3000);

      // Pass page context for URL-based triggers
      window.Tawk_API?.setAttributes?.(
        {
          source: 'customer-portal',
          page: window.location.pathname,
        },
        () => {},
      );
    };

    window.Tawk_API.onChatMessageAgent = () => {
      if (!readyToCount) return;
      if (!window.Tawk_API?.isChatMaximized?.()) {
        increment();
      }
    };

    window.Tawk_API.onChatMaximized = () => {
      reset();
    };

    if (user) {
      window.Tawk_API.visitor = {
        name: user.name || user.email,
        email: user.email,
      };
    }

    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = TAWK_SRC;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);

    const style = document.createElement('style');
    style.id = 'tawk-podstack-theme';
    style.textContent = `
      iframe[title*="chat" i] {
        box-shadow: 0 0 40px rgba(249, 115, 22, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingScript = document.querySelector(`script[src="${TAWK_SRC}"]`);
      existingScript?.remove();
      document.getElementById('tawk-podstack-theme')?.remove();
    };
  }, [isAuthenticated, user]);
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Podstack/dashboard-core/customer-portal
npx vitest run src/components/Tawk.test.tsx
```

Expected: PASS — both tests green.

- [ ] **Step 5: Commit**

```bash
cd ~/Podstack/dashboard-core/customer-portal
git add src/components/Tawk.tsx src/components/Tawk.test.tsx
git commit -m "feat(tawk): show widget by default and pass page context on load"
```

---

## Task 2: Add tawk.to embed script to landing site

The landing site (`podstack.ai`) only has a `dns-prefetch` for tawk.to — no actual embed. We add the standard tawk.to snippet before `</body>`.

**Files:**
- Modify: `landing-site/index.html`

- [ ] **Step 1: Open `landing-site/index.html` and locate the closing `</body>` tag**

- [ ] **Step 2: Add the tawk.to embed script just before `</body>`**

Insert the following block immediately before the closing `</body>` tag:

```html
    <!-- Tawk.to live chat -->
    <script type="text/javascript">
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      (function(){
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/69e63442561f681d7042ed06/1jmljo9ad';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    </script>
```

- [ ] **Step 3: Verify the dns-prefetch line already exists** (line ~101)

```bash
grep -n "dns-prefetch.*tawk" ~/Podstack/landing-site/index.html
```

Expected output: a line like `<link rel="dns-prefetch" href="https://embed.tawk.to" />`
If missing, add it inside `<head>`.

- [ ] **Step 4: Build and verify no errors**

```bash
cd ~/Podstack/landing-site
npm run build 2>&1 | tail -20
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
cd ~/Podstack/landing-site
git add index.html
git commit -m "feat(tawk): add live chat widget embed to landing site"
```

---

## Task 3: Tawk.to admin — Widget appearance & operating hours

> This task is performed in the tawk.to dashboard at https://dashboard.tawk.to — no code changes.

**Property ID:** `69e63442561f681d7042ed06`  
**Widget ID:** `1jmljo9ad`

- [ ] **Step 1: Set widget appearance**

Navigate to: **Administration → Chat Widget → Appearance**

Set:
- Widget color: Match Podstack brand color (orange `#F97316` or your primary brand hex)
- Chat bubble text: `Chat with us`
- Widget position: Bottom-right
- Agent display name: `Podstack Support`
- Avatar: Upload Podstack logo

Click **Save**.

- [ ] **Step 2: Set operating hours**

Navigate to: **Administration → Chat Widget → Operating Hours**

- Enable operating hours
- Set your team's working hours and timezone (IST — Asia/Kolkata)
- Enable "Show offline form when offline": Yes

Click **Save**.

- [ ] **Step 3: Verify widget appears on both sites**

Open `https://podstack.ai` in a browser — confirm orange chat bubble appears bottom-right.
Open `https://cloud.podstack.ai` and log in — confirm chat bubble appears bottom-right.

---

## Task 4: Tawk.to admin — Pre-chat & offline forms

> Performed in the tawk.to dashboard — no code changes.

- [ ] **Step 1: Configure pre-chat form for cloud.podstack.ai**

Navigate to: **Administration → Chat Widget → Pre-Chat Form**

Enable pre-chat form. Set fields:
- Name — Required
- Email — Required
- Topic — Dropdown (Required): `Billing`, `Compute`, `Storage`, `AI Studio`, `Other`

Under **Visibility**, set the form to show only when URL contains `cloud.podstack.ai`.

Click **Save**.

- [ ] **Step 2: Configure offline form**

Navigate to: **Administration → Chat Widget → Offline Form**

Enable offline form. Set fields:
- Name — Required
- Email — Required  
- Message — Required

Set the thank-you message to:
> "Thanks! We'll get back to you within 24 hours. For urgent issues email support@podstack.ai"

Click **Save**.

- [ ] **Step 3: Test offline form**

Set yourself as offline in tawk.to. Open `https://podstack.ai`, open the chat widget, and submit the offline form. Confirm the submission appears in the tawk.to inbox with correct fields.

---

## Task 5: Tawk.to admin — Contact tags

> Performed in the tawk.to dashboard — no code changes.

Tawk.to doesn't support automatic URL-based tagging on the free plan. Agents apply tags manually during or after conversations.

- [ ] **Step 1: Confirm tags exist in tawk.to**

Navigate to: **Contacts → Tags** (or create tags when first labelling a contact).

Create two tags if not present:
- `Lead`
- `Support`

- [ ] **Step 2: Add tagging protocol to agent briefing doc**

Create `docs/support/agent-briefing.md`:

```markdown
# Agent Tagging Protocol

After every conversation, tag the contact in tawk.to Contacts:

| Source | Tag to apply |
|---|---|
| podstack.ai (landing site visitor) | `Lead` |
| cloud.podstack.ai (logged-in user) | `Support` |

You can tell the source from the `source` attribute shown in the visitor info panel:
- `source: customer-portal` → Support
- No source attribute → Lead
```

- [ ] **Step 3: Commit briefing doc**

```bash
cd ~/Podstack
git add docs/support/agent-briefing.md
git commit -m "docs: add agent tagging protocol for tawk.to lead vs support contacts"
```

---

## Task 6: Tawk.to admin — 8 proactive triggers

> Performed in the tawk.to dashboard at **Messaging → Triggers → New Trigger**.

Create each trigger below. For each: set **Conditions** → **URL** → **Contains** the listed path, set the **Time on Page** delay, enable the trigger, and set the message.

- [ ] **Trigger 1: Welcome (Landing site)**

- Name: `Welcome - Landing`
- Condition: URL contains `podstack.ai` AND time on page > `15` seconds
- Message: `Hey! Looking for affordable GPU compute? I can help you get started or answer any questions.`
- Enable: Yes → Save

- [ ] **Trigger 2: Pricing nudge**

- Name: `Pricing - Nudge`
- Condition: URL contains `podstack.ai/pricing` AND time on page > `20` seconds
- Message: `GPU pricing can get confusing — I can break down exactly what you'd pay for your workload. What are you building?`
- Enable: Yes → Save

- [ ] **Trigger 3: Dashboard idle**

- Name: `Dashboard - Idle`
- Condition: URL contains `cloud.podstack.ai/portal` AND time on page > `60` seconds
- Message: `Need help with anything? I'm just a message away.`
- Enable: Yes → Save

- [ ] **Trigger 4: Billing page**

- Name: `Dashboard - Billing`
- Condition: URL contains `cloud.podstack.ai/billing`
- Message: `Questions about your wallet or billing? I can help with top-ups, invoices, and cost optimization.`
- Enable: Yes → Save

- [ ] **Trigger 5: Pods/Platform**

- Name: `Dashboard - Pods`
- Condition: URL contains `cloud.podstack.ai/platform` AND time on page > `90` seconds
- Message: `Pods or VMs taking longer than expected? I can help troubleshoot.`
- Enable: Yes → Save

- [ ] **Trigger 6: AI Studio**

- Name: `Dashboard - AI Studio`
- Condition: URL contains `cloud.podstack.ai/ai-studio` AND time on page > `60` seconds
- Message: `Fine-tuning or deploying a model? Happy to walk you through it.`
- Enable: Yes → Save

- [ ] **Trigger 7: Marketplace**

- Name: `Dashboard - Marketplace`
- Condition: URL contains `cloud.podstack.ai/marketplace` AND time on page > `30` seconds
- Message: `Looking for the right GPU? I can help you pick based on your workload.`
- Enable: Yes → Save

- [ ] **Trigger 8: Notebooks**

- Name: `Dashboard - Notebooks`
- Condition: URL contains `cloud.podstack.ai/notebooks` AND time on page > `45` seconds
- Message: `Setting up a notebook? I can help with setup or troubleshooting.`
- Enable: Yes → Save

- [ ] **Verify all 8 triggers are enabled**

Navigate to **Messaging → Triggers** and confirm all 8 triggers show as Active.

---

## Task 7: Tawk.to admin — 30 canned responses (shortcuts)

> Performed in the tawk.to dashboard at **Messaging → Canned Responses → New Canned Response**.

For each entry: set the **Shortcut** and **Message** exactly as listed.

- [ ] **Account & Onboarding (3 responses)**

| Shortcut | Message |
|---|---|
| `welcome` | `Welcome to Podstack! I'm here to help. Are you looking to get started, or do you have a specific question about our platform?` |
| `signup` | `Getting started is easy — head to podstack.ai, create an account, verify your email, add funds to your wallet, and deploy your first GPU pod in minutes.` |
| `otp` | `OTP codes expire after 10 minutes. Click 'Resend OTP' for a fresh one. If it's still not arriving, check your spam folder or reply with your email and we'll look into it.` |

- [ ] **Billing & Wallet (4 responses)**

| Shortcut | Message |
|---|---|
| `topup` | `To add funds: go to cloud.podstack.ai/billing, click 'Add Funds', and pay via UPI, card, or net banking through Razorpay. Your balance updates instantly.` |
| `suspended` | `Your resources were suspended due to a low wallet balance. Top up at cloud.podstack.ai/billing to resume them immediately.` |
| `invoice` | `You can download invoices from cloud.podstack.ai/billing under Transaction History.` |
| `pricing` | `Pods and VMs are billed per-second while running. Storage is billed hourly. Inference is per-token. You only pay for what you use — no contracts.` |

- [ ] **Compute — Pods & VMs (4 responses)**

| Shortcut | Message |
|---|---|
| `podpending` | `A pod stuck in Pending usually means: (1) insufficient wallet balance, (2) the selected GPU is unavailable — try a different type, or (3) resource limits are too high. Which GPU were you trying to use?` |
| `podcreating` | `If your pod is stuck in Creating, it's likely pulling a large Docker image — this can take 10+ minutes. If it's been over 20 minutes, let me know the image name and pod ID.` |
| `ssh` | `To SSH in: make sure your pod is in Running state, your SSH key is added under Account Settings, and the SSH port (22) is exposed. What error are you seeing?` |
| `gpu` | `We support NVIDIA A100 (40/80GB), H100 (80GB), H200 (141GB), L40S (48GB), V100 (16/32GB), and T4 (16GB). Which workload are you optimizing for?` |

- [ ] **Storage (2 responses)**

| Shortcut | Message |
|---|---|
| `bucket` | `S3-compatible buckets are available at cloud.podstack.ai/portal. Buckets support public/private access and are billed hourly by capacity.` |
| `nfs` | `NFS volumes can be mounted across pods and VMs for shared persistent storage. Create one under Storage in your project dashboard.` |

- [ ] **AI Studio & Inference (2 responses)**

| Shortcut | Message |
|---|---|
| `finetune` | `To fine-tune a model: go to AI Studio → browse the model catalog → select a base model → create a fine-tuning job with your dataset and parameters. Need help choosing between Unsloth (fast LoRA) and Axolotl (full fine-tuning)?` |
| `inference` | `Our Inference API is OpenAI-compatible. Deploy a model from the catalog at cloud.podstack.ai/infer and use it with your existing OpenAI SDK — just swap the base URL.` |

- [ ] **Documentation (10 responses)**

| Shortcut | Message |
|---|---|
| `docs` | `Our full documentation is at https://docs.podstack.ai/ — covers getting started through advanced MLOps workflows.` |
| `docs-pods` | `Pod setup guide: https://docs.podstack.ai/compute/pods — creation, SSH, custom Docker images, and scaling.` |
| `docs-vms` | `VM setup guide: https://docs.podstack.ai/compute/vms — OS selection, GPU passthrough, SSH, and persistent storage.` |
| `docs-billing` | `Billing guide: https://docs.podstack.ai/billing — top-up, invoices, run-rate projections, and cost optimization.` |
| `docs-cli` | `CLI guide: https://docs.podstack.ai/developer/cli — install via brew, curl, or winget. Auth, commands, CI/CD.` |
| `docs-sdk` | `Python SDK docs: https://docs.podstack.ai/developer/sdk — typing, async/await, retry logic, IDE autocomplete.` |
| `docs-aistudio` | `AI Studio guide: https://docs.podstack.ai/ai-studio — fine-tuning, inference deployment, experiment tracking.` |
| `docs-storage` | `Storage guide: https://docs.podstack.ai/storage — S3 buckets, NFS volumes, permissions, mounting.` |
| `docs-api` | `REST API reference: https://docs.podstack.ai/developer/api — JWT auth and Swagger docs.` |
| `selfhelp` | `Most common issues are covered at https://docs.podstack.ai/ — search your topic first. If you're still stuck, I'm here.` |

- [ ] **Escalation (2 responses)**

| Shortcut | Message |
|---|---|
| `escalate` | `Let me connect you with our support team. Could you share your account email, the resource ID (pod/VM/bucket), and a brief description of the issue? We'll get this sorted.` |
| `offline` | `Our team is currently offline but we'll get back to you within 24 hours. You can also email us at support@podstack.ai. Please include your account email and resource ID for faster resolution.` |

- [ ] **Verify all 27 canned responses exist**

Navigate to **Messaging → Canned Responses** and confirm all entries are listed with correct shortcuts.

---

## Task 8: End-to-end verification

- [ ] **Test 1: Landing site trigger fires**

Open `https://podstack.ai` in an incognito window. Wait 20 seconds. Confirm the chat bubble shows a proactive message: *"Hey! Looking for affordable GPU compute?..."*

- [ ] **Test 2: Pricing trigger fires**

Navigate to `https://podstack.ai/pricing`. Wait 25 seconds. Confirm pricing nudge message appears.

- [ ] **Test 3: Dashboard widget visible after login**

Log in at `https://cloud.podstack.ai`. Confirm chat bubble is visible in bottom-right corner (not hidden).

- [ ] **Test 4: Dashboard billing trigger fires**

Navigate to `cloud.podstack.ai/billing`. Confirm billing trigger message appears within 5 seconds.

- [ ] **Test 5: Pre-chat form appears on dashboard**

Start a new chat on `cloud.podstack.ai`. Confirm pre-chat form shows Name, Email, and Topic dropdown before chat opens.

- [ ] **Test 6: Offline form works**

Set yourself offline in tawk.to dashboard. Open `https://podstack.ai`, open chat, submit offline form. Confirm entry appears in tawk.to inbox with Name, Email, Message fields populated.

- [ ] **Test 7: Canned response shortcut works**

In an active chat in the tawk.to agent dashboard, type `#topup` and confirm the full wallet top-up message appears for insertion.

- [ ] **Test 8: Visitor attributes visible**

In an active chat from `cloud.podstack.ai`, confirm the agent sidebar shows: `source: customer-portal`, `page: /portal`, user name, and email.

---

## Agent Briefing Summary

Share `docs/support/agent-briefing.md` with all support agents before going live. Key points:
- Tag contacts: `Lead` for podstack.ai visitors, `Support` for cloud.podstack.ai users
- Use `#escalate` when issue needs follow-up via email
- Use `#offline` when signing off mid-conversation
- All shortcut keys use no `#` prefix in tawk.to (type `topup` not `#topup` in the agent interface)

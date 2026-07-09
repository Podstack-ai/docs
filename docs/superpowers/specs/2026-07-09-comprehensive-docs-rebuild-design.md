# PodStack Documentation — Ground-Up Rebuild (Master Spec)

**Date:** 2026-07-09
**Status:** Approved (architecture); executing domain-by-domain
**Owner:** saurav

## Goal

Rebuild the PodStack user documentation (Hugo site at `~/Podstack/docs`) from
the ground up into one of the most comprehensive, scenario-driven user docs
sets available for a GPU cloud. Every user-facing capability gets a
step-by-step guide with a **Console path** and, where it exists, a **CLI/API**
equivalent. Content is sourced from and verified against real code, never
invented.

## Sources of Truth (in priority order)

1. **Backend** — `~/Podstack/podstack-core-backend/services/*` — authoritative
   feature list, routes, limits, error cases. 23 services; customer-relevant:
   auth, consent, platform, gpu-marketplace, notebook, registry, ai-studio,
   ai-studio-worker, inference, billing, pipeline-worker, sandbox, agent-cloud,
   drive-proxy, governance, notification.
2. **Frontend portals** — `~/Podstack/dashboard-core/*` — the actual user flow,
   field/label names, states. Customer-facing portals: `customer-portal`,
   `inference-portal`, `training-portal`, `agent-cloud`. (`admin-portal` and
   the industry-vertical portals are **out of scope**.)
3. **CLI** — `~/Podstack/podstack-cli/cmd/*` + `internal/*` — exact commands and
   flags. Verify against **source**, not the stale README.
4. **Landing / positioning** — `~/Podstack/landing-site` + `public/llms.txt` —
   product naming (QuickPods, TrainPods, Inference, DC Suite), positioning,
   pricing stance (sales-led, per-second, zero egress, ISO 27001).

**Rule:** Author only what is confirmed in code. Anything unconfirmed is flagged
in the domain's feature-inventory note as "unverified — confirm" rather than
written into docs.

## Information Architecture (10 domains)

Rebuild the sidebar (`data/en/docs/sidebar.yml`) and `content/en/docs/` around
these top-level sections. Industry-vertical portals are excluded.

1. **Getting Started** — account creation, KYC, dashboard tour, projects, teams,
   SSH keys, first pod, first inference call, first CLI command.
2. **Products Overview** — QuickPods · TrainPods · Inference · DC Suite as entry
   points that cross-link into the scenario domains below.
3. **Compute** — Pods, VMs (+ pools, snapshots), Baremetal, Sandboxes,
   GPU Marketplace, Fractional GPU, Time-Travel Notebooks, Templates,
   Cloud-init.
4. **Storage** — Object Storage (S3-compatible), Data Volumes, NFS,
   PodStack Drive.
5. **AI Studio / MLOps** — fine-tuning, experiments, evaluation, model registry,
   deployments, pipelines, monitoring/drift, schedules, approvals.
6. **Inference** — model catalog, API keys, playground, usage, OpenAI-compatible
   serving, autoscaling, serverless.
7. **CLI** — full command reference + scenarios: `auth`, `code` (AI coding
   agent), `send`/`receive` (P2P transfer), `models`, `train`, `gpu`
   (instances/pricing/ssh), `launch`. Verified against source.
8. **Agent Cloud** — specs, runs, actions, endpoints, webhooks.
9. **Billing** — wallet, invoices, pricing, currency (INR/USD), coupons, KYC,
   spend limits, project billing transfer.
10. **DC Suite (Operators)** — platform licensing, orchestration, BillOps/FinOps,
    self-hosted/in-house deployment (helm charts).

**Container Images** (28 existing pages) is current — keep and cross-link; do
not rebuild.

## Page Template (every scenario page)

```
Title + one-line goal
→ What you'll accomplish / When to use this
→ Prerequisites (account state, project, KYC, wallet, quotas)
→ Steps: numbered — Console path first, then CLI/API equivalent
→ Verify (how to confirm it worked)
→ Troubleshoot (real error cases from the backend)
→ Related pages / Next steps
```

Conventions:
- TOML frontmatter with `---` delimiters (matches existing repo convention).
- Every feature documents both **Console (dashboard)** and, where it exists,
  **CLI/API** paths.
- Screenshots referenced as placeholders (e.g. `> _Screenshot: ..._`) until real
  captures are added; never block on missing images.
- Cross-link liberally with `Related` sections.
- Build must pass: `hugo --minify` after each domain.

## Execution Model (sequential, domain-by-domain)

Each domain is its own execution unit:

1. **Inventory** — read backend routes + frontend pages (+ CLI) for the domain;
   write a short feature-inventory note (scratchpad) listing confirmed features,
   flows, limits, and error cases; flag anything unverified.
2. **Author** — write `_index.md` + scenario pages per the template.
3. **Wire** — update `data/en/docs/sidebar.yml`.
4. **Verify** — run `hugo --minify`; confirm pages render and links resolve.
5. **Checkpoint** — pause at the domain boundary for user review before the next
   domain.

### Build order (dependency-first)

1. Getting Started → 2. Compute → 3. Storage → 4. CLI → 5. Inference →
6. AI Studio/MLOps → 7. Billing → 8. Agent Cloud → 9. Products Overview →
10. DC Suite

Getting Started and Compute first (everything depends on them); Products
Overview near the end so it can cross-link finished scenarios; DC Suite last.

## Handling the Stale CLI Docs

Existing CLI pages (`pods.md`, `storage.md`, `wallet-and-pricing.md`, etc.)
describe an older pod-management CLI. Audit each against `podstack-cli` source;
remove a page only when the source confirms the command no longer exists.
Preserve any still-valid guidance by folding it into the refreshed CLI domain.

## Out of Scope

- `admin-portal` and industry-vertical portals (pharma, defense, gaming,
  robotics, governance, annotation, animation) and their backend services.
- Internal/operator-only admin flows.
- Rebuilding the current Container Images pages.

## Success Criteria

- All 10 domains authored with scenario pages following the template.
- Every documented step traceable to backend/frontend/CLI source.
- `hugo --minify` builds clean after each domain.
- Sidebar reflects the new IA; no dangling links.
- Stale CLI content removed or refreshed against source.

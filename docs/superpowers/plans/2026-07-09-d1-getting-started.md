# Domain 1 — Getting Started: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the "Getting Started" documentation domain (account, KYC, dashboard, projects, teams, SSH keys, settings, first-pod quick start) from verified source, following the master-spec page template.

**Architecture:** Hugo markdown pages under `content/en/docs/{getting-started,projects,account}/` with YAML `---` frontmatter. Content is grounded in the verified feature inventory (email-OTP + OAuth auth, Didit/QuickeKYC, project-scoped `X-Project-Id`, invitation OTP flow, SSH key prepaid/postpaid caps). Each page = Goal → Prerequisites → Steps (Console first, then CLI/API) → Verify → Troubleshoot → Related. The "test cycle" for docs is a clean `hugo --minify` build plus a rendered-page/link check.

**Tech Stack:** Hugo static site generator; YAML frontmatter; `data/en/docs/sidebar.yml` navigation.

## Global Constraints

- Frontmatter delimiter is `---` (YAML), NOT `+++` — matches existing repo pages. Include `title`, `weight`, `description`, and `keywords` (list).
- Author ONLY facts confirmed in the inventory. Items flagged UNVERIFIED (needs_country UI step, project billing-transfer UI, `/kyc/callback` route) must NOT be presented as working UI; either omit or mark as "via API only."
- Money/currency: portal defaults to INR (₹) with an INR/USD toggle in Profile Settings; pricing is sales-led, per-second. Do not invent prices.
- Auth is passwordless (email 6-digit OTP, 10-min expiry, single-use; + Google/GitHub/Microsoft OAuth when configured). There is NO password anywhere.
- CLI authenticates with an API key (`psk_` prefix / `PODSTACK_API_KEY`), minted in dashboard Settings → Tokens (max 5, default 30-day expiry). CLI does NOT do email/OAuth login.
- Every page must build clean: run `hugo --minify` from `~/Podstack/docs` after each task; expect exit 0 and no ERROR lines.
- Keep existing SEO keyword style (cheap/affordable GPU cloud framing) in `keywords` where natural.

---

### Task 1: Restructure sidebar for Getting Started domain

**Files:**
- Modify: `data/en/docs/sidebar.yml` (Getting Started, Projects sections; add account pages under a "Your Account" grouping)

**Interfaces:**
- Produces: final slugs every later task's page must match:
  - getting-started: `creating-account`, `identity-verification`, `dashboard-overview`, `quick-start`
  - projects: `creating-projects`, `team-management`
  - account: `settings`, `ssh-keys`, `api-tokens`, `audit-logs`

- [ ] **Step 1:** Update the `Getting Started` section in `sidebar.yml` to list: Creating Your Account (`creating-account`), Identity Verification (KYC) (`identity-verification`), Dashboard Overview (`dashboard-overview`), Quick Start Guide (`quick-start`).
- [ ] **Step 2:** Ensure a `Projects` section lists: Creating & Switching Projects (`creating-projects`), Team Management (`team-management`).
- [ ] **Step 3:** Ensure an account grouping (title "Your Account", slug `account`) lists: Settings (`settings`), SSH Keys (`ssh-keys`), API Tokens (`api-tokens`), Audit Logs (`audit-logs`).
- [ ] **Step 4:** Run `hugo --minify`; expect exit 0, no ERROR.
- [ ] **Step 5:** Commit: `git add data/en/docs/sidebar.yml && git commit -m "docs(getting-started): restructure sidebar for D1"`

---

### Task 2: Getting Started index (`getting-started/_index.md`)

**Files:**
- Modify: `content/en/docs/getting-started/_index.md`

- [ ] **Step 1:** Rewrite as a domain landing page: what PodStack is (proprietary GPU cloud, fractional GPUs, per-second, zero egress, ISO 27001), the 4 products (QuickPods/TrainPods/Inference/DC Suite) one line each, and a "New here? Follow this path" ordered list linking: Create account → Verify identity → Create a project → Add an SSH key → Launch your first pod (Quick Start).
- [ ] **Step 2:** Keep/refresh frontmatter (`title`, `weight: 10`, `description`, `keywords`).
- [ ] **Step 3:** `hugo --minify` → exit 0.
- [ ] **Step 4:** Commit.

---

### Task 3: Creating your account (`getting-started/creating-account.md`)

**Files:**
- Modify: `content/en/docs/getting-started/creating-account.md`

Content grounded in inventory §1–§2:

- [ ] **Step 1:** Write "What you'll accomplish": create a PodStack account and sign in (no separate signup — first login creates the account).
- [ ] **Step 2:** Prerequisites: a real (non-disposable) email; a modern browser.
- [ ] **Step 3:** Steps — **Email OTP path**: go to the portal → enter email → "Continue with Email" → check inbox for 6-digit code (expires in 10 minutes, single-use) → enter code → "Verify & Sign In". Note account auto-creation and 7-day session.
- [ ] **Step 4:** Steps — **OAuth path**: "Continue with Google / GitHub / Microsoft" (availability depends on configuration); one-click, converges to the same session.
- [ ] **Step 5:** Note on currency/country: preferred currency (INR/USD) is chosen later in Settings → Profile (do NOT claim a country step at login — UNVERIFIED).
- [ ] **Step 6:** Verify: you land on the dashboard; your email shows in the top-right/profile.
- [ ] **Step 7:** Troubleshoot: disposable/temporary emails are rejected ("please use a permanent email"); OTP expired → request a new one; didn't get the code → check spam, retry.
- [ ] **Step 8:** Related: Identity Verification, Dashboard Overview. Commit.

---

### Task 4: Identity verification / KYC (`getting-started/identity-verification.md`)

**Files:**
- Create: `content/en/docs/getting-started/identity-verification.md`

Content grounded in inventory §3:

- [ ] **Step 1:** Goal + when it's required: KYC is required before provisioning GPU compute, VMs, storage/buckets, NFS, sandboxes, baremetal, and before adding SSH keys or funding the wallet (when enforcement is enabled). CPU-only containers may be allowed pre-KYC (soft check). Reads (viewing pricing, wallet, projects, SSH key list) work before KYC.
- [ ] **Step 2:** Prerequisites: a signed-in account.
- [ ] **Step 3:** Steps — **Global (Didit)**: Settings/KYC page → "Start Verification" → a Didit-hosted tab opens for ID verification + liveness + face match → complete → return; status auto-refreshes (~30s). States: Not Started → In Progress → In Review → Approved (or Declined/Expired/Abandoned).
- [ ] **Step 4:** Steps — **India (QuickeKYC)**: document form (PAN `AAAAA9999A`, Aadhaar 12 digits, GST, PIN 6 digits) with validation.
- [ ] **Step 5:** Verify: KYC status shows "Verified"/"Approved"; the amber KYC banner disappears; compute actions unlock.
- [ ] **Step 6:** Troubleshoot: In Review → email support@podstack.ai; Declined → retry with valid documents; a `KYC_REQUIRED` prompt on any action means verify first.
- [ ] **Step 7:** Related: Creating Projects, Wallet & Billing. Commit.

---

### Task 5: Dashboard overview (`getting-started/dashboard-overview.md`)

**Files:**
- Modify: `content/en/docs/getting-started/dashboard-overview.md`

Content grounded in inventory §7:

- [ ] **Step 1:** Goal: understand the home dashboard.
- [ ] **Step 2:** Tour: Expenditure cards (Current Usage, Run Rate ₹/hr with pods/vms/nfs/buckets breakdown, Projected Monthly); Stat cards (Wallet Balance, Active Pods, Volumes, Buckets); Charts (Weekly Spending Trend, Monthly Breakdown by Resource); Recent Projects (top 5).
- [ ] **Step 3:** New-user state: zeros, empty chart, "No projects yet", project-onboarding modal, KYC banner (if enforcement on), recharge modal on negative balance.
- [ ] **Step 4:** Where each card links (Wallet, Pods, Volumes, Storage).
- [ ] **Step 5:** `hugo --minify`; commit.

---

### Task 6: Creating & switching projects (`projects/creating-projects.md`) + index

**Files:**
- Modify: `content/en/docs/projects/_index.md`, `content/en/docs/projects/creating-projects.md`

Content grounded in inventory §4:

- [ ] **Step 1:** `_index.md`: projects are the top-level scope — every resource (pods, volumes, keys, spend) belongs to a project via the `X-Project-Id` context; billing rolls up per project.
- [ ] **Step 2:** `creating-projects.md` Goal + Prereq (signed-in; KYC required to create when enforcement on).
- [ ] **Step 3:** Steps — Create: Projects → "Create Project" → name (required) + description → create; creator becomes project admin. Switch: use the project switcher (selection is saved to your profile server-side).
- [ ] **Step 4:** Manage/Delete: update/delete require admin; deleting a project with active resources is blocked (you must remove resources first).
- [ ] **Step 5:** Billing ownership: each project has a billing owner (defaults to creator). Note billing transfer is available via API (mark as API-only; no confirmed UI control).
- [ ] **Step 6:** Verify + Troubleshoot ("cannot delete: active resources"; "not a member" when switching). Related: Team Management. Commit.

---

### Task 7: Team management & invitations (`projects/team-management.md`)

**Files:**
- Modify: `content/en/docs/projects/team-management.md`

Content grounded in inventory §5:

- [ ] **Step 1:** Goal: invite teammates to a project and manage roles.
- [ ] **Step 2:** Roles: **Admin** (`project_admin`, full CRUD) and **Member** (`project_user`, read-only by default; optional custom create/read/update/delete permissions).
- [ ] **Step 3:** Steps — Invite: Project Settings → Members/Invitations → "Invite" → email + role → send. Invitee receives an email link → opens it → enters an OTP → becomes a member (account auto-created if new).
- [ ] **Step 4:** Manage invites: resend (new 24h link) or revoke pending invites; change member permissions; owner cannot be removed.
- [ ] **Step 5:** Rules/limits: invitations expire in 24 hours; one pending invite per email (revoke to re-invite).
- [ ] **Step 6:** Verify + Troubleshoot ("already a member", "pending invitation exists", "invitation expired", "invalid or expired OTP"). Commit.

---

### Task 8: SSH keys (`account/ssh-keys.md`)

**Files:**
- Modify: `content/en/docs/account/ssh-keys.md`

Content grounded in inventory §6:

- [ ] **Step 1:** Goal: add an SSH key to access pods/VMs.
- [ ] **Step 2:** Steps — **Generate in-platform**: SSH Keys → Generate → name + type (`ed25519` or `rsa` 2048–4096, default 4096) → **download the private key now (shown once)**. **Upload existing**: paste your public key + name. First key becomes default; set default with the star/default action.
- [ ] **Step 3:** Limits: **Prepaid accounts = 1 SSH key; Postpaid = 20.** New accounts start prepaid → complete KYC and upgrade to postpaid for more. Over-limit returns an upgrade prompt (HTTP 402).
- [ ] **Step 4:** Download private key later: only possible for platform-generated keys (PEM).
- [ ] **Step 5:** Verify + Troubleshoot: duplicate name/fingerprint (409), invalid public-key format (400), delete blocked while a pod uses the key. Related: CLI `podstack gpu` SSH, Pods. Commit.

---

### Task 9: Settings — profile, security, currency (`account/settings.md`) + account index

**Files:**
- Modify: `content/en/docs/account/_index.md`, `content/en/docs/account/settings.md`

Content grounded in inventory §8:

- [ ] **Step 1:** `_index.md`: brief map of account settings (Profile, Security, Tokens, Notifications, Appearance).
- [ ] **Step 2:** `settings.md` Profile: name, phone, timezone, photo (JPG/PNG/GIF/WebP ≤2MB), country, **Preferred Currency toggle INR|USD (default INR)** — the only place currency is set.
- [ ] **Step 3:** Security: passwordless email-OTP explained; active **sessions** list with revoke / revoke-others; no password or 2FA to manage.
- [ ] **Step 4:** Appearance/Notifications: theme (dark supported; light coming soon), density, sidebar; notification category toggles.
- [ ] **Step 5:** `hugo --minify`; commit.

---

### Task 10: API tokens for the CLI/API (`account/api-tokens.md`)

**Files:**
- Modify: `content/en/docs/account/api-tokens.md`

Content grounded in inventory §1 (CLI) + §8 (Tokens):

- [ ] **Step 1:** Goal: create an API token to use the `podstack` CLI and the REST/OpenAI-compatible API.
- [ ] **Step 2:** Steps: Settings → Tokens → "Create" → name + expiry (7/30/90/180/365 days or never; default 30) → **copy the token now (`psk_…`, shown once)**. Max 5 tokens.
- [ ] **Step 3:** Use it: `podstack auth login` (paste the key) or `export PODSTACK_API_KEY=psk_…`; verify with `podstack auth whoami`. Stored at `~/.config/podstack/credentials.json` (0600).
- [ ] **Step 4:** Revoke: delete a token to invalidate it immediately.
- [ ] **Step 5:** Verify + Related (CLI Authentication). Commit.

---

### Task 11: Audit logs (`account/audit-logs.md`) — audit against source

**Files:**
- Modify: `content/en/docs/account/audit-logs.md`

- [ ] **Step 1:** Confirm the AuditLogs feature exists (frontend `pages/AuditLogs.tsx`). Document what it shows (actions, actor, timestamp, resource) at the level the page supports; if backend detail is thin, keep it concise and mark any assumption for later verification.
- [ ] **Step 2:** Goal, where to find it, how to filter/read entries.
- [ ] **Step 3:** `hugo --minify`; commit.

---

### Task 12: Quick Start — first pod end-to-end (`getting-started/quick-start.md`)

**Files:**
- Modify: `content/en/docs/getting-started/quick-start.md`

- [ ] **Step 1:** Goal: from zero to a running GPU pod in ~10 minutes, tying the domain together.
- [ ] **Step 2:** Ordered end-to-end: sign in → verify identity (KYC) → create a project → add an SSH key → fund wallet (brief, link to Billing) → launch a pod (brief Console steps, link to Compute → Pods for depth) → connect via SSH.
- [ ] **Step 3:** Include the CLI alternative for the launch step (`podstack launch` / `podstack gpu instances create`) as a pointer to the CLI domain (do not deep-document here).
- [ ] **Step 4:** "What's next" links into Compute, Storage, Inference.
- [ ] **Step 5:** `hugo --minify`; final full build check (expect ~same page count + new pages, no ERROR). Commit.

---

### Task 13: Domain verification & checkpoint

- [ ] **Step 1:** Run `hugo --minify` and confirm exit 0, no ERROR/WARN about the new pages.
- [ ] **Step 2:** Grep the generated `public/` for each new slug to confirm pages rendered (e.g. `identity-verification`, `api-tokens`).
- [ ] **Step 3:** Scan for dangling internal links added in this domain.
- [ ] **Step 4:** Summarize what was authored + any UNVERIFIED items needing user confirmation; pause for user review before Domain 2 (Compute).

## Self-Review

- **Spec coverage:** Covers master-spec Domain 1 (account, KYC, dashboard, projects, teams, SSH keys, settings, first pod). Billing is only linked (its own domain). ✓
- **Placeholder scan:** No TBDs; each task states concrete content from the inventory. ✓
- **Type consistency:** Slugs in Task 1 match the page filenames in Tasks 2–12. ✓
- **UNVERIFIED handling:** needs_country UI, project billing-transfer UI, `/kyc/callback` are explicitly kept out of "working UI" claims. ✓

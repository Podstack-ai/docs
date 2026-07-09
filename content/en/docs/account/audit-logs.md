---
title: Audit Logs

weight: 40
description: "Review activity in your PodStack project with audit logs — create, update, delete, start/stop, login, and invite events across pods, VMs, buckets, NFS, SSH keys, and members, with live streaming and filters."
keywords:
  - PodStack audit logs
  - cloud activity logs
  - project audit trail
  - compliance logging GPU cloud
  - who did what cloud
---
# Audit Logs

Audit logs record activity in your project — who did what, to which resource,
and when. New events stream in **live** as they happen.

## What you'll accomplish

Find and filter the activity trail for a project.

## Where to find it

Open **Audit Logs** from the navigation. Logs are shown for your currently
selected project (you can switch the project from the filter bar).

## What each entry shows

- **Action** — e.g. `create`, `update`, `delete`/`remove`, `start`, `stop`, `scale`, `connect`, `login`, `logout`, `invite`, `join` (color-coded).
- **Resource type** — container (pod), VM, bucket, NFS, SSH key, template, user, or project member.
- **Resource name** — the specific resource affected.
- **Timestamp** — when it happened (hover for the full date/time).

## Filter and search

Narrow the list with:

- **Project** — switch which project's logs you're viewing.
- **Search** — free text over user, resource name, and action.
- **Action** — limit to a single action type.
- **Resource Type** — limit to one kind of resource.

New events appear at the top in real time via a live connection, so you can
watch activity as it occurs.

## Verify it worked

- Perform an action (e.g. start a pod) and confirm a matching entry appears.
- Applying a filter narrows the list accordingly.

## Related

- [Team Management](/docs/projects/team-management/) — control who can act in a project.
- [Settings → Security](/docs/account/settings/) — review and revoke sessions.

---
title: Team Management

weight: 20
description: "Invite teammates to a PodStack project and manage roles. Admins and members, email-invite plus one-time-code accept flow, permissions, and 24-hour invitation expiry."
keywords:
  - GPU cloud team invite
  - project roles permissions
  - invite teammate cloud
  - RBAC project members
  - cloud team collaboration
---
# Team Management

Invite teammates into a project and control what they can do. Invitations use
the same passwordless flow as sign-in — teammates accept with a one-time code.

## What you'll accomplish

Invite a teammate, assign their role, and manage members and pending invites.

## Prerequisites

- You must be a **project admin** of the project.
- The teammate's email address.

## Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access — create, read, update, and delete resources, and manage members. |
| **Member** | Read-only by default. You can grant specific create/read/update/delete permissions. |

Granting any write permission to a member effectively promotes them toward admin
capabilities; leave them read-only to keep them view-only. The project **owner
cannot be removed**.

## Invite a teammate

1. Open **Project Settings → Members / Invitations**.
2. Choose **Invite**.
3. Enter the teammate's **email** and pick a **role** (optionally set custom permissions).
4. Send the invitation.

The invitee receives an email with a link. When they open it, PodStack emails a
**one-time code**; they enter it to accept and become a member. If they don't
have a PodStack account yet, one is created automatically on accept.

> _Screenshot: Invite member dialog with role selector._

## Manage members and invitations

- **Resend** a pending invite — generates a fresh link with a renewed expiry.
- **Revoke** a pending invite.
- **Change permissions** for an existing member.
- **Remove** a member (except the owner).

## Rules & limits

- Invitations **expire after 24 hours**.
- Only **one pending invitation per email** — revoke the existing one to re-invite.

## Verify it worked

- The teammate appears in the **Members** list with the assigned role.
- Pending invites show under **Invitations** until accepted, revoked, or expired.

## Troubleshoot

| Message | Meaning |
|---------|---------|
| "User is already a member" | They're already on the project. |
| "A pending invitation already exists" | Revoke it first, then re-invite. |
| "Invitation has expired" | Resend to issue a new 24-hour link. |
| "Invalid or expired code" | The accept code is single-use and time-limited — resend the invite. |

## Next steps

- [Manage projects](/docs/projects/creating-projects/)
- [Audit logs](/docs/account/audit-logs/) to review team activity

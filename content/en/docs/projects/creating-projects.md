---
title: Creating & Switching Projects

weight: 10
description: "Create and switch between PodStack projects. Every resource is project-scoped; the project creator becomes admin and billing owner. Learn create, switch, manage, and delete rules."
keywords:
  - create GPU cloud project
  - switch project cloud
  - project scoped resources
  - delete cloud project
  - project billing owner
---
# Creating & Switching Projects

Every resource on PodStack lives inside a project. This guide covers creating
projects, switching between them, and managing or deleting them.

## What you'll accomplish

Create a project, make it your active context, and understand the rules for
managing and deleting it.

## Prerequisites

- A signed-in account.

## Create a project

1. Go to **Projects**.
2. Choose **Create Project**.
3. Enter a **name** (required) and an optional **description**.
4. Confirm.

The person who creates a project automatically becomes its **admin** and its
**billing owner**.

> _Screenshot: Projects list with the Create Project dialog._

## Switch your active project

Use the **project switcher** to change which project you're working in. Your
selection is **saved to your profile on the server**, so it persists across
devices and sessions. From then on, everything you create lands in the selected
project.

## Manage a project

- **Update** name/description — requires the **admin** role.
- **Members & invitations** — see [Team Management](/docs/projects/team-management/).
- <a id="billing-ownership"></a>**Billing ownership** — each project has a billing owner (the creator by default). Transferring billing ownership is available via the API; there may not be a dedicated control in the portal UI.

## Delete a project

1. Open the project and choose **Delete**.
2. Deletion requires the **admin** role.
3. A project with **active resources cannot be deleted** — remove its pods, VMs, volumes, and other resources first.

## Verify it worked

- The new project appears in your **Projects** list.
- The project switcher shows it as active, and new resources are created under it.

## Troubleshoot

| Problem | Cause / fix |
|---------|-------------|
| "Cannot delete: active resources" | Delete the project's resources, then try again. |
| Switching fails / "not a member" | You must be a member of a project to select it — ask an admin to invite you. |

## Next steps

- [Invite your team](/docs/projects/team-management/)
- [Add an SSH key](/docs/account/ssh-keys/) and [launch a pod](/docs/getting-started/quick-start/)

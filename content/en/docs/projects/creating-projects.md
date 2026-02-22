---
title: Creating Projects
---

# Creating Projects

This guide explains how to create and manage projects on Podstack.

## Create a New Project

1. Navigate to **Projects** in the sidebar
2. Click the **Create Project** button
3. Fill in the project details:
   - **Name**: A descriptive name for the project
   - **Description**: Optional notes about the project's purpose
4. Click **Create**

You'll be automatically assigned as the **Project Admin** for any project you create.

## Project Settings

To modify a project after creation:

1. Go to **Projects** and select the project
2. Click **Settings** or the gear icon
3. Update the name or description
4. Click **Save Changes**

## Switching Projects

The current project context is shown in the header. To switch projects:

1. Click the project name in the header
2. Select a different project from the dropdown
3. The view updates to show resources from the selected project

## Deleting a Project

To delete a project:

1. Ensure all resources (pods, VMs, storage) in the project are deleted
2. Go to **Project Settings**
3. Scroll to the danger zone
4. Click **Delete Project**
5. Confirm the deletion

**Warning**: Project deletion is permanent and cannot be undone.

## Default Project

New accounts have a default project created automatically. You can rename it or create additional projects as needed.

## Billing Ownership

Each project has a billing owner who is charged for all resource usage within the project. By default, the project creator is the billing owner.

### Transferring Billing

To transfer billing responsibility to another project member:
1. Go to **Project Settings**
2. Navigate to the **Billing** section
3. Click **Transfer Billing**
4. Select the new billing owner from the member list
5. Confirm the transfer

The new billing owner must be an active member of the project.

## Project-Scoped Resources

When you create resources, they belong to the currently selected project:

| Resource | Project-Scoped |
|----------|---------------|
| Pods | Yes |
| Virtual Machines | Yes |
| NFS Volumes | Yes |
| Object Storage Buckets | Yes |
| Templates | Yes |
| SSH Keys | No (account-level) |
| API Tokens | No (account-level) |

## Next Steps

After creating a project, [invite team members](/docs/projects/team-management/) to collaborate.

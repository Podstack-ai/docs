---
title: Team Management
---

# Team Management

Collaborate with your team by inviting members to your projects. This guide covers invitations, roles, and permissions.

## Inviting Team Members

### Send an Invitation

1. Navigate to your project
2. Go to **Project Settings** > **Members**
3. Click **Invite Member**
4. Enter the team member's email address
5. Select a role and permissions
6. Click **Send Invitation**

The invitee will receive an email with instructions to join.

### Invitation Status

Invitations can have the following statuses:

| Status | Description |
|--------|-------------|
| **Pending** | Invitation sent, awaiting acceptance |
| **Accepted** | Member has joined the project |
| **Expired** | Invitation expired (24 hours) |
| **Revoked** | Invitation was cancelled |

### Managing Pending Invitations

From the Members tab, you can:
- **Resend** an invitation if it wasn't received
- **Revoke** a pending invitation to cancel it

## Roles and Permissions

### Project Admin

Full control over the project:
- Manage all resources (create, read, update, delete)
- Invite and remove team members
- Modify project settings
- Delete the project

### Project User

Customizable permissions based on your needs:

| Permission | Description |
|------------|-------------|
| **Can Create** | Create new pods, VMs, storage |
| **Can Read** | View resources and their details |
| **Can Update** | Modify existing resources |
| **Can Delete** | Remove resources |

You can enable any combination of these permissions when inviting a user.

## Managing Members

### View Members

Go to **Project Settings** > **Members** to see:
- All current project members
- Their roles and permissions
- Pending invitations

### Update Permissions

To change a member's permissions:

1. Find the member in the list
2. Click the **Edit** button
3. Modify their role or permissions
4. Click **Save**

### Deactivate a Member

To temporarily remove access without deleting the member:

1. Find the member in the list
2. Click **Deactivate**
3. The member loses access but can be reactivated later

### Remove a Member

To permanently remove a member:

1. Find the member in the list
2. Click **Remove**
3. Confirm the removal

The removed member will no longer have access to project resources.

## Accepting an Invitation

If you receive a project invitation:

1. Check your email for the invitation
2. Click the invitation link
3. Verify with OTP (your email)
4. If you don't have an account, one will be created
5. You'll be added to the project with the assigned permissions

Invitations expire after **24 hours**. Request a new invitation if yours has expired.

## Permission Examples

### Read-Only Access
For stakeholders who need visibility but shouldn't modify resources:
- Can Read: Yes
- Can Create: No
- Can Update: No
- Can Delete: No

### Developer Access
For team members who need to work with resources:
- Can Read: Yes
- Can Create: Yes
- Can Update: Yes
- Can Delete: No

### Full Access
For trusted team members who need complete control:
- Can Read: Yes
- Can Create: Yes
- Can Update: Yes
- Can Delete: Yes

## Audit Trail

All team actions are logged in the [Audit Logs](/docs/account/audit-logs/). You can track:
- When members were invited
- Permission changes
- Resource modifications by each member

## Next Steps

With your team set up, explore [Compute resources](/docs/compute/) to start deploying workloads.

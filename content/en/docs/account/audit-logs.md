---
title: Audit Logs
---

# Audit Logs

Audit logs track all activities in your account, providing visibility into who did what and when.

## Viewing Audit Logs

Navigate to **Audit Logs** to see account activity.

### Log Entry Details

Each entry shows:
- **Timestamp**: When the action occurred
- **User**: Who performed the action
- **Action**: What was done
- **Resource**: What was affected
- **Details**: Additional context

## Logged Actions

### Resource Operations

| Action | Description |
|--------|-------------|
| Create | New resource created |
| Update | Resource modified |
| Delete | Resource removed |
| Start | Pod/VM started |
| Stop | Pod/VM stopped |
| Restart | Pod/VM restarted |

### Account Actions

| Action | Description |
|--------|-------------|
| Login | User logged in |
| Logout | User logged out |
| Token Created | API token generated |
| Token Revoked | API token deleted |
| SSH Key Added | New SSH key added |
| SSH Key Deleted | SSH key removed |

### Team Actions

| Action | Description |
|--------|-------------|
| Invite Sent | Team invitation sent |
| Invite Accepted | User joined project |
| Member Removed | User removed from project |
| Permissions Changed | User permissions updated |

## Filtering Logs

### By Action Type

Filter to see specific actions:
- All actions
- Create
- Update
- Delete
- Start/Stop

### By Resource Type

Filter by resource:
- Pods
- Virtual Machines
- Storage
- Projects
- SSH Keys

### By Date Range

Select a time period:
- Last 24 hours
- Last 7 days
- Last 30 days
- Custom range

### By User

For projects with multiple members, filter by specific user.

## Searching Logs

Use the search bar to find specific entries:
- Search by resource name
- Search by action
- Search by user email

## Log Details

Click on a log entry for full details:

### Activity Information
- Exact timestamp
- User who performed action
- User's IP address
- User agent (browser/client)

### Resource Information
- Resource type and ID
- Resource name
- Project context

### Change Details
For updates, see what changed:
- Previous values
- New values
- Modified fields

## Use Cases

### Security Monitoring

Track unauthorized or suspicious activity:
- Unexpected logins
- Resource deletions
- Permission changes
- API token usage

### Debugging

Understand what happened:
- When a resource was modified
- Who made changes
- Configuration history

### Compliance

Maintain audit trail for:
- Access reviews
- Change management
- Incident investigation
- Regulatory compliance

### Team Coordination

Track team activities:
- Who created resources
- Recent changes
- Collaboration patterns

## Exporting Logs

Download logs for external analysis:

1. Apply desired filters
2. Click **Export**
3. Select format (CSV)
4. Download file

Exported logs include:
- All visible entries
- Full details per entry
- Timestamps in UTC

## Log Retention

Audit logs are retained for:
- **Standard accounts**: 90 days
- **Extended retention**: Available for enterprise

Older logs are automatically archived.

## Real-Time Monitoring

Audit logs support real-time streaming via WebSocket:

### Live Updates
- New log entries appear instantly without refreshing
- Logs stream as actions happen across your project
- Visual indicator shows when streaming is active

### Enabling Real-Time Mode
1. Open Audit Logs page
2. Click **Enable Live Updates** or toggle the streaming switch
3. New entries appear automatically at the top
4. Streaming continues until you navigate away or disable it

### Use Cases
- Monitor team activity in real-time
- Watch for specific actions during testing
- Track deployment progress
- Security monitoring during sensitive operations

## Best Practices

### Regular Review

1. Check logs weekly for unusual activity
2. Review after security incidents
3. Audit before compliance reviews

### Alert on Critical Actions

Monitor for:
- Multiple failed logins
- Mass deletions
- Permission escalations
- New API tokens

### Document Incidents

When investigating issues:
1. Filter to relevant time period
2. Identify key events
3. Export for documentation
4. Note findings

## Privacy

Audit logs contain:
- User emails
- IP addresses
- Resource names
- Action details

Access audit logs only for legitimate purposes.

## Next Steps

- [Manage API Tokens](/docs/account/api-tokens/) to control programmatic access
- [Review Settings](/docs/account/settings/) for account configuration

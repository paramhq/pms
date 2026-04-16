# Part 7: Activity & Audit Log

## Features

### 7.1 Issue Activity Log
Every field change on an issue is recorded:

| Event Type | Example Display |
|-----------|----------------|
| created | "SZ created this issue" |
| status_changed | "SZ changed status from To Do → In Progress" |
| assignee_changed | "SZ assigned this to AK" (or "SZ removed assignee") |
| priority_changed | "SZ changed priority from Medium → High" |
| type_changed | "SZ changed type from Task → Bug" |
| title_changed | "SZ changed title" (show old → new in expandable) |
| description_changed | "SZ updated the description" |
| labels_added | "SZ added label bug-fix" |
| labels_removed | "SZ removed label enhancement" |
| story_points_changed | "SZ changed story points from 3 → 5" |
| due_date_changed | "SZ set due date to Apr 21, 2026" |
| due_date_removed | "SZ removed due date" |
| parent_changed | "SZ set parent to PMS-40" |
| comment_added | "SZ commented" (inline preview) |
| attachment_added | "SZ attached report.pdf" |
| attachment_removed | "SZ removed report.pdf" |
| link_added | "SZ linked PMS-42 blocks PMS-45" |
| link_removed | "SZ removed link to PMS-45" |
| issue_moved | "SZ moved this issue from project PMS to MOB" |
| issue_cloned | "SZ cloned this from PMS-30" |

### 7.2 Activity Display
- Each event: avatar + user name + action + relative time
- Compact display: small text, gray, minimal space
- Expandable: click to see full before/after for text changes
- Grouped: consecutive events by same user within 5 minutes grouped together
- Interleaved with comments in "All" tab on issue detail

### 7.3 Project Activity Feed
- Activity across all issues in a project
- Shows: user + action + issue reference + time
- Filterable by: event type, user, date range
- Paginated (infinite scroll, 50 per page)
- Accessible from: project overview page, sidebar link

### 7.4 Workspace Audit Log (Admin only)
- Security-sensitive events:
  - Member invited/removed
  - Role changed
  - Project created/deleted
  - Settings changed
  - 2FA enabled/disabled
  - Login from new device
  - Failed login attempts
- Table view: timestamp, user, action, target, IP address
- Filterable by: user, action type, date range
- Exportable: CSV download
- Retention: configurable (default: 1 year)

## Data Model

```
ActivityEvent {
  id: UUID
  workspace_id: FK → Workspace
  project_id: FK → Project?
  issue_id: FK → Issue?
  actor_id: FK → User
  event_type: string (see event types above)
  field_name: string? (which field changed)
  old_value: text? (JSON serialized)
  new_value: text? (JSON serialized)
  metadata: JSON? (extra context — e.g., target user for assignee change)
  created_at: timestamp
}

-- Indexes:
-- (issue_id, created_at DESC) — for issue activity tab
-- (project_id, created_at DESC) — for project activity feed
-- (workspace_id, created_at DESC) — for audit log
-- (actor_id, created_at DESC) — for "my activity"
```

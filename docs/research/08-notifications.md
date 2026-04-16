# Part 8: Notifications

## Features

### 8.1 Notification Types

| Event | Default: In-App | Default: Email |
|-------|:---------------:|:--------------:|
| Assigned to me | ✅ | ✅ |
| @mentioned in comment | ✅ | ✅ |
| Comment on my issue (reported/assigned) | ✅ | ❌ |
| Comment on watched issue | ✅ | ❌ |
| Status change on my issue | ✅ | ❌ |
| Issue I'm watching updated | ✅ | ❌ |
| Due date approaching (24h) | ✅ | ✅ |
| Issue overdue | ✅ | ✅ |
| Added as project member | ✅ | ✅ |
| Workspace invite | — | ✅ |

### 8.2 In-App Notification Center
- Bell icon in header with unread count badge (red dot + number)
- Click → dropdown panel (max height, scrollable)
- Each notification:
  - Actor avatar + actor name
  - Action text: "assigned PMS-42 to you"
  - Issue title preview
  - Relative time: "2h ago"
  - Read/unread indicator (blue dot for unread)
  - Click → navigate to issue (and mark as read)
- "Mark all as read" button at top
- "View all notifications" link → full page

### 8.3 Notification Full Page
- `/notifications` route
- Full list with pagination
- Tabs: "All" | "Unread" | "Mentions"
- Filter by: project, notification type
- Bulk actions: mark selected as read, delete
- Empty state: "You're all caught up!" illustration

### 8.4 Notification Preferences (User Settings)
- Per notification type: toggle in-app / email on/off
- Table: rows = event types, columns = channels (in-app, email)
- "Mute all" toggle (do not disturb)
- Per-project override: mute specific project notifications
- Email digest: Off / Daily / Weekly (summary email)

### 8.5 Read/Unread Management
- Click notification → marks as read + navigates
- Mark individual as read/unread (right-click or swipe on mobile)
- "Mark all as read" button
- Unread count in bell icon badge
- Unread count in browser tab title: "(3) ProjectHub"

### 8.6 Notification Grouping
- Multiple events on same issue within 1 hour → grouped
- "3 updates on PMS-42" with expandable detail
- Prevents notification flood from rapid changes

### 8.7 Real-time Delivery
- WebSocket push: instant in-app delivery
- Bell count updates without refresh
- Toast notification for high-priority: assigned to me, @mentioned
- Toast auto-dismisses after 5s, click to open

### 8.8 Email Notifications
- Per-event emails (if enabled in preferences)
- Email content: actor, action, issue title, description preview, direct link
- Unsubscribe link in email footer
- "Reply to this email to add a comment" (stretch goal)
- Digest email: daily/weekly summary of all activity

### 8.9 Snooze
- Snooze individual notification: 1h, 3h, tomorrow, next week
- Snoozed notifications reappear at specified time
- "Snoozed" tab in notification page

## Data Model

```
Notification {
  id: UUID
  workspace_id: FK → Workspace
  recipient_id: FK → User
  actor_id: FK → User
  type: string (assigned, mentioned, commented, status_changed, etc.)
  issue_id: FK → Issue?
  project_id: FK → Project?
  comment_id: FK → Comment?
  title: string (rendered notification text)
  read_at: timestamp?
  snoozed_until: timestamp?
  email_sent: boolean (default: false)
  group_key: string? (for grouping: "{issue_id}:{hour}")
  created_at: timestamp
}

NotificationPreference {
  id: UUID
  user_id: FK → User
  workspace_id: FK → Workspace
  notification_type: string
  in_app_enabled: boolean (default: true)
  email_enabled: boolean (default: varies)
}

-- Indexes:
-- (recipient_id, read_at IS NULL, created_at DESC) — unread notifications
-- (recipient_id, created_at DESC) — all notifications
-- (group_key) — for grouping
```

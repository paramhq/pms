# Part 16: Real-time & Collaboration

## Features

### 16.1 WebSocket Connection
- Single persistent WebSocket per browser session
- Auto-reconnect with exponential backoff (1s, 2s, 4s, 8s, max 30s)
- Heartbeat ping/pong every 30s to detect disconnection
- Connection status indicator in UI: 🟢 Connected / 🟡 Reconnecting / 🔴 Offline
- Graceful degradation: app works without WebSocket (polling fallback at 30s)

### 16.2 Channel Subscriptions
| Channel | Events | Auto-subscribe When |
|---------|--------|-------------------|
| `workspace:{id}` | Member added/removed, settings changed | Always (workspace member) |
| `project:{id}` | Issue created/deleted, project settings changed | Viewing project |
| `issue:{id}` | Field changes, comments, attachments | Viewing issue detail |
| `user:{id}` | Notifications, assigned to me | Always (personal) |

### 16.3 Real-time Issue Updates
- Issue field change by another user → instant UI update
- Visual flash/highlight on changed field (brief yellow highlight, 2s)
- "This issue was updated by AK" subtle toast (don't interrupt editing)
- If current user is editing same field: show conflict indicator
  - "AK changed this field to 'High'. Keep your change or use theirs?"

### 16.4 Real-time Issue List
- New issue created → appears in list (if matches current filters)
- Issue deleted → removed from list
- Issue field change → row updates (status badge, assignee, etc.)
- Subtle animation on insert/remove (slide in/out)

### 16.5 Real-time Comments
- New comment → appears at bottom of activity feed
- Smooth insertion animation
- Auto-scroll to new comment if user is near bottom
- Don't auto-scroll if user has scrolled up (reading history)

### 16.6 Typing Indicator
- When user starts typing a comment: broadcast typing event
- Display: "AK is typing..." above comment editor
- Debounced: send typing event max once per 3s
- Clear after 5s of no typing
- Multiple users: "AK and PR are typing..."

### 16.7 Presence Indicators
- Issue detail: show avatars of other users currently viewing
- "SZ, AK viewing" — small avatar group in header
- Update when users navigate away
- Based on channel subscription (issue:{id})

### 16.8 Optimistic Updates
- All user actions: apply locally FIRST, then send to server
- If server confirms: no additional UI update needed
- If server rejects: revert local state, show error toast
- Examples:
  - Change status → instant badge change, then API call
  - Add comment → instant display, then API call (show sending indicator)
  - Delete issue → instant removal from list, then API call

### 16.9 Conflict Resolution
- Last-write-wins for most fields (simple, predictable)
- Exception: description (rich text) — if two users edit simultaneously:
  - Show warning: "AK also edited the description. Review their changes?"
  - Provide: "Keep mine" / "Use theirs" / "View diff" options
  - This is a stretch goal — initially just last-write-wins

### 16.10 Offline Handling
- If WebSocket disconnects:
  - Show "Offline" indicator in header
  - Queue outgoing changes locally
  - Continue allowing edits (optimistic)
  - On reconnect: send queued changes, fetch latest state, reconcile
- If API calls fail due to network:
  - Retry with backoff (3 attempts)
  - Show error toast with retry button after 3 failures
  - Don't lose user's input

### 16.11 Notification Push
- Real-time notifications via WebSocket (user:{id} channel)
- Update bell badge count instantly
- Show toast for high-priority notifications (assigned, mentioned)

## Implementation Notes

### WebSocket Events (server → client)
```typescript
type WSEvent =
  | { type: "issue.updated"; projectId: string; issueId: string; changes: Partial<Issue>; actorId: string }
  | { type: "issue.created"; projectId: string; issue: Issue; actorId: string }
  | { type: "issue.deleted"; projectId: string; issueId: string; actorId: string }
  | { type: "comment.created"; issueId: string; comment: Comment; actorId: string }
  | { type: "comment.updated"; issueId: string; comment: Comment; actorId: string }
  | { type: "comment.deleted"; issueId: string; commentId: string; actorId: string }
  | { type: "notification"; notification: Notification }
  | { type: "presence.join"; issueId: string; userId: string }
  | { type: "presence.leave"; issueId: string; userId: string }
  | { type: "typing.start"; issueId: string; userId: string }
  | { type: "typing.stop"; issueId: string; userId: string }
```

### Client → Server
```typescript
type WSCommand =
  | { type: "subscribe"; channel: string }
  | { type: "unsubscribe"; channel: string }
  | { type: "presence.heartbeat"; issueId: string }
  | { type: "typing"; issueId: string }
  | { type: "ping" }
```

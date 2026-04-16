# Part 13: Dashboard (Personal "My Work")

## Features

### 13.1 Dashboard Layout

The dashboard is the landing page after login. Focused on "what do I need to do right now?"

**Layout:** Two-column at desktop (main + sidebar), single column on mobile.

### 13.2 Main Column Sections

#### My Issues (Primary Section)
- Issues assigned to current user, grouped by status category
- **To Do** group: issues not yet started
- **In Progress** group: issues being worked on
- **In Review** group: issues pending review
- Each row: type icon, key, title, priority icon, project badge, due date
- Click → navigate to issue detail
- Collapse/expand groups
- Count per group: "In Progress (3)"
- Sort within group: by priority (Critical first), then by updated date
- "View all my issues" link → filtered issue list

#### Overdue Issues (Alert Section)
- Red highlighted section (only shows if there are overdue items)
- Issues where: due_date < today AND status_category != done AND assignee = me
- High visibility: red border/background accent
- Each row: same as above, with "X days overdue" badge in red

#### Due This Week
- Issues due within next 7 days
- Each row: same + due date shown with day name ("Wed, Apr 18")
- Sorted by due date ascending (soonest first)

#### Recently Viewed
- Last 10 issues viewed by current user
- Each row: type icon, key, title, status, project
- "Clear history" button (x)
- Persistent across sessions

#### Activity Stream
- Recent activity across all projects user is member of
- Last 20 events
- Compact format: "AK commented on PMS-42 · 2h ago"
- Click → navigate to issue
- "View all activity" link

### 13.3 Sidebar Column

#### Quick Actions
- "Create Issue" button (opens create modal)
- "Search" button (opens search)
- Keyboard shortcut hints shown

#### My Projects
- List of user's favorite/starred projects
- Each: project icon, name, open issue count
- Click → navigate to project
- "View all projects" link

#### Quick Stats (Personal)
- Issues assigned to me: total count
- Completed this week: count
- Overdue: count (red if > 0)
- Unestimated: count of my issues without story points

### 13.4 Dashboard Behavior
- Auto-refreshes data every 60 seconds (or via WebSocket push)
- All sections collapsible (persists per user)
- Empty state per section: friendly message + CTA
- Full dashboard empty state (new user): onboarding guide

## Pages/Screens

1. **Dashboard** (`/dashboard` or `/`) — full dashboard with all sections
2. Empty state variants: new user, no issues, everything done

## Data Model

No new data model needed — dashboard is a computed view from existing data:
- Issues where assignee_id = current_user
- Activity events for workspace
- User's recently viewed (client-side or small server table)

```
RecentlyViewed {
  user_id: FK → User
  issue_id: FK → Issue
  viewed_at: timestamp
  PRIMARY KEY (user_id, issue_id)
}

-- Keep max 50 per user, prune oldest on insert
```

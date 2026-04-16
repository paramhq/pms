# Deferred Features (Phase 2+)

Full research preserved here. These features are designed but not built in Phase 1.

---

## D1: Sprints

### Features
- Create sprint: auto-named (Sprint 1, 2...), editable name, goal text (rich text)
- Sprint dates: start + end, default duration from settings (e.g., 2 weeks)
- Start sprint: validates has issues, no other active sprint per project
- Active sprint: only one at a time per project
- Complete sprint: modal summary (done/not-done), choose destination for incomplete (backlog/next sprint)
- Sprint board: Kanban view filtered to sprint issues
- Sprint backlog: list view of sprint issues
- Sprint progress: story points completed / total, percentage bar
- Sprint velocity: points completed per sprint, historical chart
- Sprint history: list of past sprints with stats
- Sprint retro notes: markdown field
- Carry-over tracking: track issues carried from previous sprint

### Data Model
```
Sprint {
  id: UUID
  project_id: FK → Project
  name: string
  goal: text? (markdown)
  status: enum (planned, active, completed)
  start_date: date?
  end_date: date?
  completed_at: timestamp?
  completed_by: FK → User?
  sort_order: number
  created_at: timestamp
  updated_at: timestamp
}

-- Issues get: sprint_id: FK → Sprint? field
```

---

## D2: Epics & Roadmap

### Epics
- Create epic: title, description, color, start date, target date
- Epic progress: auto-calculated from child issues
- Epic detail view: description, child issues, progress, activity
- Epic status: To Do / In Progress / Done
- Epic color: used in cards, timeline, backlog grouping

### Roadmap / Timeline
- Gantt-style horizontal bars for epics over time
- Drag to resize (adjust dates), drag to move
- Zoom: Week / Month / Quarter
- Dependencies: arrows between epics (finish-to-start)
- Progress bars: filled portion = % complete
- Multi-project roadmap
- Milestones: diamond markers for key dates
- Filter by project, team, label, status
- Share roadmap: read-only link

### Data Model
```
Epic {
  id: UUID
  project_id: FK → Project
  title: string
  description: text?
  color: string (hex)
  status: enum (todo, in_progress, done)
  start_date: date?
  target_date: date?
  sort_order: number
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
}

-- Issues get: epic_id: FK → Epic? field

EpicDependency {
  source_epic_id: FK → Epic
  target_epic_id: FK → Epic
  dependency_type: enum (finish_to_start)
  PRIMARY KEY (source_epic_id, target_epic_id)
}
```

---

## D3: Kanban Board View

### Features
- Columns = workflow statuses
- Drag-and-drop cards between columns + reorder within
- WIP limits per column with visual warning
- Column collapse/expand
- Swimlanes: None, Assignee, Priority, Epic, Type, Label
- Card configuration: choose visible fields
- Card sizes: Compact / Default / Detailed
- Quick create per column
- Board filters
- Real-time sync (WebSocket)
- Multiple board configurations per project
- Done column auto-archive

---

## D4: Custom Workflows

### Features
- Default workflow: To Do → In Progress → In Review → Done
- Custom status creation: name, color, category (todo/in_progress/done)
- Custom transitions: define which statuses can transition to which
- Workflow per issue type
- Transition rules: conditions ("only assignee can move to Review")
- Transition actions: auto-assign, post comment
- Workflow visualization: state diagram view
- Initial status per issue type

### Data Model
```
Workflow {
  id: UUID
  project_id: FK → Project
  name: string
  is_default: boolean
  created_at: timestamp
}

WorkflowStatus {
  id: UUID
  workflow_id: FK → Workflow
  name: string
  color: string (hex)
  category: enum (todo, in_progress, done)
  sort_order: number
}

WorkflowTransition {
  id: UUID
  workflow_id: FK → Workflow
  from_status_id: FK → WorkflowStatus
  to_status_id: FK → WorkflowStatus
  name: string?
}
```

---

## D5: Reports & Charts

### Reports
- Sprint burndown: remaining work over sprint days + ideal line
- Sprint burnup: cumulative completed + scope line
- Velocity chart: points per sprint (bar chart, last 6-10 sprints)
- Cumulative flow: stacked area by status over time
- Created vs Resolved: line chart over time
- Type distribution: pie/donut by type
- Priority distribution: pie/donut by priority
- Assignee workload: bar chart, open issues per person
- Cycle time: avg time In Progress → Done
- Lead time: avg time Created → Done
- Overdue report: list of past-due issues
- Sprint completion rate: % committed completed per sprint
- Custom date range for all reports
- Export: PDF, PNG, CSV

---

## D6: Time Tracking

### Features
- Original estimate (hours)
- Log time: hours, date, description
- Remaining estimate: auto or manual
- Start/stop timer
- Time entries list per issue
- Timesheet view: weekly grid
- Project/sprint time reports
- Export timesheets: CSV

### Data Model
```
TimeEntry {
  id: UUID
  issue_id: FK → Issue
  user_id: FK → User
  hours: decimal
  date: date
  description: string?
  created_at: timestamp
  updated_at: timestamp
}

-- Issues get: estimated_hours: decimal? field
```

---

## D7: Automations

### Features
- Rule builder: WHEN (trigger) + IF (condition) + THEN (action)
- Triggers: issue created, status changed, assigned, field changed, comment added, due date approaching
- Conditions: type is, priority is, assignee is, label contains
- Actions: change status/assignee/label, add comment, send notification
- Automation log
- Enable/disable toggle
- Per project scoped
- Rate limiting to prevent loops

### Data Model
```
Automation {
  id: UUID
  project_id: FK → Project
  name: string
  enabled: boolean
  trigger: JSON { event: string, filters?: object }
  conditions: JSON[] { field, operator, value }
  actions: JSON[] { type, params }
  execution_count: number
  last_executed_at: timestamp?
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
}

AutomationLog {
  id: UUID
  automation_id: FK → Automation
  issue_id: FK → Issue?
  status: enum (success, failed, skipped)
  error_message: string?
  executed_at: timestamp
}
```

---

## D8-D10: Integrations (GitHub, GitLab, Slack)

### GitHub/GitLab
- Link commits/PRs to issues via ID in commit message
- Auto-transition on PR merge
- Show PR status on issue
- "Create branch" from issue (copy branch name)

### Slack
- Notifications to channel
- Create issue from Slack
- Slash commands
- Unfurl issue links

### Webhooks
- Outgoing webhooks: configure URL + events
- Request logs with response codes
- Retry failed deliveries (3 attempts, exponential backoff)
- Secret-based signature verification

---

## D11-D16: Enterprise Features

- SSO / SAML 2.0 / OIDC
- Custom roles (beyond Owner/Admin/Member/Guest)
- IP allowlist
- Audit log export (CSV, filtered by date)
- API rate limiting (per token)
- SLA tracking (response time, resolution time)
- Import from Jira (XML/API), Trello (JSON), Asana, CSV

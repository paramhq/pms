# ProjectHub PMS — Scope Definition

## Phase 1: In Scope (Build Now)

These are the features we will implement in the first phase:

| # | Part | Priority |
|---|------|----------|
| 1 | Authentication & Identity | Core |
| 2 | Workspace / Organization | Core |
| 3 | Projects | Core |
| 4 | Issues (full CRUD, detail, templates, bulk ops) | Core |
| 5 | Backlog / List View | Core |
| 6 | Comments & Collaboration | Core |
| 7 | Activity & Audit Log | Core |
| 8 | Notifications (in-app) | Core |
| 9 | Search & Filters | Core |
| 10 | Labels & Tags | Core |
| 11 | Attachments & Files | Core |
| 12 | Settings (workspace, project, user) | Core |
| 13 | Dashboard (personal "My Work") | Core |
| 14 | Keyboard Shortcuts & Command Palette | Essential |
| 15 | Permissions (RBAC) | Core |
| 16 | Real-time & Collaboration | Essential |
| 17 | Responsive & Accessibility | Essential |
| 18 | Dark Mode / Theming | Essential |

## Phase 2: Deferred (Build Later)

These features are fully researched and documented but deferred to a later phase:

| # | Part | Reason |
|---|------|--------|
| D1 | Sprints | Agile-specific, not needed for core issue tracking |
| D2 | Epics & Roadmap | Requires sprints/timeline infrastructure |
| D3 | Kanban Board View | Complex drag-and-drop, deferring for list-first approach |
| D4 | Custom Workflows | Default workflow is sufficient initially |
| D5 | Charts & Reports (burndown, velocity, cumulative flow) | Requires sprint data |
| D6 | Gantt / Timeline | Complex visualization, deferred |
| D7 | Time Tracking | Secondary feature |
| D8 | Automations | Complex rule engine |
| D9 | GitHub / GitLab Integration | Third-party dependency |
| D10 | Slack Integration | Third-party dependency |
| D11 | Webhooks | API consumers needed first |
| D12 | Import from Jira/Trello/Asana | Third-party formats |
| D13 | SSO / SAML | Enterprise tier |
| D14 | Custom Roles | Basic RBAC sufficient initially |
| D15 | API Rate Limiting | Scale concern |
| D16 | SLA Tracking | Enterprise tier |

## Primary Views (Phase 1)

Since Board/Kanban is deferred, the primary views are:

1. **Dashboard** — Personal "My Work" landing page
2. **Project List View** — Table/list of issues with sorting, filtering, grouping
3. **Issue Detail** — Full issue detail panel/page
4. **Backlog** — Ordered list with drag-to-reorder
5. **Settings** — Workspace, project, and user settings
6. **Search Results** — Global search results page

## Design Philosophy

- **List-first**: Table/list views are the primary navigation (like Linear)
- **Keyboard-first**: Every action reachable via keyboard
- **Command palette**: Central hub for all actions (Cmd+K)
- **Minimal chrome**: Maximum content area, minimal UI overhead
- **Fast**: Optimistic updates, instant navigation, no loading spinners for cached data

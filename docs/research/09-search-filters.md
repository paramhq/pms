# Part 9: Search & Filters

## Features

### 9.1 Global Search (Omnisearch)

Accessible from: header search bar, `/` shortcut, `Cmd+K` command palette.

**Search targets:**
| Target | Searchable Fields | Display |
|--------|------------------|---------|
| Issues | ID (exact: "PMS-42"), title, description | Type icon + key + title + status + project |
| Projects | Name, key | Project icon + name + key |
| Comments | Comment body text | Issue ref + comment preview + author |
| People | Name, email | Avatar + name + email |

**Search behavior:**
- Debounced: 200ms after typing stops
- Results categorized: "Issues", "Projects", "People"
- Max 5 results per category in dropdown
- "View all N results" link to full search page
- Recent searches: last 10, shown when search input is empty
- Clear recent searches button

### 9.2 Search by Issue ID
- Type `PMS-42` (exact match) → jump directly to issue
- Case insensitive: `pms-42` works
- If exact match found, show as first result with "Jump to" indicator
- Works across projects in workspace

### 9.3 Full-Text Search
- Searches: title + description + comments (combined)
- Fuzzy matching: typo-tolerant (Levenshtein distance ≤ 2)
- Stemming: "running" matches "run"
- Highlighting: matched terms highlighted in results
- Ranking: exact match > title match > description match > comment match

### 9.4 Search Results Page
- Route: `/search?q=query`
- Full results list with pagination
- Tabs: "All" | "Issues" | "Projects" | "Comments"
- Each result: type icon, title, context snippet (highlighted match), metadata
- Filter results by: project, status, type, priority, assignee, date range
- Sort results by: relevance, newest, oldest, updated

### 9.5 Filter Builder (Project Issue List)

Filter bar above issue list with interactive chips:

#### Quick Filters (chips)
Each chip is a dropdown:
| Filter | Chip UI | Options |
|--------|---------|---------|
| Status | "Status ▾" | Checkboxes: To Do, In Progress, In Review, Done, Cancelled |
| Assignee | "Assignee ▾" | User picker with search + "Unassigned" option |
| Priority | "Priority ▾" | Checkboxes with icons: Critical, High, Medium, Low, None |
| Type | "Type ▾" | Checkboxes with icons: Story, Bug, Task, Sub-task |
| Label | "Label ▾" | Checkboxes from project labels |
| Due Date | "Due Date ▾" | Presets: Overdue, Due today, Due this week, Due this month, No due date, Custom range |
| Reporter | "Reporter ▾" | User picker |

#### Active Filter Display
- Active filter chip shows: "Priority: High, Critical" (values in chip)
- "×" on chip to clear that filter
- "Clear all" button when any filter is active
- Filter count badge on filter icon

#### Text Filter
- Search input in filter bar: "Filter by keyword..."
- Searches title + description
- Debounced, real-time filtering

### 9.6 Saved Filters / Views
- After setting filters + sort + grouping → "Save view" button
- Modal: name, share toggle (personal vs team)
- Saved views appear as:
  - Tabs above the issue list
  - Sidebar items under project
- Edit saved view: rename, update filters, delete
- "Set as default" — loads this view when opening project

### 9.7 Quick Filters (Pre-built)
These exist without user creating them:
| Name | Definition |
|------|-----------|
| All Issues | No filters |
| My Issues | assignee = current user |
| Open Issues | status_category != done |
| Recently Updated | updated in last 7 days, sorted by updated desc |
| Created by Me | reporter = current user |
| Unassigned | assignee = null |
| Overdue | due_date < today AND status_category != done |

### 9.8 Command Palette (Cmd+K)

Overlay modal with search input:

**Categories:**
| Category | Examples |
|----------|---------|
| Navigation | "Go to Board", "Go to Backlog", "Go to Settings", "Open project PMS" |
| Actions | "Create issue", "Create project" |
| Issues | Search by title/ID → jump to issue |
| Recent | Last 5 recently viewed issues |
| People | Search users |

**Behavior:**
- Fuzzy matching on command names
- Category headers in results
- Arrow keys to navigate, Enter to select
- Results limit: 10 visible, scroll for more
- Keyboard shortcut hints shown (e.g., "Create Issue  C")
- `Esc` to close

## Data Model

```
-- SavedView is defined in 05-backlog-list.md

SearchHistory {
  id: UUID
  user_id: FK → User
  workspace_id: FK → Workspace
  query: string
  result_count: number
  created_at: timestamp
}

-- Full-text search index (if using PostgreSQL):
-- GIN index on issues (title, description) using tsvector
-- GIN index on comments (body_markdown) using tsvector
```

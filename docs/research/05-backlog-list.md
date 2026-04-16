# Part 5: Backlog / List View

This is the PRIMARY view for Phase 1 (board view is deferred).

## Features

### 5.1 List View (Table)

The main way users interact with issues. Think Linear's issue list.

**Table Columns (configurable):**
| Column | Default Visible | Sortable | Width |
|--------|----------------|----------|-------|
| Checkbox (select) | Yes | No | 32px |
| Type icon | Yes | No | 28px |
| Key (PMS-42) | Yes | Yes | 80px |
| Title | Yes | Yes | Flex |
| Status | Yes | Yes | 120px |
| Priority | Yes | Yes | 40px (icon only) |
| Assignee | Yes | Yes | 140px |
| Labels | Yes | No | 160px |
| Story Points | No | Yes | 60px |
| Due Date | No | Yes | 100px |
| Created | No | Yes | 100px |
| Updated | Yes | Yes | 100px |

- Columns are resizable (drag column border)
- Column visibility toggle (show/hide columns menu)
- Column order is drag-to-reorder
- Save column config per user per project

### 5.2 Inline Editing (in table)
- Click cell to edit in-place
- Title: text input, Enter to save, Esc to cancel
- Status: dropdown
- Priority: dropdown with icons
- Assignee: user picker
- Labels: tag multi-select
- Story Points: number input
- Due Date: date picker
- Tab to move between cells

### 5.3 Sorting
- Click column header to sort
- Click again to reverse
- Multi-sort: Shift+Click for secondary sort
- Sort indicator (arrow icon in header)
- Default sort: manual order (sort_order field), then by created_at desc

### 5.4 Grouping
- Group issues by:
  - None (flat list)
  - Status
  - Priority
  - Assignee
  - Type
  - Label
  - Parent (sub-task hierarchy)
- Group headers: collapsible, show count
- Drag between groups to change field value

### 5.5 Filtering
- Filter bar above table
- Quick filters (chips):
  - Assignee (user picker)
  - Type (multi-select)
  - Priority (multi-select)
  - Label (multi-select)
  - Status (multi-select)
- Text search filter (searches title + description)
- Date filters: created in range, updated in range, due date in range
- "Clear all filters" button
- Active filter count badge

### 5.6 Saved Filters / Views
- Save current filter + sort + grouping + column config as "View"
- View name (user-defined)
- Share view with team (visible to all project members)
- Quick access to saved views in sidebar or tabs above list
- Default views:
  - "All Issues"
  - "My Issues" (assigned to me)
  - "Recently Updated"
  - "Open Issues" (status category != done)
  - "Unassigned"

### 5.7 Backlog Mode
- Toggle: "List View" vs "Backlog View"
- Backlog = manually ordered list (drag to reorder)
- Drag handle on left of each row
- Priority ranking: top = highest priority
- Backlog typically shows: open issues only, unscheduled
- "Grooming" indicator: highlight unestimated, unassigned issues

### 5.8 Quick Create (Inline)
- "+" button at bottom of list, or Ctrl+Enter
- Inline row appears: type title, press Enter to create
- Created with: default type, default priority, current project
- Click expand icon to open full create modal

### 5.9 Issue Row Interactions
- Click row → opens issue detail panel (slide-over from right)
- Right-click row → context menu (open, open in new tab, copy link, change status, assign, delete)
- Hover row → show quick action icons (status, assignee, priority)
- `Enter` on selected row → open detail
- `Space` on selected row → toggle checkbox

### 5.10 Keyboard Navigation
- `J` / `K` or `↓` / `↑`: navigate rows
- `Enter`: open selected issue
- `Space`: toggle select
- `X`: toggle select (alternative)
- `Shift+↓/↑`: extend selection
- `Cmd+A`: select all

### 5.11 Pagination / Virtual Scroll
- Virtual scrolling for large lists (render only visible rows)
- No page-based pagination — infinite scroll
- Load in chunks of 50
- Smooth scroll, no jank

### 5.12 Empty States
- No issues in project: illustration + "Create your first issue" CTA
- No results for filter: "No issues match your filters" + "Clear filters" link
- All issues done: celebratory illustration + stats

## Pages/Screens

1. **Issue List (Table View)** — main project view, table with all features above
2. **Backlog View** — same table but with drag-to-reorder, manual ranking
3. **Saved Views tabs** — tabs above the list for quick switching
4. **Empty State** — different for no issues vs no filter matches

## Data Model

```
SavedView {
  id: UUID
  project_id: FK → Project
  name: string
  filters: JSON {
    status?: string[]
    priority?: string[]
    assignee_id?: string[]
    type?: string[]
    label_ids?: string[]
    search?: string
    due_date_from?: date
    due_date_to?: date
    created_from?: date
    created_to?: date
  }
  sort: JSON { field: string, direction: "asc" | "desc" }[]
  grouping: string? (status, priority, assignee, type, label, none)
  columns: JSON { field: string, width: number, visible: boolean }[]
  is_default: boolean
  shared: boolean (visible to all project members)
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
}
```

# Part 4: Issues — The Core Entity

## Features

### 4.1 Issue Types

| Type | Icon Shape | Default Color | Usage |
|------|-----------|---------------|-------|
| Story | Rounded square + checkmark | #10b981 (green) | User stories, feature work |
| Bug | Circle | #ef4444 (red) | Defects, errors, regressions |
| Task | Square + checkmark | #3b82f6 (blue) | General work items, chores |
| Sub-task | Square + dash | #8b5cf6 (purple) | Child of any issue type |

Custom issue types: workspace-level, admin-configured (name, icon, color).

### 4.2 Core Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| ID | Auto-increment | Auto | — | Per project: `PMS-1`, `PMS-2`. Format: `{project_key}-{counter}` |
| Title | Text | **Yes** | — | Max 255 chars |
| Description | Rich text | No | Empty | Markdown + WYSIWYG: headings, bold, italic, code, lists, links, images, tables, checklists, blockquotes |
| Status | Enum | Auto | "To Do" | Default workflow: To Do → In Progress → In Review → Done |
| Priority | Enum | Auto | "Medium" | Critical (P0), High (P1), Medium (P2), Low (P3), None |
| Type | Enum | **Yes** | "Task" | Story, Bug, Task, Sub-task, custom |
| Assignee | User | No | null | Single user, nullable (unassigned) |
| Reporter | User | Auto | Creator | Changeable by admin |
| Labels | Multi-select | No | [] | From project + workspace label pools |
| Story Points | Number | No | null | Typical: 1, 2, 3, 5, 8, 13, 21 (free input, not forced Fibonacci) |
| Due Date | Date | No | null | Shows overdue warning if past + open |
| Start Date | Date | No | null | For tracking issue lifespan |
| Parent | Issue ref | No | null | For sub-tasks. Creates hierarchy. |
| Created At | Timestamp | Auto | Now | Immutable |
| Updated At | Timestamp | Auto | Now | Auto-updated on any change |
| Resolved At | Timestamp | Auto | null | Set when status moves to "Done" category, cleared if reopened |

### 4.3 Issue Statuses (Default Workflow)

| Status | Category | Color | Description |
|--------|----------|-------|-------------|
| To Do | Todo | #6b7280 (gray) | Not started |
| In Progress | InProgress | #3b82f6 (blue) | Actively being worked on |
| In Review | InProgress | #f59e0b (amber) | Under review / QA |
| Done | Done | #10b981 (green) | Completed |
| Cancelled | Done | #9ca3af (gray) | Won't do / cancelled |

Every status belongs to a category (Todo, InProgress, Done). This drives:
- Issue resolution (Done category = resolved)
- Progress calculations
- Default behavior (new = Todo, filters for "open" = not Done)

### 4.4 Priority Levels

| Priority | Icon | Color | Shortcut | Usage |
|----------|------|-------|----------|-------|
| Critical | Filled triangle + exclamation | #ef4444 (red) | P0 | Blocking, production down, immediate action |
| High | Up arrow | #f97316 (orange) | P1 | Important, should address this iteration |
| Medium | Equals/bars | #eab308 (yellow) | P2 | Normal priority, plan for it |
| Low | Down arrow | #6b7280 (gray) | P3 | Nice to have, backlog |
| None | Dash | #d1d5db (light gray) | — | No priority set |

### 4.5 Issue Creation

#### Full Create Modal
- Triggered by: "Create Issue" button, `C` keyboard shortcut, Cmd+K → "Create"
- Form fields (in order):
  1. Project selector (default: current project)
  2. Issue type selector (default: workspace/project default)
  3. Title (text input, required)
  4. Description (rich text editor, collapsible)
  5. Status (default: "To Do", changeable)
  6. Assignee (user picker with search)
  7. Priority (dropdown, default: workspace/project default)
  8. Labels (multi-select with search + create new)
  9. Story points (number input)
  10. Due date (date picker)
  11. Parent issue (issue picker — for sub-tasks)
  12. Attachments (drag-drop zone)
- "Create" button (primary)
- "Create & create another" button (secondary — keeps modal open, clears form)
- Keyboard: `Cmd+Enter` to submit

#### Quick Create (Inline)
- Available in: backlog list, table view, issue list
- Single-line input: type title, press Enter
- Inherits context: project, current filter's type/priority
- Expand icon to access more fields without opening full modal

#### Create from Template
- Template picker in create modal
- Pre-fills: title pattern, description, labels, type, priority
- User can override any pre-filled field

### 4.6 Issue Detail View

This is the most important screen. Two layout options:

#### Option A: Side Panel (Linear-style)
- Issue list on left, detail panel slides in from right
- 50/50 or 60/40 split
- Doesn't navigate away from list context
- `Esc` closes panel, back to list

#### Option B: Full Page (Jira-style)
- Dedicated URL: `/projects/PMS/issues/PMS-42`
- Full-width layout
- Back button returns to previous view

#### We'll support BOTH: panel by default, expand to full page.

#### Detail Layout (Panel & Full Page)

**Header Section:**
- Type icon + Issue ID (e.g., "🔵 PMS-42") — click ID to copy link
- Title: large text, inline-editable (click to edit, blur/Enter to save)
- Status badge: colored pill, click to change via dropdown
- More menu (⋯): Clone, Move, Delete, Share, Copy link, Copy as Markdown

**Metadata Sidebar (right column):**
- Each field is a row: label + value, click value to edit inline
- Fields:
  - Status (dropdown)
  - Assignee (user picker)
  - Priority (dropdown with icons)
  - Labels (multi-select tags)
  - Story Points (number input)
  - Due Date (date picker)
  - Reporter (user picker)
  - Created (read-only, relative time)
  - Updated (read-only, relative time)
  - Parent (issue picker, for sub-tasks)

**Main Content Area (left column):**
- Description: rich text editor, auto-save, collapse/expand
- Sub-tasks section:
  - List of child issues (type icon, ID, title, status, assignee)
  - "Add sub-task" inline input
  - Drag to reorder
  - Progress: "2 of 5 sub-tasks done"
- Linked Issues section:
  - Grouped by link type: "Blocks", "Is blocked by", "Relates to", "Duplicates"
  - Each link: type icon, ID, title, status
  - "Add link" button → issue picker + link type
- Attachments section:
  - File grid/list
  - Drag-drop upload zone
  - Image thumbnails, file type icons

**Activity Section (below content):**
- Tab toggle: "All" | "Comments" | "History"
- **All**: comments + field changes interleaved chronologically
- **Comments**: only comments
- **History**: only field changes (who changed what, when, old→new)
- New comment input at bottom (rich text, @mentions)
- Sort: newest first / oldest first toggle

### 4.7 Issue Operations

| Operation | UI | Details |
|-----------|-----|---------|
| **Edit inline** | Click any field on detail view | Inline edit, auto-save on blur/Enter |
| **Edit title** | Click title on detail view | Large text input, `E` shortcut |
| **Delete** | More menu → Delete | Confirmation dialog, soft delete to trash |
| **Clone** | More menu → Clone | Copy all fields, new ID, confirm dialog |
| **Move to project** | More menu → Move | Project picker, re-keys issue (PMS-42 → MOB-18), redirects |
| **Convert type** | Type dropdown on detail | Change Story → Bug etc., preserves all fields |
| **Link issue** | "Add link" in linked issues | Issue search + link type picker |
| **Watch/Unwatch** | Eye icon in header | Toggle notifications for this issue |
| **Share** | More menu → Share | Copy URL to clipboard |
| **Copy as Markdown** | More menu → Copy as MD | Copies formatted issue as markdown |

### 4.8 Bulk Operations

- Available in: list view, backlog
- Trigger: checkbox on each row, or Shift+Click for range select
- Bulk action bar appears at bottom (floating):
  - "N issues selected" count
  - Actions: Set Status, Set Assignee, Set Priority, Add Labels, Remove Labels, Set Due Date, Delete
  - Each action opens a minimal picker/dropdown
  - Apply → batch update, show success toast
- Select all (on current page/filter)
- Clear selection

### 4.9 Issue Templates

| Feature | Details |
|---------|---------|
| Create template | From: settings page, or "Save as template" from issue detail |
| Template fields | Title pattern (e.g., "[BUG] {summary}"), description (rich text with placeholders), type, priority, labels, assignee |
| Template variables | `{{reporter.name}}`, `{{date}}`, `{{project.key}}` — auto-filled on use |
| Use template | In create modal: "From template" tab, select template, fills form |
| Per project | Templates belong to a project |
| Manage templates | Project settings → Templates: list, edit, delete, reorder |
| Built-in templates | "Bug Report" (steps to reproduce, expected/actual), "Feature Request" (user story format), "Task" (checklist) |

### 4.10 Issue Links

| Link Type | Forward Label | Reverse Label |
|-----------|--------------|---------------|
| Blocks | "blocks" | "is blocked by" |
| Relates | "relates to" | "relates to" (symmetric) |
| Duplicates | "duplicates" | "is duplicated by" |
| Parent/Child | "parent of" | "child of" (via sub-tasks) |

- Create link: search issue by ID or title, select link type
- Delete link: remove from either side
- Bidirectional: creating "A blocks B" auto-creates "B is blocked by A"
- Display: in issue detail under "Linked Issues" section

## Pages/Screens

1. **Create Issue Modal** — full form with all fields
2. **Issue Detail Panel** — slide-over panel from list view
3. **Issue Detail Full Page** — full-width dedicated page
4. **Issue List / Table View** — sortable columns, inline actions
5. **Bulk Action Bar** — floating bar at bottom during multi-select

## Data Model

```
Issue {
  id: UUID
  project_id: FK → Project
  workspace_id: FK → Workspace
  number: number (auto-increment per project)
  key: string (computed: project.key + "-" + number, e.g., "PMS-42")
  title: string (max 255)
  description: text? (markdown)
  description_html: text? (rendered HTML, cached)
  status: string (FK → WorkflowStatus)
  status_category: enum (todo, in_progress, done)
  priority: enum (critical, high, medium, low, none)
  type: string (story, bug, task, subtask, custom)
  assignee_id: FK → User?
  reporter_id: FK → User
  story_points: number?
  due_date: date?
  start_date: date?
  parent_id: FK → Issue? (for sub-tasks)
  sort_order: number (for manual ordering in backlog)
  resolved_at: timestamp?
  deleted_at: timestamp?
  created_at: timestamp
  updated_at: timestamp
}

IssueLabel {
  issue_id: FK → Issue
  label_id: FK → Label
  PRIMARY KEY (issue_id, label_id)
}

IssueLink {
  id: UUID
  source_issue_id: FK → Issue
  target_issue_id: FK → Issue
  link_type: enum (blocks, relates, duplicates)
  created_by: FK → User
  created_at: timestamp
  UNIQUE (source_issue_id, target_issue_id, link_type)
}

IssueWatcher {
  issue_id: FK → Issue
  user_id: FK → User
  PRIMARY KEY (issue_id, user_id)
}

IssueTemplate {
  id: UUID
  project_id: FK → Project
  name: string
  title_pattern: string?
  description_template: text?
  type: string?
  priority: enum?
  labels: string[]? (label IDs)
  assignee_id: FK → User?
  sort_order: number
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
}
```

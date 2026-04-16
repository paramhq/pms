# Part 10: Labels & Tags

## Features

### 10.1 Label Structure
- Label = name + color
- Color palette: 12 predefined colors (red, orange, yellow, green, teal, blue, indigo, purple, pink, gray, brown, lime)
- Custom hex color option
- Label name: 1-50 chars, case-insensitive uniqueness

### 10.2 Label Scope
| Scope | Visibility | Management |
|-------|-----------|-----------|
| **Project labels** | Only within that project | Project admin |
| **Workspace labels** | Available in all projects | Workspace admin |

- When applying labels to an issue: combined list (workspace + project labels)
- Label source indicator: small badge or section header in picker

### 10.3 Apply Labels to Issues
- Multi-select: an issue can have 0..N labels
- Label picker UI: search input + scrollable list with checkboxes
- Create new label inline: "Create label: {typed text}" option at bottom
- Applied labels shown as colored pills/chips on issue card and detail view
- Click label pill → filter list by that label
- `L` keyboard shortcut on issue → open label picker

### 10.4 Label Management (Settings)
- Table view: color swatch, name, issue count (how many issues use this label)
- Create: name + color picker
- Edit: rename, change color (updates all existing usages)
- Delete: confirmation with "This label is used on N issues. Remove from all?"
- Merge: combine two labels into one (reassign all issues)
- Sort: alphabetical, by usage count
- Bulk delete

### 10.5 Filter by Label
- In issue list filter bar: "Label" chip → multi-select checkboxes
- In search: label as filter criterion
- In saved views: labels as part of saved filter config
- Board swimlanes by label (deferred)

### 10.6 Label Auto-suggest
- When typing in label picker, auto-suggest existing labels
- Fuzzy match: "bg" matches "bug", "bg-fix" matches "bug-fix"
- Show recently used labels first

## Data Model

```
Label {
  id: UUID
  workspace_id: FK → Workspace
  project_id: FK → Project? (null = workspace-level)
  name: string
  color: string (hex, e.g., "#ef4444")
  sort_order: number
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
  UNIQUE (workspace_id, project_id, LOWER(name))
}

IssueLabel {
  issue_id: FK → Issue
  label_id: FK → Label
  added_by: FK → User
  added_at: timestamp
  PRIMARY KEY (issue_id, label_id)
}
```

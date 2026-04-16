# Part 3: Projects

## Features

### 3.1 Create Project
- Project name (required, 2-100 chars)
- Project key (auto-derived from name, editable, 2-10 uppercase chars, unique within workspace)
  - Auto-derivation: "Payment Service" → "PS", "Mobile App" → "MA"
  - Used in issue IDs: PS-1, PS-2, MA-1, etc.
- Description (optional, rich text / markdown)
- Project lead (user picker, default: creator)
- Default assignee: None, Project Lead, or specific user
- Project icon: emoji picker or color swatch
- Visibility: Public (all workspace members) / Private (invited only)
- Methodology: Basic (list-only, no sprints) — others deferred

### 3.2 Project List
- Grid view: project cards with icon, name, key, description preview, lead, member count, issue count
- List view: table with sortable columns
- Filter: by visibility, by lead, by my projects, search
- Sort: by name, by created date, by last updated, by issue count
- Favorite/star toggle (pin to sidebar + filter)
- Create project CTA (button + empty state)

### 3.3 Project Settings
- **General**: name, key (read-only after creation? or editable with re-key warning), description, lead, default assignee, icon, visibility
- **Members**: add/remove project members, set project role (Admin, Member, Viewer)
- **Labels**: manage project-specific labels
- **Custom Fields**: enable/configure per project (future, but design the UI)
- **Notifications**: project-level notification defaults
- **Features Toggle**: enable/disable modules (backlog, labels, attachments, time tracking — toggle shows/hides sections)
- **Danger Zone**: archive project, delete project

### 3.4 Project Roles (per project)
| Role | Permissions |
|------|------------|
| **Project Admin** | Full project settings, manage members, delete issues |
| **Member** | Create/edit issues, comment, manage own issues |
| **Viewer** | Read-only: view issues, comments, activity |

### 3.5 Project Favorites
- Star/unstar from project list or sidebar
- Starred projects appear in sidebar "Favorites" section
- Quick access from command palette

### 3.6 Archive Project
- Hides from active project list
- Issues become read-only
- Searchable and viewable
- Unarchive to restore full functionality
- Archived indicator badge

### 3.7 Delete Project
- Soft delete: 30-day recovery window
- Requires typing project name to confirm
- All issues, comments, attachments associated are soft-deleted
- Only workspace Admin / Owner or Project Admin can delete

### 3.8 Project Templates
- Create project from template
- Template includes: label set, custom field config, feature toggles, description template
- Built-in templates: "Software Project", "Bug Tracker", "Simple Tasks"
- Save current project config as template

### 3.9 Project Categories
- Optional grouping: "Frontend", "Backend", "Design", "Infrastructure"
- Category: name + color
- Filter project list by category
- Manage categories in workspace settings

### 3.10 Project Overview Page
- Project README (rich text, editable by project admins)
- Quick stats: total issues, open issues, closed last 7 days
- Recent activity feed
- Team members list
- Quick links to list/backlog views

## Pages/Screens

1. **Project List** — grid/list toggle, search, filter, sort, create button
2. **Create Project Modal** — name, key, description, lead, visibility, icon
3. **Project Overview** — README, stats, activity, team
4. **Project Settings > General** — edit name, key, description, lead, etc.
5. **Project Settings > Members** — members table, invite, role dropdown
6. **Project Settings > Labels** — label CRUD (name + color)
7. **Project Settings > Features** — toggle switches for modules
8. **Project Settings > Danger Zone** — archive, delete with confirmation

## Data Model

```
Project {
  id: UUID
  workspace_id: FK → Workspace
  name: string
  key: string (unique per workspace, uppercase, 2-10 chars)
  description: string? (markdown)
  icon_emoji: string? (emoji character)
  icon_color: string? (hex color)
  visibility: enum (public, private)
  lead_id: FK → User?
  default_assignee_id: FK → User? (nullable = unassigned)
  default_assignee_rule: enum (none, project_lead, specific_user)
  issue_counter: number (auto-increment for issue IDs)
  archived_at: timestamp?
  deleted_at: timestamp?
  created_by: FK → User
  created_at: timestamp
  updated_at: timestamp
}

ProjectMember {
  id: UUID
  project_id: FK → Project
  user_id: FK → User
  role: enum (admin, member, viewer)
  added_at: timestamp
  added_by: FK → User
}

ProjectFavorite {
  user_id: FK → User
  project_id: FK → Project
  created_at: timestamp
  PRIMARY KEY (user_id, project_id)
}

ProjectCategory {
  id: UUID
  workspace_id: FK → Workspace
  name: string
  color: string (hex)
  sort_order: number
}

ProjectTemplate {
  id: UUID
  workspace_id: FK → Workspace
  name: string
  description: string?
  config: JSON (labels, fields, features, etc.)
  created_by: FK → User
  created_at: timestamp
}
```

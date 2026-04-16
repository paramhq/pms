# Part 2: Workspace / Organization

## Features

### 2.1 Create Workspace
- First-time user creates workspace after registration
- Workspace name (required, 2-50 chars)
- Workspace URL slug (auto-derived from name, editable, unique, 3-30 chars, lowercase alphanumeric + hyphens)
- Workspace logo (image upload, optional)
- Creator becomes Owner (only 1 owner per workspace)

### 2.2 Workspace General Settings
- Edit name, slug, logo
- Timezone (IANA timezone, default: UTC)
- Date format: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
- Time format: 12h / 24h
- Working days: checkboxes Mon-Sun (default: Mon-Fri)
- Week start day: Monday / Sunday / Saturday
- Default issue type for new issues (Task)
- Default priority for new issues (Medium)

### 2.3 Member Management
- Invite by email (single or bulk, comma-separated)
- Invite link (time-limited URL, configurable expiry)
- Pending invites list (resend, revoke)
- Active members list: name, email, role, joined date, last active
- Change member role (Admin, Member, Guest)
- Remove member (with confirmation, reassign their issues?)
- Transfer ownership (Owner → another user)
- Member search/filter

### 2.4 Workspace Roles
| Role | Description |
|------|-------------|
| **Owner** | Full control, billing, can delete workspace. Only 1 per workspace. |
| **Admin** | Manage settings, members, projects. Cannot manage billing or delete workspace. |
| **Member** | Create projects, create/edit issues, view all public projects. |
| **Guest** | Limited: can only view/edit issues they're assigned to in invited projects. |

### 2.5 Teams
- Create team: name, description, color/avatar
- Team members: add/remove from workspace members
- Team lead: optional, one member designated as lead
- Team used for: assignment, filtering, swimlanes, notifications
- Delete team (doesn't delete members)
- Team list view with member count

### 2.6 Workspace Deletion
- Only Owner can delete
- Requires password confirmation + type workspace name
- 30-day grace period (soft delete)
- Download data export before deletion
- Email notification to all members
- Permanent purge after 30 days

### 2.7 Data Export
- Export all workspace data: projects, issues, comments, attachments
- Format: JSON (structured) or CSV (flat tables)
- Async process (notify when ready, download link)
- Include attachments option (ZIP)

## Pages/Screens

1. **Create Workspace** — name, slug, logo upload (onboarding flow)
2. **Workspace Settings > General** — name, slug, logo, timezone, date format
3. **Workspace Settings > Members** — invite form, members table, role dropdown
4. **Workspace Settings > Teams** — team list, create/edit team modal
5. **Invite Accept Page** — accept invite, create account if new
6. **Delete Workspace Confirmation** — danger zone, type name to confirm

## Data Model

```
Workspace {
  id: UUID
  name: string
  slug: string (unique)
  logo_url: string?
  timezone: string (default: "UTC")
  date_format: enum (DMY, MDY, YMD)
  time_format: enum (12h, 24h)
  working_days: number[] (0=Sun, 1=Mon, ..., 6=Sat)
  week_start_day: number (0-6)
  default_issue_type: string (default: "task")
  default_priority: enum (default: "medium")
  owner_id: FK → User
  deleted_at: timestamp?
  created_at: timestamp
  updated_at: timestamp
}

WorkspaceMember {
  id: UUID
  workspace_id: FK → Workspace
  user_id: FK → User
  role: enum (owner, admin, member, guest)
  joined_at: timestamp
  invited_by: FK → User?
}

Team {
  id: UUID
  workspace_id: FK → Workspace
  name: string
  description: string?
  color: string (hex)
  lead_id: FK → User?
  created_at: timestamp
  updated_at: timestamp
}

TeamMember {
  workspace_id: FK → Workspace
  team_id: FK → Team
  user_id: FK → User
  added_at: timestamp
}

WorkspaceInvite {
  id: UUID
  workspace_id: FK → Workspace
  email: string
  role: enum (admin, member, guest)
  token_hash: string
  invited_by: FK → User
  accepted_at: timestamp?
  expires_at: timestamp
  created_at: timestamp
}
```

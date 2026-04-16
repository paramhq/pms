# Part 12: Settings

## Features

### 12.1 Settings Structure

Three levels of settings, each with its own page:

```
/settings                    → User personal settings
/settings/workspace          → Workspace settings (admin)
/projects/:key/settings      → Project settings (project admin)
```

Settings page layout:
- Left sidebar: section navigation
- Right content: section content
- Breadcrumb: Settings > Section Name

---

### 12.2 User Settings (Personal)

#### Profile
- Full name (text input)
- Display name (text input, used in UI if set)
- Email (read-only or change with re-verification)
- Avatar: upload image or use initials (auto-generated)
- Avatar crop/resize on upload
- Remove avatar (revert to initials)

#### Password & Security
- Current password + New password + Confirm (change password form)
- Password strength meter
- 2FA setup/manage (see auth doc)
- Active sessions list with revoke
- Connected OAuth accounts: link/unlink Google, GitHub, Microsoft

#### Notifications
- Table: notification type × channel (in-app, email)
- Toggle switches per cell
- "Mute all" master toggle
- Email digest: Off / Daily / Weekly dropdown
- Per-project overrides: mute specific projects

#### Appearance
- Theme: Light / Dark / System (follows OS)
- Accent color: Blue (default), Purple, Green, Orange, Red — subtle brand customization
- Density: Comfortable (default) / Compact (tighter spacing, smaller text)
- Sidebar: Expanded (default) / Collapsed (icons only)
- Date display: Relative ("3h ago") / Absolute ("Apr 16, 2026 2:30 PM")

#### Language & Region
- Language: English (more later)
- Timezone: dropdown (IANA timezones), override workspace default
- First day of week: Monday / Sunday / Saturday (override workspace)

#### Keyboard Shortcuts
- Full shortcuts reference, organized by category
- Search shortcuts
- Print-friendly view
- Reset to defaults

---

### 12.3 Workspace Settings (Admin only)

#### General
- Workspace name
- URL slug (editable with redirect from old slug for 30 days)
- Logo upload
- Timezone (workspace default)
- Date format: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
- Time format: 12h / 24h
- Working days: checkboxes Mon–Sun
- Week start day

#### Members
- Members table: avatar, name, email, role, joined, last active
- Search/filter members
- Invite new: email input + role selector + send button
- Bulk invite: textarea (comma/newline separated emails)
- Pending invites tab: email, role, invited by, expiry, resend/revoke
- Change role: dropdown per member row
- Remove member: button with confirmation
- Transfer ownership: special action (only Owner)

#### Teams
- Teams list: name, color, member count, lead
- Create team: name, description, color, lead (user picker), members (multi-user picker)
- Edit team: same form
- Delete team: confirmation (doesn't delete members)

#### Issue Types
- List of issue types: icon, name, color, description
- Default types: Story, Bug, Task, Sub-task (can't delete defaults, can rename)
- Create custom type: name, icon (from icon set), color
- Edit: rename, change icon/color
- Delete custom type: reassign existing issues to another type first
- Set default type for new issues

#### Labels (Workspace-level)
- Same CRUD as project labels (see Part 10)
- These labels available in all projects

#### Billing & Plan (Owner only)
- Current plan display
- Seat count + usage
- Upgrade/downgrade options
- Invoice history
- Payment method management
- Cancel subscription

#### Security (Admin)
- Enforce 2FA for all members toggle
- Session timeout duration
- Password policy (minimum requirements)
- IP allowlist (enterprise — deferred)
- SSO configuration (enterprise — deferred)

#### Data & Export
- Export workspace data: JSON/CSV, with/without attachments
- Processing status (async)
- Download link when ready
- Delete workspace (Owner only, danger zone)

---

### 12.4 Project Settings

#### General
- Project name
- Project key (editable? with warning about re-keying all issues)
- Description (markdown editor)
- Project lead (user picker)
- Default assignee rule: None / Project Lead / Specific User
- Project icon (emoji/color picker)
- Visibility: Public / Private toggle

#### Members
- Project members table: name, role, added date
- Add member: user picker from workspace members + role
- Change role: dropdown (Admin, Member, Viewer)
- Remove member: with confirmation
- "Add all workspace members" shortcut

#### Labels (Project-level)
- Same CRUD as workspace labels
- Scoped to this project

#### Notifications
- Default notification settings for this project
- "Notify on all activity" vs "Notify on mentions/assignments only"
- Channel selection override for project events

#### Features
Toggle switches to enable/disable per project:
| Feature | Default | Description |
|---------|---------|-------------|
| Labels | On | Enable label system |
| Attachments | On | Enable file attachments |
| Sub-tasks | On | Enable parent/child issue hierarchy |
| Story Points | On | Show story points field |
| Due Dates | On | Show due date field |
| Time Tracking | Off | Enable time logging (deferred) |

#### Danger Zone
- Archive project: "This project will become read-only"
- Delete project: type project name to confirm, 30-day grace period

## Pages/Screens

1. **User Settings** — tabbed layout: Profile, Security, Notifications, Appearance, Language, Shortcuts
2. **Workspace Settings** — sidebar nav: General, Members, Teams, Issue Types, Labels, Billing, Security, Data
3. **Project Settings** — sidebar nav: General, Members, Labels, Notifications, Features, Danger Zone

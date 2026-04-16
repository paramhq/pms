# Part 15: Permissions (RBAC)

## Features

### 15.1 Permission Levels

Two layers: Workspace Role + Project Role. Effective permission = max of both.

### 15.2 Workspace Roles

| Role | Count | Description |
|------|-------|-------------|
| **Owner** | Exactly 1 | Full control. Billing, delete workspace, transfer ownership. |
| **Admin** | 0..N | Manage settings, members, projects. No billing. |
| **Member** | 0..N | Standard user. Create projects, work on issues. |
| **Guest** | 0..N | Limited. Only sees assigned issues in invited projects. |

### 15.3 Project Roles

| Role | Description |
|------|-------------|
| **Project Admin** | Full project settings, manage project members, delete issues. |
| **Member** | Create/edit issues, comment, manage own issues. |
| **Viewer** | Read-only: view issues, comments, activity. Cannot edit. |

### 15.4 Permission Matrix

| Action | WS Owner | WS Admin | WS Member | WS Guest |
|--------|:--------:|:--------:|:---------:|:--------:|
| **Workspace** | | | | |
| View workspace settings | ✅ | ✅ | ❌ | ❌ |
| Edit workspace settings | ✅ | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ | ❌ |
| Delete workspace | ✅ | ❌ | ❌ | ❌ |
| Invite members | ✅ | ✅ | ❌ | ❌ |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Change member roles | ✅ | ✅ | ❌ | ❌ |
| Manage teams | ✅ | ✅ | ❌ | ❌ |
| **Projects** | | | | |
| Create project | ✅ | ✅ | ✅ | ❌ |
| View public projects | ✅ | ✅ | ✅ | ❌ |
| View private projects | ✅ | ✅ | If member | If member |
| Delete project | ✅ | ✅ | If Proj Admin | ❌ |
| Archive project | ✅ | ✅ | If Proj Admin | ❌ |
| Edit project settings | ✅ | ✅ | If Proj Admin | ❌ |
| Manage project members | ✅ | ✅ | If Proj Admin | ❌ |
| **Issues** | | | | |
| View issues | ✅ | ✅ | ✅ | Assigned only |
| Create issues | ✅ | ✅ | ✅ | ❌ |
| Edit any issue | ✅ | ✅ | If Proj Member+ | ❌ |
| Edit own issues | ✅ | ✅ | ✅ | ✅ |
| Delete issues | ✅ | ✅ | If Proj Admin | ❌ |
| Bulk edit issues | ✅ | ✅ | If Proj Member+ | ❌ |
| **Comments** | | | | |
| View comments | ✅ | ✅ | ✅ | On assigned issues |
| Add comments | ✅ | ✅ | ✅ | On assigned issues |
| Edit own comments | ✅ | ✅ | ✅ | ✅ |
| Delete own comments | ✅ | ✅ | ✅ | ✅ |
| Delete any comment | ✅ | ✅ | If Proj Admin | ❌ |
| Pin comment | ✅ | ✅ | If Proj Admin | ❌ |
| **Labels** | | | | |
| Manage workspace labels | ✅ | ✅ | ❌ | ❌ |
| Manage project labels | ✅ | ✅ | If Proj Admin | ❌ |
| Apply labels to issues | ✅ | ✅ | ✅ | ❌ |
| **Attachments** | | | | |
| Upload attachments | ✅ | ✅ | ✅ | On assigned issues |
| Delete own attachments | ✅ | ✅ | ✅ | ✅ |
| Delete any attachment | ✅ | ✅ | If Proj Admin | ❌ |

### 15.5 Permission Checking Strategy

```
function canUserDo(user, action, resource):
  1. Check workspace role (owner/admin bypass most checks)
  2. Check project membership and project role
  3. Check resource ownership (for "own" actions)
  4. Return allow/deny
```

- Permissions checked server-side on every API call
- Permissions checked client-side for UI hiding/disabling
- Client permission context loaded on auth and cached
- UI adaptation: hide buttons/actions user can't perform (don't just disable)

### 15.6 Guest Access
- Guests can only see projects they're explicitly invited to
- Within those projects, guests only see issues assigned to them
- Guests cannot: create issues, view project settings, see other members' issues
- Guest invite: specific project + viewer/limited role
- Useful for: external clients, contractors, stakeholders

### 15.7 Permission Changes
- Role change takes effect immediately
- Active sessions pick up new permissions on next API call
- Notification sent when role changes: "Your role was changed from Member to Admin by SZ"
- Downgrade: user loses access to admin-only features immediately

## Implementation Notes

- Store permissions as workspace_role + project_role
- Compute effective permissions as a set of allowed actions
- Frontend: `usePermission('issues.create', projectId)` hook → boolean
- API middleware: `requirePermission('issues.create')` decorator
- No complex ACL or resource-level permissions in Phase 1 — role-based only

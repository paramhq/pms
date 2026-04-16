# Build Order: Where a Veteran Starts

A veteran doesn't start with features. They start with the **shell and the patterns** — because once those are right, every feature is just composition.

## The order that matters

### 1. Design System (tokens, not components)

Before a single page exists, nail down:

- **Color tokens** — semantic, not raw (not `blue-500` but `primary`, `surface`, `text.secondary`, `status.error`)
- **Typography scale** — 5-6 sizes max, with weight pairings
- **Spacing scale** — 4px base, stick to it religiously
- **Radius, shadow, border** — 3 variants each, no more
- **Density** — decide compact vs comfortable row heights now

You already have `theme.ts`. That's the right start. But it needs to become the **single source of truth** that every component consults.

### 2. Layout Shell

The chrome that never changes across routes:

```
┌─────────┬──────────────────────────────┐
│         │  Header (breadcrumb, search) │
│ Sidebar ├──────────────────────────────┤
│         │                              │
│  (nav)  │     Content Area (routes)    │
│         │                              │
└─────────┴──────────────────────────────┘
```

- Sidebar: collapsible, responsive, persists across routes
- Header: dynamic breadcrumb from route, global actions
- Content: scrollable, receives routed pages
- **This shell is one component, not scattered across pages**

### 3. Route Architecture

Define every route upfront, even if pages are stubs:

```
/                        → redirect to /dashboard
/login                   → public
/register                → public
/forgot-password         → public

/dashboard               → authed, My Work
/projects                → authed, project list
/projects/:key           → authed, project overview
/projects/:key/issues    → authed, issue list (THE main view)
/projects/:key/issues/:id → authed, issue detail (full page)
/projects/:key/backlog   → authed, backlog
/projects/:key/settings  → authed, project settings

/settings                → authed, user settings
/settings/workspace      → authed, workspace settings (admin)
/notifications           → authed, notifications page
```

Lazy-load everything behind auth. Stub pages with just a heading — they exist in the router from day one.

### 4. Auth Context + Route Guards

Before any feature page:
- `AuthProvider` — holds current user, workspace, permissions
- `ProtectedRoute` wrapper — redirects to `/login` if unauthenticated
- `useCurrentUser()` hook — used everywhere
- Login/Register pages — functional, not pretty (polish later)

Without this, you can't test anything real.

### 5. Reusable Patterns (the "primitives")

These are the 6-8 patterns that every SaaS feature reuses:

| Pattern | Why first |
|---------|-----------|
| **Data Table** | Issue list, member list, project list — it's everywhere |
| **Detail Panel** (slide-over) | Issue detail, notification detail — the split-view pattern |
| **Command Palette** | Central UX hub, wires up navigation + actions early |
| **Modal / Dialog** | Create issue, confirm delete, settings forms |
| **Toast / Snackbar** | Feedback for every mutation |
| **Empty State** | Every list needs one, build the pattern once |
| **Form Pattern** | React Hook Form + Zod + MUI fields — one pattern, every form |
| **Loading Skeleton** | Consistent loading states, not spinners |

Build these as **generic, reusable** wrappers. Then features are just configuration.

### 6. Data Layer Patterns

Establish how data flows **once**, then every feature follows:

```
API call (fetch/axios)
  → React Query hook (useQuery/useMutation)
    → Optimistic update pattern
      → Error handling → Toast
      → Cache invalidation
```

Create:
- `api/client.ts` — base fetch wrapper with auth headers, error handling
- `api/issues.ts` — typed API functions (`getIssues`, `createIssue`, etc.)
- `hooks/useIssues.ts` — React Query hooks that call the API
- **One feature end-to-end as the reference** (issues CRUD)

### 7. First Real Feature: The Issue List

Only NOW build a feature. And it's the issue list because:
- It exercises the data table pattern
- It needs filters, sort, grouping (complex UI)
- It opens the detail panel (second pattern)
- It has inline editing (third pattern)
- It has bulk actions (fourth pattern)

If the issue list works well, everything else is easier.

---

## What veterans do NOT do

- Start with auth pages and make them pixel-perfect
- Build features top-to-bottom (dashboard first, then projects, then issues)
- Create a component library before knowing what they need
- Add state management before there's state to manage
- Build settings pages early (they're boring but low-risk — do them last)

---

## Recommended build order for ProjectHub

```
Phase A: Foundation
  1. Theme + design tokens (done ✓)
  2. Layout shell (sidebar, header, content area)
  3. Route architecture (all routes, stub pages)
  4. Auth context + login/register (functional, not polished)

Phase B: Core Patterns
  5. Command palette (Cmd+K)
  6. Toast/snackbar system
  7. Data table component
  8. Detail panel (slide-over)
  9. Form pattern (RHF + Zod + MUI)
  10. Empty states + loading skeletons

Phase C: First Feature End-to-End
  11. Issue list (data table + filters + sort + grouping)
  12. Issue detail (panel + full page)
  13. Create issue (modal + form)
  14. Comments + activity on issues

Phase D: Supporting Features
  15. Dashboard (My Work)
  16. Project list + create
  17. Backlog (reuses issue list with drag-reorder)
  18. Search + saved filters
  19. Notifications
  20. Labels CRUD

Phase E: Polish
  21. Settings (user, workspace, project)
  22. Keyboard shortcuts
  23. Dark mode
  24. Responsive/mobile
  25. Real-time (WebSocket)
```

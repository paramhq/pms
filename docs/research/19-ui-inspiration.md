# Part 19: UI Inspiration & Design Decisions

## Research Sources

Compiled from research across Linear, Jira, Asana, Notion, ClickUp, Shortcut, Superhuman, and design pattern libraries (Mobbin, SaaSUI, Nicelydone, Dribbble).

---

## Design Philosophy: "Linear meets Notion"

Our design language takes heavy inspiration from **Linear** (keyboard-first, fast, minimal chrome, dark sidebar) and **Notion** (clean content areas, inline editing, block-based descriptions). We avoid the complexity trap of Jira while maintaining its feature depth.

### Core Principles
1. **Speed over decoration** — every interaction should feel instant (optimistic UI, no loading spinners for cached data)
2. **Keyboard-first** — every action reachable without mouse
3. **Progressive disclosure** — show simple by default, reveal complexity on demand
4. **Density control** — let users choose compact vs comfortable
5. **Dark sidebar, light content** — high contrast separation between nav and work area

---

## Screen-by-Screen Design Decisions

### 1. Authentication Pages (Login, Register, Reset)

**Inspiration:** Vercel, Linear, Notion login pages

**Design decisions:**
- Centered card layout, max-width 400px
- Dark background with subtle gradient or grain texture
- Logo + product name at top of card
- Social login buttons (Google, GitHub, Microsoft) above email form
- Divider: "or continue with email"
- Single-column form, large inputs (48px height)
- Password: show/hide toggle, strength meter below
- CTA button: full-width, brand color, 48px height
- Footer links: "Don't have an account? Sign up" / "Forgot password?"
- Minimal — no sidebar, no header, just the auth card
- Subtle animation on card mount (fade + slight rise)

**Color scheme:**
- Background: `#0a0a0b` (near-black) with subtle radial gradient
- Card: `#ffffff` (light mode) or `#18181b` (dark mode)
- Brand accent for buttons and links

**References:**
- [SaaSFrame: 55 SaaS Login Design Examples](https://www.saasframe.io/categories/login)
- [Eleken: 50+ Login Page Examples](https://www.eleken.co/blog-posts/login-page-examples)
- [Landingfolio: SaaS Login Inspiration](https://www.landingfolio.com/inspiration/login/saas)

---

### 2. Sidebar Navigation

**Inspiration:** Linear sidebar (dark, icon + text nav items, project list, user at bottom)

**Design decisions:**
- Fixed left sidebar, 252px wide (collapsible to 64px icon rail)
- Background: `#0f1117` (near-black, not pure black)
- Section structure (top to bottom):
  1. **Logo + workspace name** (clickable → workspace switcher)
  2. **Divider**
  3. **Main nav** (Dashboard, Projects, Backlog, Search, Notifications, Settings)
  4. **Divider**
  5. **Favorites** (starred projects, pinned at top)
  6. **Projects list** (color dot + name + key, scrollable)
  7. **Spacer** (pushes user to bottom)
  8. **Divider**
  9. **User** (avatar + name + role, click → user menu)
- Active item: brand-tinted background (`rgba(60,113,255,0.12)`) + white text + brand icon
- Inactive: muted gray text (`#8b8fa3`), hover → lighter
- Collapse behavior: icons only, tooltips on hover, expand on click
- Mobile: hidden, hamburger trigger, full-screen overlay

**Typography:**
- Nav items: 13px, Inter Medium
- Section labels: 10px, Inter Semibold, uppercase, letter-spacing 1.5px
- Project names: 13px, Inter Medium

**References:**
- [Navbar Gallery: 8+ Best Sidebar Menu Designs](https://www.navbar.gallery/blog/best-side-bar-navigation-menu-design-examples)
- [Lollypop: Anatomy of Effective SaaS Navigation](https://lollypop.design/blog/2025/december/saas-navigation-menu-design/)
- [Linear Design System (Figma)](https://www.figma.com/community/file/1222872653732371433/linear-design-system)

---

### 3. Header Bar

**Inspiration:** Linear top bar (breadcrumb left, actions right, thin)

**Design decisions:**
- Height: 56px, fixed, white background
- Left: breadcrumb navigation (Projects / PMS / Backlog) — each segment clickable
- Right: search bar (220px, collapsed icon on mobile) + notification bell (with unread badge) + "Create Issue" primary button
- Bottom border: 1px `#e5e7eb`
- Breadcrumb: 13px, gray text, last segment bold + dark
- No tabs in header — tabs belong to content area

---

### 4. Issue List / Table View

**Inspiration:** Linear issue list (dense, scannable rows, inline status badges), Notion table view (clean grid)

**Design decisions:**
- **Row height:** 44px comfortable, 36px compact
- **Row structure:** checkbox | type icon | key | title (flex) | status badge | priority icon | assignee avatar | updated time
- **Hover:** subtle background highlight (`#f5f6f8`), reveal action icons (status quick-change, assignee)
- **Selected:** brand-tinted background (`#eef2ff`)
- **Click:** opens detail panel (slide from right)
- **Right-click:** context menu
- **Column headers:** sticky, 32px height, sortable (click to toggle, arrow indicator)
- **Grouping:** section headers (collapsible), e.g., "In Progress (3)" with colored dot
- **Empty rows:** "No issues match your filters" centered text + clear filters link
- **Virtual scrolling:** for 1000+ issues, only render visible rows
- **Quick create:** persistent input at bottom, or "+" button

**Key visual elements per row:**
```
[☐] [🔵] PMS-42  Implement drag-and-drop for board cards  [In Progress ●] [↑] [👤AK] 2h ago
```
- Type icon: 14px colored shape (green story, red bug, blue task)
- Key: 12px, monospace, muted gray
- Title: 14px, medium weight, dark
- Status: pill badge with dot + text, colored by category
- Priority: 14px icon only (colored arrow/triangle)
- Assignee: 24px circular avatar with initials
- Time: 12px, muted gray, relative

**References:**
- [SaaSUI: Linear screenshots](https://www.saasui.design/application/linear)
- [Nicelydone: Linear UI examples](https://nicelydone.club/apps/linear)

---

### 5. Issue Detail (Side Panel + Full Page)

**Inspiration:** Linear issue detail (clean, metadata sidebar, activity feed), Jira new issue view (configurable panels)

**Design decisions:**

#### Side Panel Mode (default)
- Slides in from right, 55% width (min 520px)
- Backdrop: slight dim on list behind
- Close: click backdrop, Esc, or X button
- Smooth slide animation (200ms)

#### Full Page Mode
- Click expand icon in panel → full page
- Route: `/projects/PMS/issues/PMS-42`
- Two-column layout: content (60%) + metadata sidebar (40%)

#### Layout (both modes)
**Header:**
- Type icon + Issue key ("PMS-42") — click to copy link
- Title: large (18px), bold, inline-editable
- Status dropdown badge (colored)
- More menu (⋯): Clone, Move, Delete, Share

**Left Column (content):**
- Description: rich text block, collapsible, auto-save
  - Editor: Tiptap-based (supports markdown, slash commands, @mentions, images, code blocks, tables, checklists)
  - Empty state: "Add a description..." placeholder
- Sub-tasks section: child issue list, inline add, progress bar
- Linked issues section: grouped by link type
- Attachments section: thumbnail grid, drag-drop zone
- Activity section (bottom):
  - Tab toggle: All | Comments | History
  - Comments: rich text, @mentions, reactions, threaded replies
  - History: compact field change log
  - New comment input (rich text editor) at bottom

**Right Column (metadata sidebar):**
- Each field: label (12px, gray, uppercase) + value (14px, editable)
- Fields top-to-bottom:
  - Status (dropdown)
  - Assignee (user picker with avatar)
  - Priority (dropdown with colored icons)
  - Labels (tag chips, multi-select)
  - Story Points (number input)
  - Due Date (date picker)
  - Reporter (user picker)
  - Created (read-only, relative time)
  - Updated (read-only, relative time)
- Click any value to edit inline (dropdown/picker appears)

**References:**
- [Jira: New Issue View UI Locations](https://developer.atlassian.com/cloud/jira/platform/issue-view/)
- [Jira: View content in side panel](https://support.atlassian.com/jira-software-cloud/docs/view-content-in-a-side-panel/)
- [Atlassian: Configure issue detail view](https://support.atlassian.com/jira-software-cloud/docs/configure-the-issue-detail-view/)

---

### 6. Create Issue Modal

**Inspiration:** Linear create issue (minimal, fast, keyboard-navigable), Notion page creation

**Design decisions:**
- Centered modal, 640px wide, max-height 80vh
- Keyboard: `C` to open, `Cmd+Enter` to submit, `Esc` to close
- Form layout (single column):
  1. Project selector (if multi-project) — dropdown at top
  2. Title: large input (18px), autofocus, placeholder "Issue title"
  3. Description: expandable rich text editor (starts collapsed, 2 lines)
  4. Divider
  5. Metadata row (horizontal): Type | Status | Priority | Assignee | Labels | Points | Due Date
     - Each as compact inline picker (click to open dropdown)
     - Shows current value as icon/chip
  6. Divider
  7. Footer: "Create" (primary) + "Create & create another" (secondary)
- "Create & create another": submits, clears form, keeps modal open
- Toast: "PMS-42 created" with "Open" link

---

### 7. Command Palette (Cmd+K)

**Inspiration:** Linear Cmd+K, Superhuman command palette, VS Code command palette, Raycast

**Design decisions:**
- Centered overlay, 560px wide, max-height 400px
- Backdrop: dark blur overlay
- Input: large (16px), no border, placeholder "Type a command or search..."
- Magnifying glass icon left of input
- Results: sectioned list below input
  - Section headers: "Recent", "Actions", "Issues", "Projects"
  - Each result: icon + text + shortcut hint (right-aligned, muted)
  - Arrow key highlight (active row has brand-tinted background)
  - Max 8 visible, scroll for more
- Enter: execute selected command
- Esc: close
- Empty state: show recent items + suggested commands
- Typing filters results instantly (fuzzy match)
- Footer hint: "↑↓ Navigate  ↵ Select  Esc Close"

**References:**
- [Superhuman: How to build a remarkable command palette](https://blog.superhuman.com/how-to-build-a-remarkable-command-palette/)
- [Retool: Designing the command palette](https://retool.com/blog/designing-the-command-palette)
- [Mobbin: Command Palette UI Design](https://mobbin.com/glossary/command-palette)
- [Medium: Command Palette UX Patterns](https://medium.com/design-bootcamp/command-palette-ux-patterns-1-d6b6e68f30c1)
- [Maggie Appleton: Command K Bars](https://maggieappleton.com/command-bar)

---

### 8. Notification Center

**Inspiration:** Linear notifications, GitHub notification inbox

**Design decisions:**
- **Dropdown** (from bell icon): 380px wide, max-height 480px
  - Header: "Notifications" + "Mark all as read" link
  - Tabs: All | Unread | Mentions
  - Each notification:
    - Actor avatar (24px) + text + relative time
    - Blue dot for unread (left side)
    - Click → navigate to issue + mark as read
  - Footer: "View all notifications" link
- **Full page** (`/notifications`):
  - Same content, full-width table layout
  - Bulk actions: select + mark read + delete
  - Filter by project, type
  - Pagination

**References:**
- [SuprSend: Building Jira-like In-App Inbox](https://www.suprsend.com/inapp-inbox-inspiration/building-jira-like-in-app-inbox-for-your-workflow-management-application-with-production-grade-code)
- [Atlassian: View your notifications](https://support.atlassian.com/confluence-cloud/docs/view-your-notifications/)

---

### 9. Dashboard ("My Work")

**Inspiration:** Linear "My Issues" view, Asana "My Tasks", Notion homepage

**Design decisions:**
- Two-column layout (desktop), single column (mobile/tablet)
- **Left column (70%):**
  1. Greeting: "Good morning, Sukhdev" with date
  2. **Overdue** (red accent) — only shows if items exist
  3. **My Issues** — grouped by status (To Do, In Progress, In Review)
     - Each group: collapsible, count badge
     - Each row: type icon, key, title, priority, project badge
  4. **Due This Week** — sorted by due date
  5. **Activity Stream** — last 20 events, compact
- **Right column (30%):**
  1. Quick Stats: assigned / completed this week / overdue
  2. Quick Actions: Create Issue, Search
  3. Favorite Projects: list with open issue counts
  4. Recently Viewed: last 10 issues

---

### 10. Settings Pages

**Inspiration:** Linear settings (sidebar nav, clean sections), Notion settings, GitHub settings

**Design decisions:**
- Layout: fixed sidebar (200px) + scrollable content
- Sidebar: section list (General, Members, Teams, etc.)
- Content: max-width 680px, centered in remaining space
- Section header: large (20px), bold
- Form groups: label + input/control, vertical stack, 16px gap
- Save: auto-save where possible (toggle switches), explicit "Save changes" for text fields
- Danger zone: red-bordered section at bottom, requires confirmation

**References:**
- [Nicelydone: 4167+ Settings Page Examples](https://nicelydone.club/pages/settings)
- [SaaSInterface: 145 Settings UI Examples](https://saasinterface.com/pages/settings/)
- [Nicelydone: 441+ Workspace Settings Examples](https://nicelydone.club/pages/workspace-settings)

---

### 11. Rich Text Editor (Description & Comments)

**Inspiration:** Notion block editor, Linear description editor, GitHub markdown

**Design decisions:**
- **Library:** Tiptap (based on ProseMirror) — mature, extensible, React-native
- **Features:**
  - Slash commands (`/` menu): heading, list, code, image, table, divider, checklist
  - Markdown shortcuts: `#` heading, `**` bold, `*` italic, `` ` `` code, `>` quote, `-` list
  - @mentions: users (triggers notification) and issues (auto-links)
  - Inline images: paste, drag-drop, upload button
  - Code blocks: syntax highlighting (highlight.js), language selector, copy button
  - Tables: insert, add/remove rows/columns
  - Checklists: interactive checkboxes
  - Toolbar: floating toolbar on text selection (bold, italic, strike, code, link, heading)
- **Auto-save:** debounced 1s after last keystroke, save indicator
- **Placeholder:** "Type '/' for commands, or start writing..."

**References:**
- [Liveblocks: Which rich text editor framework for 2025](https://liveblocks.io/blog/which-rich-text-editor-framework-should-you-choose-in-2025)
- [Velt: Best JavaScript Rich Text Editors for React](https://velt.dev/blog/best-javascript-rich-text-editors-react)
- [BlockNote: Block-based React editor](https://www.blocknotejs.org/)
- [Nicelydone: 80+ Rich Text Editor UI Components](https://nicelydone.club/components/rich-text-editor)

---

## Global Design Tokens

### Typography
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Page title | 20px | 700 (Bold) | 1.3 |
| Section header | 16px | 600 (Semibold) | 1.4 |
| Body / table cells | 14px | 400 (Regular) | 1.5 |
| Small / meta | 12px | 500 (Medium) | 1.4 |
| Tiny / badges | 10-11px | 600 (Semibold) | 1.3 |
| Monospace (code, keys) | 13px | 400 | 1.5 |

### Spacing Scale (4px base)
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight gaps (icon-text) |
| space-2 | 8px | Between related elements |
| space-3 | 12px | Card padding, list gaps |
| space-4 | 16px | Section gaps |
| space-5 | 20px | Section padding |
| space-6 | 24px | Large section gaps |
| space-8 | 32px | Page-level spacing |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | Badges, small chips |
| radius-md | 6px | Buttons, inputs, cards |
| radius-lg | 8px | Modals, large cards |
| radius-xl | 12px | Panels, containers |
| radius-full | 9999px | Avatars, pills |

### Shadows
| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | `0 1px 2px rgba(0,0,0,0.05)` | Cards, inputs |
| shadow-md | `0 4px 6px -1px rgba(0,0,0,0.1)` | Dropdowns, popovers |
| shadow-lg | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, command palette |
| shadow-xl | `0 20px 25px -5px rgba(0,0,0,0.1)` | Full-page overlays |

### Animation
| Token | Value | Usage |
|-------|-------|-------|
| duration-fast | 100ms | Hover, focus states |
| duration-normal | 200ms | Transitions, panel slide |
| duration-slow | 300ms | Modal fade, page transitions |
| easing | `cubic-bezier(0.4, 0, 0.2, 1)` | All animations |

---

## SaaS UI Trend Notes (2025-2026)

From research across [SaaSUI Blog](https://www.saasui.design/blog/7-saas-ui-design-trends-2026), [Good Side](https://goodside.fi/en/blog/top-saas-ui-trends-2025), [Eloqwnt](https://www.eloqwnt.com/blog/saas-website-design-trends):

1. **Minimalist interfaces with progressive disclosure** — strip complexity, reveal on demand
2. **Dark mode as default option** — not just a toggle, but a first-class design consideration
3. **AI-augmented interactions** — command palettes evolving into AI assistants
4. **Micro-interactions** — subtle hover states, transitions, loading skeletons
5. **Variable density** — let users control information density
6. **Monochrome + single accent** — Linear popularized this: black/white + one brand color
7. **Keyboard-first design** — visible shortcut hints, vim-like navigation

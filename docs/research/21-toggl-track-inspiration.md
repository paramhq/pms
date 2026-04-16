# Toggl Track UI Analysis — Design Inspiration

Source: [SaaSUI / Toggl Track](https://www.saasui.design/application/toggl-track) — 21 screenshots analyzed.

---

## Overall Design Language

Toggl Track uses a **dark purple sidebar + light content area** pattern with a warm, approachable personality. It's polished but not cold — rounded corners everywhere, soft shadows, playful illustrations for empty states, and a distinctive purple brand identity.

**What makes it feel premium:**
- Consistent 8px radius on everything
- Generous whitespace — nothing feels cramped
- Illustrations for empty/upgrade states (not just text)
- Subtle background gradient on the page (light pink/lavender tint)
- Purple as accent color threads through every interactive element

---

## Sidebar

### Structure (top to bottom)
```
┌─────────────────────┐
│ ● Workspace          │  ← Workspace name + dropdown chevron
│   YOUR ORGANIZATION  │  ← Subtitle (uppercase, tiny)
│ ● [timer icon]       │  ← Quick workspace switcher
├─────────────────────┤
│ TRACK                │  ← Section label
│ ⏱ 0:03:40   ✏       │  ← Running timer + edit pencil icon
├─────────────────────┤
│ ANALYZE              │  ← Section label
│ 📊 Analytics    ▾    │  ← Expandable
│    Client and Proj…  │  ← Sub-item (indented)
│    Organization Ov…  │  ← Sub-item
│ 📋 Reports           │
│ 💡 Insights          │
│ ✅ Approvals         │
├─────────────────────┤
│ MANAGE               │  ← Section label
│ 📁 Projects   ← active (highlighted)
│ 👥 Clients           │
│ 👤 Members           │
│ 💰 Billable rates    │
│ 📄 Invoices  BETA    │  ← Badge chip for beta features
│ 🏷 Tags              │
│ 🔗 Integrations      │
│ ▾ Show more          │
├─────────────────────┤
│ ADMIN                │  ← Section label
│ 💳 Subscription      │
│ 🏢 Organization      │
│ ⚙ Settings           │
├─────────────────────┤
│ 👤 PROFILE           │  ← Bottom, user avatar + link
│ 🔔 [notification]    │
│ ❓ [help]            │
└─────────────────────┘
```

### Sidebar Visual Details
| Property | Value |
|----------|-------|
| **Width** | ~140-150px (narrow — compact text, single-line items) |
| **Background** | `#2C1338` — very dark plum/purple (not pure black) |
| **Text color (inactive)** | `#C4A8CF` — muted lavender |
| **Text color (active)** | `#FFFFFF` — pure white |
| **Active item background** | `#5B2E6E` — medium purple, full-width highlight with slight rounding |
| **Section labels** | `#8B6B96` — muted, uppercase, ~10px, letter-spaced |
| **Icon style** | Outlined icons, ~16px, same color as text |
| **Hover** | Slight lighten on background |
| **Running timer** | Shows elapsed time (green text `0:03:40`) with edit pencil |
| **Badge** | "BETA" chip next to "Invoices" — small purple pill |
| **Bottom icons** | Profile avatar, notification bell, help (?) — small, pinned to bottom |

### Key Sidebar Takeaways for ProjectHub
- **Sectioned with uppercase labels** (TRACK, ANALYZE, MANAGE, ADMIN)
- **Running timer/active sprint visible** in sidebar always
- **Expandable sections** (Analytics has sub-items)
- **BETA badges** for new features — good pattern
- **Very narrow** (~150px) — more screen real estate for content
- **Bottom-pinned** profile/help/notifications

---

## Header / Top Bar

| Property | Value |
|----------|-------|
| **Height** | ~48-52px |
| **Background** | White (`#FFFFFF`) |
| **Border** | None visible (clean separation from sidebar via contrast) |
| **Left content** | Page title ("Projects") + breadcrumb ("Projects > Self") |
| **Right content** | Date context + action buttons ("+ New project", "Edit Project", "Alerts") |
| **Title** | ~18px, bold, dark |
| **Primary CTA** | Purple filled button with `+` icon ("+ New project") — rounded, ~32px height |
| **Secondary CTA** | Outlined button ("Edit Project", "Alerts") |
| **Breadcrumb** | Purple dot separator between segments, clickable |

---

## Content Area

### Background
- Light with a **subtle warm gradient/tint** — not pure white, slightly pinkish/lavender (`~#FBF5FC` or `#FAF0FB`)
- Creates a warm, approachable feel vs cold gray

### Content Card Pattern
- Main content sits in a **white card** with rounded corners (~12px radius) and subtle shadow
- Card has generous padding (~24-32px)
- Card is centered with max-width (~900-1000px), doesn't stretch full width

### Settings Page Layout
- **Tab bar** at top: "General | Alerts | Reminders | Billable rates | CSV import | Data export | Single Sign-On | Activity"
- Tabs: horizontal, purple underline on active, ~13px medium weight
- Content below: form fields in single column, max-width ~600px
- Section headers: bold ~14px, with description text below in muted gray
- Form fields: standard height (~40px), full-width within column, rounded corners

### Project Page Layout
- **Sub-tabs**: "Dashboard | Tasks | Team"
- Table view: clean rows, column headers (ALL MEMBERS/GROUPS, RATE, COST, ROLE, TOTAL HOURS)
- Table cells: ~44px row height, muted borders
- **Plan badges**: colored chips ("STARTER" in green, "PREMIUM" in purple)

### List/Filter Pattern (Projects page)
- **Filter bar**: dropdown ("Show All, except Archived") + filter chips ("Client", "Member", "Project name", "Template")
- Filter chips: outlined, icon + text, ~32px height
- Active filter: bold, with ✕ clear button
- Table below: blurred/placeholder rows (skeleton-like appearance)

### Empty State / Upgrade Prompts
- **Illustration**: playful, colorful vector art (characters, objects)
- **Headline**: clear, benefit-oriented ("Get a quick overview with the project dashboard")
- **Description**: 1-2 lines explaining the feature
- **CTA**: purple button ("View plans", "Enable beta features")
- **Generous vertical spacing** around illustration

### Modal Pattern (Create Client)
- Centered, ~400px wide
- White background, ~16px radius, shadow
- Close ✕ in top-right
- Single text input with label
- Full-width purple "Create" button at bottom
- Simple, single-purpose — one action per modal

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Purple (primary)** | `#CB54C5` / `#D65FD0` | Buttons, active states, links, brand accent |
| **Dark purple (sidebar)** | `#2C1338` | Sidebar background |
| **Medium purple** | `#5B2E6E` | Active sidebar item, hover |
| **Lavender muted** | `#C4A8CF` | Sidebar inactive text |
| **Background tint** | `#FBF5FC` | Page background (warm lavender-pink) |
| **White** | `#FFFFFF` | Cards, header, content bg |
| **Text primary** | `#1A1A2E` | Headings, body text |
| **Text secondary** | `#6B6B80` | Descriptions, meta |
| **Text muted** | `#9B9BAF` | Placeholders, timestamps |
| **Border** | `#E8E0EB` | Dividers, input borders (slightly warm) |
| **Success/green** | `#34D399` | Timer running, success states |
| **Warning badge** | `#FBBF24` | Attention needed |

---

## Typography

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Page title | 18-20px | 700 (Bold) | "Projects", "Clients", "Settings" |
| Section header | 14px | 600 (Semibold) | "Team member rights", "Project & Billing defaults" |
| Body text | 13-14px | 400 (Regular) | Descriptions, form labels |
| Sidebar nav items | 13px | 500 (Medium) | Nav labels |
| Sidebar section labels | 10px | 600, uppercase | "TRACK", "ANALYZE", "MANAGE" |
| Table headers | 12px | 600, uppercase | Column headers |
| Badges/chips | 11px | 700 | "BETA", "STARTER", "PREMIUM" |
| Small meta | 12px | 400 | Timestamps, helper text |

**Font family:** System/Inter-like sans-serif

---

## Component Patterns

### Buttons
| Variant | Style |
|---------|-------|
| Primary | Purple fill (`#CB54C5`), white text, rounded (~8px), 32-36px height |
| Secondary | Outlined, gray border, dark text, same height |
| Ghost | No border/bg, purple text, hover shows subtle bg |
| Icon + text | `+` icon before label ("+ New project") |

### Chips/Badges
| Type | Style |
|------|-------|
| Filter chip | Outlined, icon + text, ~32px, rounded full |
| Status badge | Filled, colored bg, uppercase tiny text ("BETA", "STARTER") |
| Label badge | Rounded pill, colored by type |

### Tabs
- Horizontal, inline with content
- Active: purple text + purple underline (2px)
- Inactive: gray text, no underline
- ~13px medium weight, ~40px hit area

### Forms
- Input height: ~40px
- Border: 1px light gray, rounded 8px
- Focus: purple border
- Labels: above input, 13px semibold
- Checkboxes: rounded, purple fill when checked
- Toggle switches: rounded pill shape

---

## What to Adopt for ProjectHub

### Adopt (high value)
1. **Warm background tint** — not cold gray, slight lavender/purple warmth
2. **Narrow sidebar** (~180-200px) with section labels (uppercase, muted)
3. **Content in white card** — centered, max-width, rounded corners, shadow
4. **Playful empty states** — illustrations + clear CTA
5. **Filter bar pattern** — dropdown + chips, clean and scannable
6. **Single-purpose modals** — simple, focused, one input
7. **Tab pattern** — horizontal tabs with underline indicator
8. **Generous spacing** — nothing cramped, let content breathe
9. **Subtle warm borders** — not pure gray, slightly tinted to match brand

### Adapt (modify for our context)
1. **Color**: swap purple for our blue brand (`#3C71FF`) — same patterns, different hue
2. **Sidebar width**: slightly wider (~200-220px) since we have more nav items
3. **Timer → Sprint indicator**: their running timer in sidebar → our active sprint/progress
4. **Section labels**: TRACK/ANALYZE/MANAGE → our own grouping (NAVIGATION / PROJECTS / ADMIN)

### Skip (not relevant)
1. Timer-specific UI (we're a PMS, not time tracker)
2. Billable rates / invoicing UI
3. Calendar integration patterns

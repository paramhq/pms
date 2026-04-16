# Part 17: Responsive Design & Accessibility

## Responsive Design

### 17.1 Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop XL | ≥ 1440px | Full sidebar (252px) + content |
| Desktop | 1024–1439px | Full sidebar (240px) + content |
| Tablet | 768–1023px | Collapsed sidebar (icons, 64px) + content |
| Mobile | < 768px | No sidebar, bottom nav, hamburger menu |

### 17.2 Desktop Layout
- Fixed sidebar (left) + scrollable content (right)
- Issue detail: side panel (60/40 split)
- Settings: sidebar nav + content area
- Dashboard: 2-column layout

### 17.3 Tablet Layout
- Sidebar collapses to icon-only rail (64px)
- Hover/click to expand temporarily
- Issue detail: overlay panel (slides from right, 80% width)
- Settings: tabbed instead of sidebar
- Dashboard: single column

### 17.4 Mobile Layout (< 768px)
- No sidebar — replaced by:
  - **Hamburger menu** (top-left): opens full-screen nav overlay
  - **Bottom nav bar**: 5 items (Dashboard, Projects, Create, Search, More)
- Issue list: single column, compact cards
- Issue detail: full-screen page (no panel)
- Create issue: full-screen modal
- Command palette: full-screen
- Touch-friendly: minimum 44x44px tap targets
- Pull-to-refresh on lists

### 17.5 Mobile-specific UI
- Bottom sheets instead of dropdowns for pickers
- Swipe gestures: swipe issue row left for quick actions (status, delete)
- Sticky table headers when scrolling
- Compact card view for issue lists
- Hamburger → full nav with: search, notifications, settings, profile

### 17.6 Sidebar Behavior
- Desktop: always visible, user can toggle collapsed/expanded
- Tablet: collapsed by default, expandable on hover/click
- Mobile: hidden, accessible via hamburger
- Collapsed state: icons only, tooltips on hover
- Transition: smooth width animation (200ms)

---

## Accessibility (WCAG 2.2 AA)

### 17.7 Semantic HTML
| Component | Semantic Element |
|-----------|-----------------|
| Navigation sidebar | `<nav aria-label="Main navigation">` |
| Issue list | `<table>` or `role="grid"` with row/cell roles |
| Issue detail | `<article>` with `<header>`, `<section>` |
| Modals | `<dialog>` with focus trap |
| Dropdowns | `role="listbox"` or `role="menu"` |
| Tabs | `role="tablist"` + `role="tab"` + `role="tabpanel"` |
| Toast | `role="alert"` or `role="status"` |
| Breadcrumbs | `<nav aria-label="Breadcrumb">` with `<ol>` |
| Command palette | `role="combobox"` with `role="listbox"` results |

### 17.8 Keyboard Navigation
- Full tab order for all interactive elements
- Visible focus indicators (2px brand-color ring, 2px offset)
- Skip to content link (first focusable element)
- Arrow key navigation within lists, menus, tabs
- `Enter`/`Space` to activate buttons and links
- `Esc` to close modals, dropdowns, panels
- Focus trap in modals (Tab cycles within modal)
- Focus return: after closing modal, focus returns to trigger element

### 17.9 Focus Management
- After creating issue: focus on new issue in list, or on issue detail
- After deleting issue: focus on adjacent issue in list
- After closing detail panel: focus on the row that opened it
- After form submission: focus on success message or next actionable element
- Route changes: focus on page heading (via ref)

### 17.10 ARIA Attributes
| Pattern | ARIA |
|---------|------|
| Status badges | `aria-label="Status: In Progress"` |
| Priority icons | `aria-label="Priority: High"` |
| Type icons | `aria-label="Type: Bug"` |
| Avatar | `aria-label="Assigned to Sukhdev Z."` |
| Toggle buttons | `aria-pressed="true"` |
| Expandable sections | `aria-expanded="true/false"` |
| Loading states | `aria-busy="true"` on region |
| Sort headers | `aria-sort="ascending"` / `"descending"` / `"none"` |
| Required fields | `aria-required="true"` |
| Error messages | `aria-describedby` linking to error text |
| Live updates | `aria-live="polite"` for activity feed |
| Notifications | `aria-live="assertive"` for toast |

### 17.11 Color & Contrast
- All text: minimum 4.5:1 contrast ratio (AA)
- Large text (≥18px bold or ≥24px): minimum 3:1
- Interactive elements: 3:1 against adjacent colors
- Never rely on color alone: icons + text + color for status/priority/type
- Focus indicators: 3:1 contrast against background
- Dark mode: recalculate all contrasts

### 17.12 Reduced Motion
- Respect `prefers-reduced-motion: reduce`:
  - Disable all transitions/animations
  - Instant state changes instead of slide/fade
  - No parallax or auto-playing animations
  - Skeleton loaders instead of spinners
- Implementation: CSS `@media (prefers-reduced-motion: reduce)` global override

### 17.13 Screen Reader Support
- All images: alt text (meaningful) or `aria-hidden` (decorative)
- Icon-only buttons: `aria-label` describing action
- Form labels: every input has associated `<label>` or `aria-label`
- Error messages: linked to input via `aria-describedby`
- Dynamic content: `aria-live` regions for real-time updates
- Route announcements: announce page title on navigation

### 17.14 Dark Mode
- Three options: Light / Dark / System (follows OS)
- All colors have dark mode variants (defined in CSS theme)
- No hardcoded colors — all via CSS variables or Tailwind theme
- Smooth transition between modes (200ms)
- Persist preference in user settings (server) + localStorage (immediate)
- System mode: listen to `prefers-color-scheme` media query changes

### 17.15 Density Modes
| Mode | Row Height | Font Size | Padding | Use Case |
|------|-----------|-----------|---------|----------|
| Comfortable | 48px | 14px | 12px | Default, spacious |
| Compact | 36px | 13px | 8px | Power users, more data visible |

- Toggle in user settings > appearance
- Affects: issue list rows, sidebar items, form fields, cards
- CSS variable-driven: `--density-row-height`, `--density-padding`, etc.

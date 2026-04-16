# Part 14: Keyboard Shortcuts & Command Palette

## Features

### 14.1 Command Palette (Cmd+K)

Central command hub — the most important UX feature for power users.

**Trigger:** `Cmd+K` (Mac) / `Ctrl+K` (Windows)

**UI:**
- Centered overlay modal with backdrop blur
- Large search input at top with placeholder "Type a command or search..."
- Results below, categorized with section headers
- Arrow keys navigate, Enter selects, Esc closes
- Results update as you type (debounced 100ms)

**Result Categories (in order):**

| Category | Trigger | Examples |
|----------|---------|---------|
| **Recent** | Empty input | Last 5 recently viewed issues |
| **Actions** | Verbs: "create", "new", "assign" | "Create issue", "Create project", "Invite member" |
| **Navigation** | "go", "open" or page names | "Go to Dashboard", "Go to Backlog", "Open Settings" |
| **Issues** | Any text | Search issues by title/ID across all projects |
| **Projects** | "project" or project names | Jump to specific project |
| **People** | "people", "@", user names | View user profile, assign to user |

**Detailed commands:**
| Command | Shortcut Hint | Description |
|---------|--------------|-------------|
| Create issue | `C` | Opens create issue modal |
| Create project | — | Opens create project modal |
| Go to Dashboard | `G D` | Navigate to dashboard |
| Go to Backlog | `G L` | Navigate to backlog |
| Go to Settings | `G S` | Navigate to settings |
| Toggle dark mode | — | Switch light/dark theme |
| Search issues | — | Focus search with query |
| Copy current URL | — | Copy page URL to clipboard |

**Behavior:**
- Fuzzy matching: "crt iss" matches "Create Issue"
- Shortcut hints shown on right side of each result
- Max 8 visible results, scroll for more
- "No results" empty state with suggestions
- Context-aware: commands change based on current page
  - On issue list: "Filter by...", "Sort by...", "Group by..."
  - On issue detail: "Change status", "Assign to...", "Add label"

### 14.2 Global Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Cmd+K` | Command palette | Everywhere |
| `C` | Create issue | Not in text input |
| `/` | Focus search | Not in text input |
| `G` then `D` | Go to Dashboard | Sequence (press G, release, press D) |
| `G` then `L` | Go to Backlog/List | Sequence |
| `G` then `P` | Go to Projects | Sequence |
| `G` then `S` | Go to Settings | Sequence |
| `G` then `N` | Go to Notifications | Sequence |
| `?` | Show shortcuts overlay | Not in text input |
| `Esc` | Close modal/panel/dropdown | When modal/panel open |

### 14.3 Issue List Shortcuts

| Shortcut | Action |
|----------|--------|
| `J` or `↓` | Move selection down |
| `K` or `↑` | Move selection up |
| `Enter` | Open selected issue |
| `Space` or `X` | Toggle checkbox (select) |
| `Shift+J/K` | Extend selection |
| `Cmd+A` | Select all (visible) |
| `Cmd+Shift+A` | Deselect all |

### 14.4 Issue Detail Shortcuts

| Shortcut | Action |
|----------|--------|
| `E` | Edit title |
| `A` | Open assignee picker |
| `S` | Open status picker |
| `P` | Open priority picker |
| `L` | Open label picker |
| `M` | Add comment (focus comment input) |
| `Cmd+Enter` | Submit comment (in comment editor) |
| `[` | Previous issue (in list context) |
| `]` | Next issue (in list context) |
| `Cmd+C` | Copy issue link |
| `Del` or `Backspace` | Delete issue (with confirmation) |

### 14.5 Shortcuts Overlay

Triggered by `?` key:
- Full-screen overlay showing all shortcuts
- Organized by category: Global, Navigation, Issue List, Issue Detail, Editor
- Searchable
- Close with Esc or click backdrop

### 14.6 Shortcut Conflicts
- Text inputs: most shortcuts disabled when focused in text input/editor
- Exception: `Esc` always works (blurs input first, then closes modal)
- Exception: `Cmd+K` always works (opens palette even from text input)
- Exception: `Cmd+Enter` always works (submit)

### 14.7 Sequence Shortcuts
- G-sequences: press `G`, brief timeout (500ms), press second key
- Visual: show "G..." hint briefly after pressing G
- If second key not pressed within timeout, cancel sequence

## Implementation Notes

- Use a keyboard shortcut manager library or custom hook
- Register/unregister shortcuts based on current route/context
- Respect user's OS key repeat settings
- Don't override browser defaults (Cmd+T, Cmd+W, etc.)
- Announce shortcut actions to screen readers via live regions

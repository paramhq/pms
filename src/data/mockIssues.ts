import type { Issue, Assignee } from "@/types/issue";

export const MOCK_ASSIGNEES: Assignee[] = [
  { id: "usr_001", fullName: "Sukhdev Zala", displayName: "Sukhdev Z.", initials: "SZ", avatarColor: "#7e22ce" },
  { id: "usr_002", fullName: "Anil Kumar", displayName: "Anil K.", initials: "AK", avatarColor: "#10b981" },
  { id: "usr_003", fullName: "Priya Sharma", displayName: "Priya S.", initials: "PS", avatarColor: "#f59e0b" },
  { id: "usr_004", fullName: "Dev Mehta", displayName: "Dev M.", initials: "DM", avatarColor: "#e11d48" },
  { id: "usr_005", fullName: "Neha Reddy", displayName: "Neha R.", initials: "NR", avatarColor: "#6366f1" },
];

// Dates relative to ~mid April 2026
const d = (daysAgo: number, hoursAgo = 0) => {
  const date = new Date(2026, 3, 16, 12);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const MOCK_ISSUES: Issue[] = [
  // TO DO
  { id: "i_01", number: 1, key: "PMS-1", title: "Set up CI/CD pipeline with GitHub Actions", description: "Configure automated build, test, and deploy workflow for the PMS project using GitHub Actions. Include staging and production environments.", status: "todo", priority: "high", type: "task", assigneeId: "usr_004", reporterId: "usr_001", storyPoints: 5, dueDate: "2026-04-25", labels: ["infrastructure"], createdAt: d(14), updatedAt: d(14) },
  { id: "i_02", number: 2, key: "PMS-2", title: "Design onboarding wizard for new workspaces", description: "Create a multi-step onboarding flow that guides new users through workspace setup, project creation, and first issue.", status: "todo", priority: "medium", type: "story", assigneeId: "usr_003", reporterId: "usr_001", storyPoints: 8, dueDate: "2026-04-30", labels: ["design", "frontend"], createdAt: d(12), updatedAt: d(10) },
  { id: "i_03", number: 3, key: "PMS-3", title: "Add bulk issue import from CSV", description: "", status: "todo", priority: "low", type: "story", assigneeId: null, reporterId: "usr_002", storyPoints: 5, dueDate: null, labels: [], createdAt: d(10), updatedAt: d(10) },
  { id: "i_04", number: 4, key: "PMS-4", title: "Fix timezone offset in date pickers", description: "Date pickers show incorrect dates for users in UTC+ timezones. The offset calculation in the date utility is wrong.", status: "todo", priority: "high", type: "bug", assigneeId: "usr_005", reporterId: "usr_003", storyPoints: 3, dueDate: "2026-04-18", labels: ["bug"], createdAt: d(8), updatedAt: d(6) },

  // IN PROGRESS
  { id: "i_05", number: 5, key: "PMS-5", title: "Implement issue list with DataTable component", description: "Build the main issue list view using the generic DataTable component. Include sortable columns, filters, and click-to-open detail panel.", status: "in_progress", priority: "critical", type: "story", assigneeId: "usr_001", reporterId: "usr_001", storyPoints: 13, dueDate: "2026-04-20", labels: ["frontend"], createdAt: d(7), updatedAt: d(0, 2) },
  { id: "i_06", number: 6, key: "PMS-6", title: "WebSocket integration for real-time updates", description: "Set up WebSocket connection for live issue updates, comments, and presence indicators.", status: "in_progress", priority: "high", type: "task", assigneeId: "usr_004", reporterId: "usr_001", storyPoints: 13, dueDate: "2026-04-22", labels: ["backend"], createdAt: d(7), updatedAt: d(1) },
  { id: "i_07", number: 7, key: "PMS-7", title: "Create reusable avatar group component", description: "", status: "in_progress", priority: "medium", type: "subtask", assigneeId: "usr_003", reporterId: "usr_005", storyPoints: 2, dueDate: null, labels: ["frontend"], createdAt: d(5), updatedAt: d(0, 5) },
  { id: "i_08", number: 8, key: "PMS-8", title: "Add role-based access control to API endpoints", description: "Implement RBAC middleware that checks workspace role and project role before allowing API operations.", status: "in_progress", priority: "critical", type: "story", assigneeId: "usr_002", reporterId: "usr_001", storyPoints: 8, dueDate: "2026-04-19", labels: ["backend", "security"], createdAt: d(6), updatedAt: d(0, 8) },
  { id: "i_09", number: 9, key: "PMS-9", title: "Fix login redirect loop on expired sessions", description: "Users with expired JWT tokens get stuck in a redirect loop between /login and /dashboard.", status: "in_progress", priority: "high", type: "bug", assigneeId: "usr_001", reporterId: "usr_004", storyPoints: 3, dueDate: "2026-04-17", labels: ["bug"], createdAt: d(3), updatedAt: d(0, 1) },

  // IN REVIEW
  { id: "i_10", number: 10, key: "PMS-10", title: "Implement command palette (Cmd+K)", description: "Global command palette with fuzzy search, keyboard navigation, and actions for navigation and issue creation.", status: "in_review", priority: "high", type: "story", assigneeId: "usr_001", reporterId: "usr_001", storyPoints: 8, dueDate: "2026-04-16", labels: ["frontend"], createdAt: d(10), updatedAt: d(0, 3) },
  { id: "i_11", number: 11, key: "PMS-11", title: "Add notification preferences to user settings", description: "Per-notification-type toggles for in-app and email channels.", status: "in_review", priority: "medium", type: "task", assigneeId: "usr_005", reporterId: "usr_002", storyPoints: 5, dueDate: null, labels: ["frontend"], createdAt: d(8), updatedAt: d(1) },
  { id: "i_12", number: 12, key: "PMS-12", title: "Fix memory leak in notification polling", description: "The setInterval in useNotifications hook is not cleared on unmount, causing memory leaks on navigation.", status: "in_review", priority: "critical", type: "bug", assigneeId: "usr_004", reporterId: "usr_001", storyPoints: 3, dueDate: "2026-04-16", labels: ["bug", "backend"], createdAt: d(4), updatedAt: d(0, 6) },
  { id: "i_13", number: 13, key: "PMS-13", title: "Write API documentation for issue endpoints", description: "", status: "in_review", priority: "low", type: "task", assigneeId: "usr_002", reporterId: "usr_001", storyPoints: 3, dueDate: null, labels: ["documentation"], createdAt: d(6), updatedAt: d(2) },

  // DONE
  { id: "i_14", number: 14, key: "PMS-14", title: "Design system: purple theme with Toggl inspiration", description: "Created a comprehensive MUI theme with dark purple sidebar, warm lavender background, and gradient buttons.", status: "done", priority: "high", type: "story", assigneeId: "usr_001", reporterId: "usr_001", storyPoints: 5, dueDate: "2026-04-12", labels: ["design"], createdAt: d(14), updatedAt: d(4) },
  { id: "i_15", number: 15, key: "PMS-15", title: "Implement authentication flow", description: "Login, register, forgot password pages with React Hook Form, Zod validation, and mock auth context.", status: "done", priority: "critical", type: "story", assigneeId: "usr_001", reporterId: "usr_001", storyPoints: 8, dueDate: "2026-04-10", labels: ["frontend"], createdAt: d(14), updatedAt: d(6) },
  { id: "i_16", number: 16, key: "PMS-16", title: "Set up project scaffolding", description: "Vite + React 19 + MUI v9 + React Router v7 + React Query v5 + Zod v4 + pnpm", status: "done", priority: "high", type: "task", assigneeId: "usr_001", reporterId: "usr_001", storyPoints: 3, dueDate: "2026-04-08", labels: ["infrastructure"], createdAt: d(16), updatedAt: d(14) },
  { id: "i_17", number: 17, key: "PMS-17", title: "Fix duplicate notification on issue assign", description: "Assigning an issue triggers two notifications instead of one.", status: "done", priority: "low", type: "bug", assigneeId: "usr_005", reporterId: "usr_003", storyPoints: 1, dueDate: null, labels: ["bug"], createdAt: d(9), updatedAt: d(7) },
  { id: "i_18", number: 18, key: "PMS-18", title: "Implement sprint velocity chart", description: "", status: "done", priority: "none", type: "task", assigneeId: "usr_003", reporterId: "usr_002", storyPoints: 5, dueDate: null, labels: [], createdAt: d(12), updatedAt: d(8) },
];

export const INITIAL_ISSUE_COUNTER = 18;

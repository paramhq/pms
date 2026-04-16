export type IssueType = "story" | "bug" | "task" | "subtask";
export type Priority = "critical" | "high" | "medium" | "low";
export type Status = "todo" | "in_progress" | "in_review" | "done";

export interface Issue {
  id: string;
  title: string;
  type: IssueType;
  priority: Priority;
  storyPoints?: number;
  assignee: { name: string; initials: string; color: string };
  labels?: string[];
  commentCount?: number;
  attachmentCount?: number;
}

export interface Column {
  id: Status;
  title: string;
  dotColor: string;
  issues: Issue[];
}

const assignees = {
  sz: { name: "Sukhdev Z.", initials: "SZ", color: "#3c71ff" },
  ak: { name: "Anil K.", initials: "AK", color: "#10b981" },
  pr: { name: "Priya R.", initials: "PR", color: "#f59e0b" },
  dm: { name: "Dev M.", initials: "DM", color: "#8b5cf6" },
  ns: { name: "Neha S.", initials: "NS", color: "#ef4444" },
};

export const columns: Column[] = [
  {
    id: "todo",
    title: "TO DO",
    dotColor: "#6b7280",
    issues: [
      {
        id: "PMS-142",
        title: "Add bulk issue import from CSV",
        type: "story",
        priority: "medium",
        storyPoints: 5,
        assignee: assignees.ak,
        commentCount: 3,
      },
      {
        id: "PMS-145",
        title: "Fix timezone offset in sprint burndown chart",
        type: "bug",
        priority: "high",
        storyPoints: 3,
        assignee: assignees.ns,
        labels: ["bug-fix"],
      },
      {
        id: "PMS-148",
        title: "Design empty state illustrations for boards",
        type: "task",
        priority: "low",
        storyPoints: 2,
        assignee: assignees.pr,
      },
      {
        id: "PMS-151",
        title: "Add keyboard shortcut overlay (? key)",
        type: "story",
        priority: "medium",
        storyPoints: 3,
        assignee: assignees.dm,
        commentCount: 1,
      },
    ],
  },
  {
    id: "in_progress",
    title: "IN PROGRESS",
    dotColor: "#3b82f6",
    issues: [
      {
        id: "PMS-138",
        title: "Implement drag-and-drop for board cards",
        type: "story",
        priority: "critical",
        storyPoints: 8,
        assignee: assignees.sz,
        commentCount: 7,
        attachmentCount: 2,
      },
      {
        id: "PMS-140",
        title: "WebSocket integration for real-time board updates",
        type: "task",
        priority: "high",
        storyPoints: 13,
        assignee: assignees.dm,
        commentCount: 5,
        labels: ["backend"],
      },
      {
        id: "PMS-144",
        title: "Create reusable avatar group component",
        type: "subtask",
        priority: "medium",
        storyPoints: 2,
        assignee: assignees.pr,
      },
    ],
  },
  {
    id: "in_review",
    title: "IN REVIEW",
    dotColor: "#f59e0b",
    issues: [
      {
        id: "PMS-135",
        title: "Add role-based access control to project settings",
        type: "story",
        priority: "high",
        storyPoints: 8,
        assignee: assignees.ak,
        commentCount: 12,
        attachmentCount: 1,
        labels: ["security"],
      },
      {
        id: "PMS-139",
        title: "Fix memory leak in notification polling",
        type: "bug",
        priority: "critical",
        storyPoints: 5,
        assignee: assignees.sz,
        commentCount: 4,
      },
    ],
  },
  {
    id: "done",
    title: "DONE",
    dotColor: "#10b981",
    issues: [
      {
        id: "PMS-130",
        title: "Setup CI/CD pipeline with GitHub Actions",
        type: "task",
        priority: "high",
        storyPoints: 5,
        assignee: assignees.dm,
        labels: ["devops"],
      },
      {
        id: "PMS-132",
        title: "Implement sprint velocity chart",
        type: "story",
        priority: "medium",
        storyPoints: 5,
        assignee: assignees.pr,
        commentCount: 3,
      },
      {
        id: "PMS-134",
        title: "Fix duplicate notification on issue assign",
        type: "bug",
        priority: "low",
        storyPoints: 1,
        assignee: assignees.ns,
      },
    ],
  },
];

export const navItems = [
  { icon: "home", label: "Dashboard", active: false },
  { icon: "folder", label: "Projects", active: false },
  { icon: "board", label: "Board", active: true },
  { icon: "list", label: "Backlog", active: false },
  { icon: "sprint", label: "Sprints", active: false },
  { icon: "chart", label: "Reports", active: false },
  { icon: "settings", label: "Settings", active: false },
];

export const projects = [
  { name: "PMS", key: "PMS", color: "#3c71ff", active: true },
  { name: "Mobile App", key: "MOB", color: "#10b981", active: false },
  { name: "Design System", key: "DSN", color: "#f59e0b", active: false },
];

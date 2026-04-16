export type IssueType = "story" | "bug" | "task" | "subtask";
export type Priority = "critical" | "high" | "medium" | "low" | "none";
export type Status = "todo" | "in_progress" | "in_review" | "done";

export interface Assignee {
  id: string;
  fullName: string;
  displayName: string;
  initials: string;
  avatarColor: string;
}

export interface Issue {
  id: string;
  number: number;
  key: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  type: IssueType;
  assigneeId: string | null;
  reporterId: string;
  storyPoints: number | null;
  dueDate: string | null;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IssueFilters {
  status: Status[];
  priority: Priority[];
  type: IssueType[];
  assigneeId: string[];
  searchText: string;
}

// Lookup arrays for dropdowns
export const ISSUE_TYPES: readonly IssueType[] = ["story", "bug", "task", "subtask"];
export const PRIORITIES: readonly Priority[] = ["critical", "high", "medium", "low", "none"];
export const STATUSES: readonly Status[] = ["todo", "in_progress", "in_review", "done"];

// Display labels
export const STATUS_LABELS: Record<Status, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  done: "Done",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "None",
};

export const TYPE_LABELS: Record<IssueType, string> = {
  story: "Story",
  bug: "Bug",
  task: "Task",
  subtask: "Sub-task",
};

export const EMPTY_FILTERS: IssueFilters = {
  status: [],
  priority: [],
  type: [],
  assigneeId: [],
  searchText: "",
};

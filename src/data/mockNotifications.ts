import type { Notification } from "@/types/notification";

const d = (hoursAgo: number) => {
  const date = new Date(2026, 3, 16, 14);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n_01", type: "assigned", actorId: "usr_001", issueKey: "PMS-9", issueTitle: "Fix login redirect loop on expired sessions", message: "Sukhdev Z. assigned PMS-9 to you", read: false, createdAt: d(1) },
  { id: "n_02", type: "status_changed", actorId: "usr_004", issueKey: "PMS-12", issueTitle: "Fix memory leak in notification polling", message: "Dev M. moved PMS-12 to In Review", read: false, createdAt: d(3) },
  { id: "n_03", type: "commented", actorId: "usr_002", issueKey: "PMS-8", issueTitle: "Add role-based access control to API endpoints", message: "Anil K. commented on PMS-8", read: false, createdAt: d(5) },
  { id: "n_04", type: "mentioned", actorId: "usr_003", issueKey: "PMS-5", issueTitle: "Implement issue list with DataTable component", message: "Priya S. mentioned you in PMS-5", read: false, createdAt: d(8) },
  { id: "n_05", type: "assigned", actorId: "usr_001", issueKey: "PMS-10", issueTitle: "Implement command palette (Cmd+K)", message: "Sukhdev Z. assigned PMS-10 to you", read: true, createdAt: d(12) },
  { id: "n_06", type: "status_changed", actorId: "usr_005", issueKey: "PMS-17", issueTitle: "Fix duplicate notification on issue assign", message: "Neha R. moved PMS-17 to Done", read: true, createdAt: d(18) },
  { id: "n_07", type: "commented", actorId: "usr_004", issueKey: "PMS-6", issueTitle: "WebSocket integration for real-time updates", message: "Dev M. commented on PMS-6", read: true, createdAt: d(24) },
  { id: "n_08", type: "assigned", actorId: "usr_002", issueKey: "PMS-13", issueTitle: "Write API documentation for issue endpoints", message: "Anil K. assigned PMS-13 to you", read: true, createdAt: d(36) },
  { id: "n_09", type: "mentioned", actorId: "usr_001", issueKey: "PMS-14", issueTitle: "Design system: purple theme with Toggl inspiration", message: "Sukhdev Z. mentioned you in PMS-14", read: true, createdAt: d(48) },
  { id: "n_10", type: "status_changed", actorId: "usr_003", issueKey: "PMS-18", issueTitle: "Implement sprint velocity chart", message: "Priya S. moved PMS-18 to Done", read: true, createdAt: d(72) },
];

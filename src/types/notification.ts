export interface Notification {
  id: string;
  type: "assigned" | "commented" | "status_changed" | "mentioned";
  actorId: string;
  issueKey: string;
  issueTitle: string;
  message: string;
  read: boolean;
  createdAt: string;
}

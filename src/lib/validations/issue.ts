import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be 255 characters or less"),
  description: z.string(),
  type: z.enum(["story", "bug", "task", "subtask"]),
  priority: z.enum(["critical", "high", "medium", "low", "none"]),
  status: z.enum(["todo", "in_progress", "in_review", "done"]),
  assigneeId: z.string(),
  storyPoints: z.string(),
  labels: z.string(),
});

export type CreateIssueFormData = z.infer<typeof createIssueSchema>;

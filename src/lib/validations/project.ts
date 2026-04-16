import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  key: z
    .string()
    .min(2, "Key must be 2-5 characters")
    .max(5)
    .regex(/^[A-Z]+$/, "Key must be uppercase letters only"),
  description: z.string(),
  color: z.string().min(1, "Pick a color"),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;

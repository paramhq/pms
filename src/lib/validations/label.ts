import { z } from "zod";

export const labelSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  color: z.string().min(1, "Pick a color"),
});

export type LabelFormData = z.infer<typeof labelSchema>;

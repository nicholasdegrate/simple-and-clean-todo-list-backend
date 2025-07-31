import { z } from "zod";

const colorValidator = z.string().refine(
  (value) => {
    try {
      return true;
    } catch {
      return false;
    }
  },
  {
    message:
      "Invalid color format. Must be hex (#ffffff) or rgb (rgb(255,255,255))",
  }
);

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  color: colorValidator,
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title too long")
    .optional(),
  color: colorValidator.optional(),
  completed: z.boolean().optional(),
});

export const taskParamsSchema = z.object({
  id: z.uuid(),
});

export type CreateTaskData = z.infer<typeof createTaskSchema>;
export type UpdateTaskData = z.infer<typeof updateTaskSchema>;
export type TaskParams = z.infer<typeof taskParamsSchema>;

const task = z.object({
  id: z.uuid(),
  title: z.string(),
  color: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof task>;

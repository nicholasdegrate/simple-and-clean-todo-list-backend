import { Request, Response } from "express";
import { asyncHandler } from "~/core/middleware/errorHandler";
import { sendError, sendSuccess } from "~/core/utils/response";
import { taskService } from "./task.service";
import { createTaskSchema, taskParamsSchema, updateTaskSchema } from "./type";

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();

  return sendSuccess(res, { tasks }, "Tasks retrieved successfully");
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const validation = taskParamsSchema.safeParse(req.params);
  if (!validation.success) {
    return sendError(
      res,
      "Invalid task ID",
      400,
      validation.error.issues[0]?.message
    );
  }

  const task = await taskService.getTaskById(validation.data.id);
  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  return sendSuccess(res, task, "Task retrieved successfully");
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const validation = createTaskSchema.safeParse(req.body);
  if (!validation.success) {
    return sendError(
      res,
      "Validation failed",
      400,
      validation.error.issues[0]?.message
    );
  }

  const task = await taskService.createTask(validation.data);
  return sendSuccess(res, task, "Task created successfully", 201);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const paramsValidation = taskParamsSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return sendError(
      res,
      "Invalid task ID",
      400,
      paramsValidation.error.issues[0]?.message
    );
  }

  const bodyValidation = updateTaskSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return sendError(
      res,
      "Validation failed",
      400,
      bodyValidation.error.issues[0]?.message
    );
  }

  const task = await taskService.updateTask(
    paramsValidation.data.id,
    bodyValidation.data
  );
  return sendSuccess(res, task, "Task updated successfully");
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const validation = taskParamsSchema.safeParse(req.params);
  if (!validation.success) {
    return sendError(
      res,
      "Invalid task ID",
      400,
      validation.error.issues[0]?.message
    );
  }

  await taskService.deleteTask(validation.data.id);
  return sendSuccess(res, null, "Task deleted successfully");
});

import { prisma } from "~/core/database";
import { AppError } from "~/core/middleware/errorHandler";
import { filterUndefined } from "~/core/utils/helper";
import { Prisma } from "~/generated/prisma";
import {
  CreateTaskData,
  Task,
  UpdateTaskData,
  createTaskSchema,
  updateTaskSchema,
} from "./type";

class TaskService {
  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new AppError("Task not found", 404);
      }
      throw new AppError(`Database error: ${error.message}`, 400);
    }
    throw new AppError("Database operation failed", 500);
  }

  private async safeExecute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async getAllTasks(): Promise<Task[]> {
    return this.safeExecute(() =>
      prisma.task.findMany({
        orderBy: { createdAt: "desc" },
      })
    );
  }

  async getTaskById(id: string): Promise<Task> {
    return this.safeExecute(() =>
      prisma.task.findUniqueOrThrow({ where: { id } })
    );
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    const validatedData = createTaskSchema.parse(data);

    return this.safeExecute(() =>
      prisma.task.create({
        data: {
          ...validatedData,
          completed: false,
        },
      })
    );
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    const validatedData = updateTaskSchema.parse(data);
    const updateData = filterUndefined<UpdateTaskData, Prisma.TaskUpdateInput>(
      validatedData
    );

    return this.safeExecute(() =>
      prisma.task.update({
        where: { id },
        data: updateData,
      })
    );
  }

  async deleteTask(id: string): Promise<Task> {
    return this.safeExecute(() => prisma.task.delete({ where: { id } }));
  }
}

export const taskService = new TaskService();

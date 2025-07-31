import { Router } from "express";
import healthRoutes from "./health/routes";
import taskRoutes from "./tasks/task.router";

const router: Router = Router();

router.use("/health", healthRoutes);
router.use("/tasks", taskRoutes);

export default router;

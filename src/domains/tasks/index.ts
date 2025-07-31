import { Router } from "express";
import taskRoutes from "./task.router";

const router: Router = Router();

router.use("/tasks", taskRoutes);

export default router;

import { Router } from "express";
import { prisma } from "~/core/database";

const router: Router = Router();

router.get("/ping", (_req, res) => {
  res.status(200).send({ ping: "pong" });
});

router.get("/healthz", async (_req, res) => {
  try {
    const [db] = await Promise.allSettled([isDatabaseReachable()]);
    const services = {
      db: db.status === "fulfilled" && db.value,
    };
    const healthy = Object.values(services).every(Boolean);

    res.status(healthy ? 200 : 503).send({
      healthy,
      services,
    });
  } catch {
    res.status(500).send({ healthy: false });
  }
});
/**
 * isDatabaseReachable
 *
 * simple fn to test the "health" of the database. For now
 * it's good enough if we can reach the DB and ensure there's
 * more than 1 task.
 */
async function isDatabaseReachable() {
  try {
    const taskCount = await prisma.task.count();
    return taskCount;
  } catch (err) {
    return false;
  }
}

export default router;

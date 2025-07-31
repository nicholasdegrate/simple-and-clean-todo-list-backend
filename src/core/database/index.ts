import config from "~/core/config";
import { PrismaClient } from "~/generated/prisma";

export function initPrismaClient(): PrismaClient {
  return new PrismaClient({
    datasources: {
      db: {
        url: config.DATABASE_URL,
      },
    },
  });
}

export const prisma = initPrismaClient();

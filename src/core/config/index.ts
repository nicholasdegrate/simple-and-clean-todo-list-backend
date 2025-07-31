import dotenv from "dotenv";
import z from "zod";
dotenv.config();

export const environment = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  API_PREFIX: z.string().default("/api/v1"),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const config = environment.parse(process.env);
export default config;

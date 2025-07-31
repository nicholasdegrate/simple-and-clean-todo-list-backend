import compression from "compression";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import config from "~/core/config";
import { notFoundHandler } from "~/core/middleware/errorHandler";
import routes from "~/domains";

function createApp(): Application {
  const app: Application = express();

  app.use(helmet());

  app.use(
    cors({
      origin: config.CORS_ORIGIN,
    })
  );

  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(config.API_PREFIX, routes);
  app.use(notFoundHandler);

  return app;
}

export default createApp;

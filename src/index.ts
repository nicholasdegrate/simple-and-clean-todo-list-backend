import createApp from "~/app";
import config from "~/core/config";

function startServer(): void {
  const app = createApp();

  app.listen(config.PORT, () => {
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Server running on port ${config.PORT}`);
    console.log(`http://localhost:${config.PORT}${config.API_PREFIX}`);
  });
}

if (require.main === module) {
  startServer();
}

export default startServer;

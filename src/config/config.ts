export interface AppConfig {
  app_name: string;
  app_port: number;
  app_cors_origin: string[];
  graphql_host: string;
}

export class Config {
  private appConfig: AppConfig;

  constructor() {
    this.appConfig = this.loadConfigFromEnv();
  }

  private loadConfigFromEnv(): AppConfig {
    const app_name = process.env.APP_NAME;
    const app_port = process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : undefined;
    const app_cors_origin = process.env.APP_CORS_ORIGIN?.split(',');
    const graphql_host = process.env.GRAPHQL_HOST;

    if (
      !app_name ||
      app_port === undefined ||
      !app_cors_origin ||
      !graphql_host
    ) {
      throw new Error('Missing required environment variables');
    }

    return {
      app_name,
      app_port,
      app_cors_origin,
      graphql_host
    };
  }

  public getConfig(): AppConfig {
    return this.appConfig;
  }
}

import { DataSource } from "typeorm";

import { AppDataSourceTypeORM } from "./data_source.ts";
import log from "./logger.ts";

async function startConnection(): Promise<DataSource> {
  return new Promise((resolve, reject) => {
    log.info("Establishing SQLite3 connection (with TypeORM)...");
    AppDataSourceTypeORM.initialize()
      .then((dataSource) => {
        log.info("SQLite3 Database connection established successfully.");
        resolve(dataSource);
      })
      .catch((error) => {
        log.error("Error connecting to the database:", error);
        reject(error);
      });
  });
}

async function shutdownConnection(connection?: DataSource): Promise<void> {
  log.trace(
    `Shutting down the SQLite3 connection (with TypeORM)...${
      connection ? "CONNECTION CURRENTLY ACTIVE!" : " No connection found currently."
    }`
  );
  await connection?.destroy();
  log.trace("SQLite3 Database connection closed.");
  process.exit(0);
}

export { shutdownConnection, startConnection };

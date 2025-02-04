import sqlite3 from "sqlite3";

import log from "./logger.ts";

function openSQLDatabase(): sqlite3.Database {
  const sqlDatabase = new sqlite3.Database("./assets/SQL_database.db", (err) => {
    if (err) {
      log.error("Failed to connect to SQLite. Exiting now...");
      log.error(err.message);
      process.exit(1);
    }
    log.info("Sucessfully initiated connection to SQLite");
  });

  return sqlDatabase;
}

function closeSQLDatabase(sqlDatabase: sqlite3.Database) {
  sqlDatabase.close((err) => {
    if (err) {
      log.error(err.message);
      log.error("Failed to disconnect from SQLite.");
      return false;
    }
    log.info("Sucessfully closed connection to SQLite");
    return true;
  });
}

async function ensureConnectionToSQLDatabase(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sqlDatabase = openSQLDatabase();
    // return closeSQLDatabase(sqlDatabase);

    // Successfully connected
    sqlDatabase.serialize(() => {
      resolve(true); // Resolve the promise on success
    });

    sqlDatabase.on("error", (err) => {
      log.error("Error during SQLite connection:", err.message);
      reject(false); // Reject the promise on error
    });
  });
}

export { openSQLDatabase, closeSQLDatabase, ensureConnectionToSQLDatabase };

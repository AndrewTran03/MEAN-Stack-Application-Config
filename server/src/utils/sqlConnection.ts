import sqlite3 from "sqlite3";
import log from "./logger";

function openSQLDatabase() {
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
    });

    return true;
}

async function ensureConnectionToSQLDatabase(): Promise<boolean> {
    return new Promise(() => {
        const sqlDatabase = openSQLDatabase();
        return closeSQLDatabase(sqlDatabase);
    });
}

export { openSQLDatabase, closeSQLDatabase, ensureConnectionToSQLDatabase };

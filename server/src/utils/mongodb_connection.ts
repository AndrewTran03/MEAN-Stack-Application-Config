import config from "config";
// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

import log from "./logger.ts";

async function ensureConnectionToMongoDatabase() {
  const dbUri = config.get<string>("mongoDatabaseUri");

  try {
    log.info(dbUri);
    await mongoose.connect(dbUri);
    log.info("Successfully initiated connection to MongoDB");
  } catch (e: unknown) {
    log.error(e);
    log.error("Failed to connect to MongoDB. Exiting now...");
    process.exit(1);
  }

  return true;

  // OLD WAY:
  // const client = new MongoClient(dbUri);
  // try {
  //     log.info(dbUri);
  //     await client.connect();
  //     log.info("Successfully initiated connection to MongoDB");
  // } catch (e) {
  //     log.error("Failed to connect to MongoDB. Exiting now...");
  //     process.exit(1);
  // }

  // return client.db();
}

export { ensureConnectionToMongoDatabase };

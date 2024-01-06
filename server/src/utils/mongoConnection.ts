import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function ensureConnectionToMongoDatabase() {
    const dbUri = config.get<string>("alienMongoDatabaseUri");

    try {
        log.info(dbUri);
        await mongoose.connect(dbUri);
        log.info("Sucessfully initiated connection to MongoDB");
    } catch (e) {
        log.error("Failed to connect to MongoDB. Exiting now...");
        process.exit(1);
    }

    // let client: MongoClient;
    // try {
    //     client = new MongoClient(dbUri);
    //     log.debug("Succesfully initated connnection to MongoDB");
    // } catch (e) {
    //     log.warn("Failed to connect to MongoDB. Exiting now...");
    //     process.exit(1);
    // }

    // return client;
    return true;
}

export { ensureConnectionToMongoDatabase };

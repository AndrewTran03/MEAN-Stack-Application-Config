// import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function ensureConnectionToMongoDatabase() {
    const dbUri = config.get<string>("mongoDatabaseUri");
    mongoose.Promise = global.Promise;
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoose.connect(dbUri);
        log.info("Sucessfully initiated connection to MongoDB");

        mongoose.connection.once("open", () => {
            log.info("MongoDB operation successful");
        });
    } catch (e) {
        log.error("Failed to connect to MongoDB. Exiting now...");
        process.exit(1);
    }

    return true;
}

export { ensureConnectionToMongoDatabase };

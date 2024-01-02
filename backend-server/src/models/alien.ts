import mongoose from "mongoose";
import config from "config";
import { Alien } from "../../assets/types";

const AlienSchema = new mongoose.Schema<Alien>({
    name: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sub: {
        type: Boolean,
        required: true,
        default: false
    }
});

const alienMongoDBName = config.get<string>("alienMongoDatabaseName");
const alienMongoCollectionName = config.get<string>("alienMongoCollectionName");

const AlienModel = mongoose.model(alienMongoDBName, AlienSchema, alienMongoCollectionName);

export { AlienSchema, AlienModel };

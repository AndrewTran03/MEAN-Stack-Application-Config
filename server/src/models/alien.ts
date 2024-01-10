import mongoose from "mongoose";
import config from "config";
import { Alien } from "../../assets/types";

const mongoDBName = config.get<string>("mongoDatabaseName");
const alienMongoCollectionName = config.get<string>("alienMongoCollectionName");

const AlienSchema = new mongoose.Schema<Alien>(
    {
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
    },
    {
        timestamps: {
            createdAt: "created_date",
            updatedAt: "updated_date"
        },
        collection: alienMongoCollectionName
    }
);

const AlienModel = mongoose.model(`${mongoDBName}_Alien`, AlienSchema);

export { AlienModel, alienMongoCollectionName };

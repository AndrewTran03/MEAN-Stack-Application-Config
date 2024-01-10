import mongoose from "mongoose";
import config from "config";
import { Human } from "../../assets/types";

const mongoDBName = config.get<string>("mongoDatabaseName");
const humanMongoCollectionName = config.get<string>("humanMongoCollectionName");

const HumanSchema = new mongoose.Schema<Human>(
    {
        name: {
            type: String,
            required: true
        },
        personality: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        isACitizen: {
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
        collection: humanMongoCollectionName
    }
);

const HumanModel = mongoose.model(`${mongoDBName}_Human`, HumanSchema);

export { HumanModel, humanMongoCollectionName };

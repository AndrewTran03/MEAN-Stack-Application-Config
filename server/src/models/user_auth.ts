import config from "config";
import mongoose from "mongoose";

import { UserAuth } from "../../assets/types";

const mongoDBName = config.get<string>("mongoDatabaseName");
const userAuthMongoCollectionName = config.get<string>("authMongoCollectionName");

const UserAuthSchema = new mongoose.Schema<UserAuth>(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    user_level: {
      type: String,
      required: true,
      default: "REGULAR"
    }
  },
  {
    timestamps: {
      createdAt: "created_date",
      updatedAt: "updated_date"
    },
    collection: userAuthMongoCollectionName
  }
);

const UserAuthModel = mongoose.model<UserAuth>(`${mongoDBName}_UserAuth`, UserAuthSchema);

export { UserAuthModel, userAuthMongoCollectionName };

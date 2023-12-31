require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import log from "./utils/logger";
import router from "./routes";
import { ensureConnectionToMongoDatabase } from "./utils/dbConnection";

// Link: https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));

app.use(router);

const port = config.get<number>("port");

app.listen(port, async () => {
    log.info(`App started on http://localhost:${port}`);
    await ensureConnectionToMongoDatabase();
});

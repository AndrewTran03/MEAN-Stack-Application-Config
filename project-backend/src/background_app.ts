import dotenv from "dotenv";
dotenv.config();

import express, { Response } from "express";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import log from "./utils/logger";
import router from "./routes";
import { ensureConnectionToMongoDatabase } from "./utils/dbConnection";

// Link: https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2eed
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(router);
app.use((_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
});

const port = config.get<number>("port");

app.listen(port, async () => {
    log.info(`App started on http://localhost:${port}`);
    await ensureConnectionToMongoDatabase();
});

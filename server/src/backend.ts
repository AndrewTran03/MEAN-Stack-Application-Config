/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from "dotenv";
import path from "path";

// Checking for a valid 'NODE_ENV' variable configuration
let ENV_FILE_PATH = "";
if (process.env["NODE_ENV"] === "development") {
  ENV_FILE_PATH = ".env.development";
} else if (process.env["NODE_ENV"] === "production" || process.env["NODE_ENV"] === "staging") {
  ENV_FILE_PATH = `../../.env.${process.env["NODE_ENV"]}`;
} else {
  console.error('Invalid configuration for the "NODE_ENV" variable:');
  console.error(process.env["NODE_ENV"]);
  process.exit(1);
}
dotenv.config({
  debug: true,
  encoding: "utf8",
  override: true,
  path: path.resolve(process.cwd(), ENV_FILE_PATH)
});

import "reflect-metadata";

import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import express, { NextFunction } from "express";
import http from "http";
// import { Db } from "mongodb";
import { Server } from "socket.io";
import { DataSource } from "typeorm";

import router from "./routes/index";
import log from "./utils/logger";
// import { ensureConnectionToMongoDatabase } from "./utils/mongodb_connection";
import { shutdownConnection, startConnection } from "./utils/mysql_typeorm_connection";
// import { ensureConnectionToSQLDatabase } from "./utils/sqlite_connection";

// Link: https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2eed
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true }));
app.use(router);
app.use((_, res, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const frontendClientPort = config.get<number>("frontendClientPort");
const frontendClientUrl = config.get<string>("frontendClientUrl");

// Socket.io Setup (Server):
const server = http.createServer(app);
const ioSocket = new Server(server, {
  cors: {
    origin: [frontendClientUrl],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]
  }
});

// Tracks incoming connections to SocketIO server connection
ioSocket.on("connection", (socket) => {
  log.debug(`User sucessfully connected to Socket.io!\nSERVER-SIDE #ID: ${socket.id}`);

  socket.conn.on("close", (reason) => {
    log.debug(`A user disconnected. REASON: ${reason}`);
  });
});

const backendServerPort = config.get<number>("backendServerPort");
log.info(typeof backendServerPort);
log.info(`Backend Server Port: ${backendServerPort}`);
const backendServerUrl = config.get<string>("backendServerUrl");

// let mongoDbRef: Db;
let mysqlConnection: DataSource;
server.listen(backendServerPort, async () => {
  log.debug(`App started on ${backendServerUrl}`);
  // await ensureConnectionToMongoDatabase();
  // await ensureConnectionToMongoDatabase().then((dbRef) => {
  //     console.assert(!dbRef);
  //     mongoDbRef = dbRef;
  // });
  // await ensureConnectionToSQLDatabase();
  mysqlConnection = await startConnection();
});

process.on("SIGINT", () => shutdownConnection(mysqlConnection));
process.on("SIGTERM", () => shutdownConnection(mysqlConnection));

// export { mongoDbRef };
export { mysqlConnection };

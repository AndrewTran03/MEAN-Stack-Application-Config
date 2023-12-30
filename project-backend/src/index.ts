import express, { Express, Request, Response } from "express";
import { json } from "body-parser";
import { exampleRouter } from "./routes/example";

// Link: https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee
const app = express();
app.use(json);
app.use(exampleRouter);

const server = app.listen(3000, () => {
    console.log("Server is listening on Port 3000");
});
server.close();

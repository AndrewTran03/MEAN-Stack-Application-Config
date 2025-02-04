import express from "express";

// import { mysqlConnection } from "../backend";
// import { User } from "../entities/user";
// import log from "../utils/logger";

const router = express.Router();

router.get("/api/user", (_, res) => {
  // const USER_DB = mysqlConnection.getRepository(User);
  // const users = await USER_DB.find();
  // log.info("Users: ", users);

  return res.status(200).json({ message: "GET request to /api/user" });
});

export { router as UserRouter };

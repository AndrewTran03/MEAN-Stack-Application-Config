import express from "express";
import { UserAuthModel, userAuthMongoCollectionName } from "../models/user_auth";
import log from "../utils/logger";
import { UserAuth } from "../../assets/types";
import bcrypt from "bcrypt";

const router = express.Router();

let index = 0;
router.get("/api/user", async (_, res) => {
  try {
    const currItems = await UserAuthModel.find();

    currItems.forEach((item, idx) => {
      log.info(`Item ${idx}`);
      log.info(JSON.stringify(item, null, 2));
    });

    log.info(`END OF GET REQUEST #${index} ------------------------`);
    index++;
    return res.status(200).json(currItems);
  } catch (err: any) {
    log.error("Did not find any users! Please try again!");
    // TODO: Update with better error-handling logic
    return res.status(400).send({ Error_GET: err.message });
  }
});

router.post("/api/register", async (req, res) => {
  const unhashedUserPassword = req.body.password;
  const numRoundsGenSalt = 10;
  const hashedUserPassword = bcrypt.hashSync(unhashedUserPassword, numRoundsGenSalt);

  const newUserToInsert = new UserAuthModel({
    username: req.body.username,
    password: hashedUserPassword,
    user_level: req.body.user_level
  });

  try {
    const userInsertResult = await newUserToInsert.save();
    log.info("Inserted user successfully! Congratulations!");
    return res.status(201).json(userInsertResult); // 201 = Successful Resource Creation
  } catch (err: any) {
    log.error({ Error_POST: err });
    // TODO: Update with better error-handling logic
    log.error("Could not insert the specified user! Please try again!");
    return res.status(400).send({ Error_POST: err.message });
  }
});

router.post("/api/login", async (req, res) => {
  const userEnteredUsername = req.body.userName;
  const userEnteredPassword = req.body.password;

  try {
    await UserAuthModel.findOne<UserAuth>({ username: userEnteredUsername }).then((matchingUser) => {
      if (!matchingUser) {
        log.error("There exists no user with that username altogether!");
        return res.status(401).send({ Error_POST: "Invalid username" });
      }

      const validUserResult = bcrypt.compareSync(userEnteredPassword, matchingUser.password);
      if (validUserResult) {
        log.info("Found a valid user with the specified username & password combination!");
        return res.send(200).send(matchingUser);
      } else {
        log.error("There exists no user with that username & password combination!");
        return res.status(401).send({ Error_POST: "Invalid password" });
      }
    });
  } catch (err: any) {
    log.error({ Error_POST: err });
    // TODO: Update with better error-handling logic
    log.error("Could not find the specified user! Please try again!");
    return res.status(400).send({ Error_POST: err.message });
  }
});

export { router as userRouter };

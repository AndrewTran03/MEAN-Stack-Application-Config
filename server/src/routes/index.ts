import express from "express";

import { alienRouter } from "./alien.ts";
import { userRouter } from "./authentication.ts";
import { exampleRouter } from "./example.ts";
import { humanRouter } from "./human.ts";
import { UserRouter } from "./user.ts";

const router = express.Router();

router.use(exampleRouter);
router.use(alienRouter);
router.use(userRouter);
router.use(humanRouter);
router.use(UserRouter);

export default router;

import express from "express";
import { exampleRouter } from "./example";
import { alienRouter } from "./alien";
import { userRouter } from "./authentication";
import { humanRouter } from "./human";

const router = express.Router();

router.use(exampleRouter);
router.use(alienRouter);
router.use(userRouter);
router.use(humanRouter);

export default router;

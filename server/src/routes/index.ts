import express from "express";
import { exampleRouter } from "./example";
import { alienRouter } from "./alien";
import { userRouter } from "./authentication";

const router = express.Router();

router.use(exampleRouter);
router.use(alienRouter);
router.use(userRouter);

export default router;

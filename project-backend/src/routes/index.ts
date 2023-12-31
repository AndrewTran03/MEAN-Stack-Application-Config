import express from "express";
import { exampleRouter } from "./example";
import { alienRouter } from "./alien";

const router = express.Router();

router.use(exampleRouter);
router.use(alienRouter);

export default router;

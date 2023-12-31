import express, { Request, Response } from "express";
import { AlienModel, AlienSchema } from "../models/alien";
import log from "../utils/logger";

const router = express.Router();

router.get("/api/alien", async (req: Request, res: Response) => {
    await AlienModel.find()
        .then((items) => {
            items.forEach((item, index) => {
                log.info(`Item ${index}`);
                log.info(item);
            });
            log.info("Successfully found at least one alien!");
            return res.status(200).json(items);
        })
        .catch((err) => {
            log.error("Did not find any aliens! Please try again!");
            return res.status(400).send({ "Error-GET": err });
        });
});

router.post("/api/alien", async (req: Request, res: Response) => {
    const alienToInsert = new AlienModel({
        name: req.body.name,
        tech: req.body.tech,
        age: req.body.age,
        sub: req.body.sub
    });

    try {
        const alienResult = await alienToInsert.save();
        log.info("Added alien successfully! Congratulations!");
        return res.status(200).json(alienResult);
    } catch (err) {
        log.error({ "Error-POST": err });
        log.error("Could not add alien! Please try again!");
        return res.status(400).send({ "Error-POST": err });
    }
});

export { router as alienRouter };

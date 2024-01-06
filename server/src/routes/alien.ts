import express from "express";
import { AlienModel } from "../models/alien";
import log from "../utils/logger";
import { Alien } from "../../assets/types";

const router = express.Router();

// Reference (HTTP Methods): https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Reference: https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
let index = 0;
router.get("/api/alien", async (_, res) => {
    try {
        const currItems = await AlienModel.find();

        currItems.forEach((item, idx) => {
            log.info(`Item ${idx}`);
            log.info(item);
        });

        log.info(`END OF GET REQUEST #${index} ------------------------`);
        index++;
        return res.status(200).json(currItems);
    } catch (err: any) {
        log.error("Did not find any aliens! Please try again!");
        // TODO: Update with better error-handling logic
        return res.status(400).send({ Error_GET: err.message });
    }
});

router.post("/api/alien", async (req, res) => {
    const alienToInsert = new AlienModel({
        name: req.body.name,
        tech: req.body.tech,
        age: req.body.age,
        sub: req.body.sub
    });

    try {
        const alienInsertResult = await alienToInsert.save();
        log.info("Inserted alien successfully! Congratulations!");
        return res.status(201).json(alienInsertResult); // 201 = Successful Resource Creation
    } catch (err: any) {
        log.error({ Error_POST: err });
        // TODO: Update with better error-handling logic
        log.error("Could not insert the specified alien! Please try again!");
        return res.status(400).send({ Error_POST: err.message });
    }
});

router.put("/api/alien", async (req, res) => {
    const alienToUpdateId = req.body._id;
    const alienToUpdateFields: Alien = {
        name: req.body.name,
        tech: req.body.tech,
        age: req.body.age,
        sub: req.body.sub
    };

    try {
        const alienUpdateResult = await AlienModel.findByIdAndUpdate(alienToUpdateId, alienToUpdateFields, {
            new: true
        });
        log.info("Updated alien successfully! Congratulations!");
        return res.status(200).json(alienUpdateResult);
    } catch (err: any) {
        log.error({ Error_PUT: err });
        // TODO: Update with better error-handling logic
        log.error("Could not update the specified alien! Please try again!");
        return res.status(400).send({ Error_PUT: err.message });
    }
});

router.delete("/api/alien", async (req, res) => {
    const alienToDeleteId = req.body._id;

    try {
        const alienDeleteResult = await AlienModel.findByIdAndDelete(alienToDeleteId);
        log.info("Deleted alien successfully! Congratulations!");
        return res.status(200).json(alienDeleteResult);
    } catch (err: any) {
        log.error({ Error_DELETE: err });
        // TODO: Update with better error-handling logic
        log.error("Could not delete the specified alien! Please try again!");
        return res.status(400).send({ Error_DELETE: err.message });
    }
});

export { router as alienRouter };

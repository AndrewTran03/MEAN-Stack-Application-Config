import express from "express";
import { HumanModel, humanMongoCollectionName } from "../models/human";
import log from "../utils/logger";
import { Human } from "../../assets/types";

const router = express.Router();

let index = 0;
router.get("/api/human", async (_, res) => {
    try {
        const currItems = await HumanModel.find();

        currItems.forEach((item, idx) => {
            log.info(`Item ${idx}`);
            log.info(JSON.stringify(item, null, 2));
        });

        log.info(`END OF GET REQUEST #${index} ------------------------`);
        index++;
        return res.status(200).json(currItems);
    } catch (err: any) {
        log.error("Did not find any humans! Please try again!");
        // TODO: Update with better error-handling logic
        return res.status(400).send({ Error_GET: err.message });
    }
});

router.post("/api/human", async (req, res) => {
    log.info(req.body);
    const humanToInsert = new HumanModel({
        name: req.body.name,
        personality: req.body.personality,
        age: req.body.age,
        isACitizen: req.body.isACitizen
    });

    try {
        const humanInsertResult = await humanToInsert.save();
        log.info("Inserted human successfully! Congratulations!");
        return res.status(201).json(humanInsertResult); // 201 = Successful Resource Creation
    } catch (err: any) {
        log.error({ Error_POST: err });
        // TODO: Update with better error-handling logic
        log.error("Could not insert the specified human! Please try again!");
        return res.status(400).send({ Error_POST: err.message });
    }
});

router.put("/api/human", async (req, res) => {
    const humanToUpdateId = req.body._id;
    const humanToUpdateFields: Human = {
        name: req.body.name,
        personality: req.body.personality,
        age: req.body.age,
        isACitizen: req.body.isACitizen
    };

    try {
        const humanUpdateResult = await HumanModel.findOneAndUpdate<Human>(humanToUpdateId, humanToUpdateFields, {
            new: true
        });
        log.info("Updated human successfully! Congratulations!");
        return res.status(200).json(humanUpdateResult);
    } catch (err: any) {
        log.error({ Error_PUT: err });
        // TODO: Update with better error-handling logic
        log.error("Could not update the specified human! Please try again!");
        return res.status(400).send({ Error_PUT: err.message });
    }
});

router.delete("/api/human", async (req, res) => {
    const humanToDeleteId = req.body._id;

    try {
        const humanDeleteResult = await HumanModel.findByIdAndDelete<Human>(humanToDeleteId);
        log.info("Deleted human successfully! Congratulations!");
        return res.status(200).json(humanDeleteResult);
    } catch (err: any) {
        log.error({ Error_DELETE: err });
        // TODO: Update with better error-handling logic
        log.error("Could not delete the specified human! Please try again!");
        return res.status(400).send({ Error_DELETE: err.message });
    }
});

export { router as humanRouter };

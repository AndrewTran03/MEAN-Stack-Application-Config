import express from "express";
import { AlienModel, alienMongoCollectionName } from "../models/alien";
import log from "../utils/logger";
import { Alien, APIErrorResponse } from "../../assets/types";

const router = express.Router();

// Reference (HTTP Methods): https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// Reference: https://jasonwatmore.com/post/2021/09/21/fetch-http-delete-request-examples
let index = 0;
router.get("/api/alien", async (_, res) => {
    try {
        const currItems = await AlienModel.find();

        currItems.forEach((item, idx) => {
            log.info(`Item ${idx}`);
            log.info(JSON.stringify(item, null, 2));
        });

        log.info(`END OF GET REQUEST #${index} ------------------------`);
        index++;
        return res.status(200).json(currItems);
    } catch (err) {
        log.error("Did not find any aliens! Please try again!");
        const resErrBody: APIErrorResponse = {
            errorLoc: "GET",
            errorMsg: "No items found in MongoDB database"
        };
        return res.status(400).send(JSON.stringify(resErrBody));
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
        const alienInsertResult = alienToInsert.save();
        log.info("Inserted the specified alien successfully! Congratulations!");
        return res.status(201).json(alienInsertResult); // 201 = Successful Resource Creation
    } catch (err) {
        log.error("Could not insert the specified alien! Please try again!");
        const resErrBody: APIErrorResponse = {
            errorLoc: "POST",
            errorMsg: "Failed to insert into the MongoDB database"
        }
        return res.status(400).send(JSON.stringify(resErrBody));
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
        const alienUpdateResult = await AlienModel.findByIdAndUpdate<Alien>(alienToUpdateId, alienToUpdateFields, {
            new: true
        });
        log.info("Updated the specified alien successfully! Congratulations!");
        return res.status(200).json(alienUpdateResult);
    } catch (err) {
        log.error("Could not update the specified alien! Please try again!");
        const resErrBody: APIErrorResponse = {
            errorLoc: "PUT",
            errorMsg: "Failed to update the MongoDB database"
        }
        return res.status(400).send(JSON.stringify(resErrBody));
    }
});

router.delete("/api/alien/:_id", async (req, res) => {
    const alienToDeleteId = req.params._id;

    try {
        const alienDeleteResult = await AlienModel.findByIdAndDelete<Alien>(alienToDeleteId);
        log.info("Deleted the specified alien successfully! Congratulations!");
        return res.status(200).json(alienDeleteResult);
    } catch (err) {
        log.error("Could not delete the specified alien! Please try again!");
        const resErrBody: APIErrorResponse = {
            errorLoc: "DELETE",
            errorMsg: "Failed to delete from the MongoDB database"
        }
        return res.status(400).send(JSON.stringify(resErrBody));
    }
});

export { router as alienRouter };

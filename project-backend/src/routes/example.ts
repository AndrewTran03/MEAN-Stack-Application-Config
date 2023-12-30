import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get("/api/example", (req: Request, res: Response) => {
    return res.status(200).send("Example GET request at /api/example");
});

// router.post("/api/example", (req: Request, res: Response) => {
//     return res.send({ "data": "NEW example created!" });
// });

export { router as exampleRouter };

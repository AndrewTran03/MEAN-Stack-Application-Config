import express from "express";

const router = express.Router();

router.get("/api/example", (req, res) => {
    return res.status(200).send({ data: "Example GET request at /api/example\r\n" });
});

router.post("/api/example", (req, res) => {
    return res.status(201).send({ data: "NEW example created!\r\n" });
});

export { router as exampleRouter };

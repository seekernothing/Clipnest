import { Router } from "express";

const router = Router();

// POST /api/v1/content
router.post("/", (req, res) => {
    res.send("add content");
});

// GET /api/v1/content
router.get("/", (req, res) => {
    res.send("get all content");
});

// DELETE /api/v1/content
router.delete("/", (req, res) => {
    res.send("delete content");
});

export default router;

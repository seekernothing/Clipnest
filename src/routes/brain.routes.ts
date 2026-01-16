import { Router } from "express";

const router = Router();

// POST /api/v1/brain/share
router.post("/share", (req, res) => {
    res.send("share brain");
});

// GET /api/v1/brain/:shareLink
router.get("/:shareLink", (req, res) => {
    res.send("get shared brain");
});

export default router;

import { Router } from "express";

const router = Router();

// POST /api/v1/signup
router.post("/signup", (req, res) => {
    res.send("signup");
});

// POST /api/v1/signin
router.post("/signin", (req, res) => {
    res.send("signin");
});

export default router;

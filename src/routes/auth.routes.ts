import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { validateSignup, validateSignin } from "../utils/validation.js";

const router = Router();

/* ================= SIGNUP ================= */
// POST /api/v1/signup
router.post("/signup", async (req, res) => {
    try {
        // 1️⃣ Zod validation
        validateSignup(req);

        const { username, email, password } = req.body;

        // 2️⃣ Check if user already exists (username OR email)
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }

        // 3️⃣ Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // 4️⃣ Save user
        const user = await User.create({
            username,
            email,
            password: passwordHash,
        });

        // 5️⃣ Create JWT
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" },
        );

        // 6️⃣ Send JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });

        res.status(200).json({ message: "Signup successful" });
    } catch (err: any) {
        res.status(411).json({ message: err.message });
    }
});

/* ================= SIGNIN ================= */
// POST /api/v1/signin
router.post("/signin", async (req, res) => {
    try {
        // 1️⃣ Zod validation
        validateSignin(req);

        const { username, password } = req.body;

        // 2️⃣ Find user by username (password needed)
        const user = await User.findOne({ username }).select("+password");
        if (!user) {
            return res
                .status(403)
                .json({ message: "Invalid login credentials" });
        }

        // 3️⃣ Compare password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res
                .status(403)
                .json({ message: "Invalid login credentials" });
        }

        // 4️⃣ Create JWT
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" },
        );

        // 5️⃣ Send JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });

        res.status(200).json({ message: "Signin successful" });
    } catch (err: any) {
        res.status(411).json({ message: err.message });
    }
});

/* ================= LOGOUT ================= */
// POST /api/v1/logout
router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0), // delete cookie
    })
        .status(200)
        .json({ message: "Logged out" });
});

export default router;

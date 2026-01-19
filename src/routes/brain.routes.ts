import { Router } from "express";
import crypto from "crypto";

import Link from "../models/link.js";
import Content from "../models/content.js";
import User from "../models/user.js";
import { userAuth } from "../middlewares/middleware.js";

const router = Router();

/*
POST /api/v1/brain/share
Body:
{
  "share": true | false
}
*/
router.post("/share", userAuth, async (req, res) => {
    try {
        const { share } = req.body;
        const userId = req.user!._id;

        if (share === true) {
            // Check if link already exists
            const existingLink = await Link.findOne({ userId });

            if (existingLink) {
                return res.status(200).json({
                    link: `/api/v1/brain/${existingLink.hash}`,
                });
            }

            // Create new share link
            const hash = crypto.randomBytes(16).toString("hex");

            await Link.create({
                userId,
                hash,
            });

            return res.status(200).json({
                link: `/api/v1/brain/${hash}`,
            });
        }

        // share === false → remove link
        await Link.deleteOne({ userId });

        return res.status(200).json({
            message: "Sharing disabled",
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
});

/*
GET /api/v1/brain/:shareLink
*/
router.get("/:shareLink", async (req, res) => {
    try {
        const { shareLink } = req.params;

        // 1️⃣ Find link
        const link = await Link.findOne({ hash: shareLink });
        if (!link) {
            return res.status(404).json({
                message: "Invalid or expired share link",
            });
        }

        // 2️⃣ Find user
        const user = await User.findById(link.userId).select("username");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // 3️⃣ Fetch user's content
        const content = await Content.find({
            userId: link.userId,
        })
            .populate("tags", "title")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            username: user.username,
            content,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
});

export default router;

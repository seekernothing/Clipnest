import { Router } from "express";
import Content from "../models/content.js";
import Tag from "../models/tag.js";
import { userAuth } from "../middlewares/middleware.js";

const router = Router();

/*
POST /api/v1/content
*/
router.post("/", userAuth, async (req, res) => {
    try {
        const { title, link, type, tags } = req.body;

        let tagIds: any[] = [];

        if (Array.isArray(tags)) {
            tagIds = await Promise.all(
                tags.map(async (tagTitle: string) => {
                    const tag = await Tag.findOneAndUpdate(
                        { title: tagTitle.toLowerCase() },
                        { title: tagTitle.toLowerCase() },
                        { upsert: true, new: true },
                    );
                    return tag._id;
                }),
            );
        }

        await Content.create({
            title,
            link,
            type,
            tags: tagIds,
            userId: req.user!._id,
        });

        res.status(200).json({ message: "Content added" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/*
GET /api/v1/content
*/
router.get("/", userAuth, async (req, res) => {
    try {
        const content = await Content.find({ userId: req.user!._id })
            .populate("tags", "title")
            .sort({ createdAt: -1 });

        res.status(200).json({ content });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

/*
DELETE /api/v1/content
*/
router.delete("/", userAuth, async (req, res) => {
    try {
        const { contentId } = req.body;

        const deleted = await Content.findOneAndDelete({
            _id: contentId,
            userId: req.user!._id,
        });

        if (!deleted) {
            return res.status(403).json({
                message: "You are not allowed to delete this content",
            });
        }

        res.status(200).json({ message: "Deleted" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;

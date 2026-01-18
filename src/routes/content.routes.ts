import { Router } from "express";
import Content from "../models/content.js";
import { userAuth } from "../middlewares/middleware.js";

const router = Router();


/*
POST /api/v1/content
Body:
{
  title,
  link,
  type,
  tags?: []
}
*/
router.post("/", userAuth, async (req, res) => {
    try {
        const { title, link, type, tags } = req.body;

        await Content.create({
            title,
            link,
            type,
            tags: tags || [],
            userId: req.user!._id,
        });

        res.status(200).json({
            message: "Content added",
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
});


/*
GET /api/v1/content
*/
router.get("/", userAuth, async (req, res) => {
    try {
        const content = await Content.find({
            userId: req.user!._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            content,
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
});


/*
DELETE /api/v1/content
Body:
{
  contentId
}
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

        res.status(200).json({
            message: "Deleted",
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
});

export default router;

import { Router } from "express";

import authRoutes from "./auth.routes.js";
import contentRoutes from "./content.routes.js";
import brainRoutes from "./brain.routes.js";

const router = Router();

router.use("/", authRoutes); // /api/v1/signup, /signin
router.use("/content", contentRoutes); // /api/v1/content
router.use("/brain", brainRoutes); // /api/v1/brain/...

export default router;

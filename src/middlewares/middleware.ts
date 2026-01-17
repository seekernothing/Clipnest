import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

interface JwtPayload {
    _id: string;
}

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // 1️⃣ Read token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login to continue",
            });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as JwtPayload;

        // 3️⃣ Find user
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        // 4️⃣ Attach user to request
        req.user = user;

        next();
    } catch (error: any) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

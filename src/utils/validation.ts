import { z } from "zod";
import { type Request } from "express";

/* ================= SIGNUP ================= */

const signupSchema = z.object({
    username: z
        .string()
        .min(3, "username must be at least 3 characters")
        .max(10, "username must be at most 10 characters"),

    email: z.string().email("Invalid email address"),

    password: z
        .string()
        .min(8, "password must be at least 8 characters")
        .max(20, "password must be at most 20 characters")
        .regex(/[A-Z]/, "password must contain one uppercase letter")
        .regex(/[a-z]/, "password must contain one lowercase letter")
        .regex(/[0-9]/, "password must contain one number")
        .regex(/[^A-Za-z0-9]/, "password must contain one special character"),
});

export const validateSignup = (req: Request) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        throw new Error(errors);
    }

    // clean + validated data only
    req.body = result.data;
};

/* ================= SIGNIN ================= */

const signinSchema = z.object({
    username: z
        .string()
        .min(3, "username must be at least 3 characters")
        .max(10, "username must be at most 10 characters"),

    password: z.string().min(8, "password must be at least 8 characters"),
});

export const validateSignin = (req: Request) => {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        throw new Error(errors);
    }

    req.body = result.data;
};

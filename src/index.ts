import "dotenv/config";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

app.post("/api/v1/signup", (req, res) => {});

app.post("/api/v1/signin", (req, res) => {});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

// strting the server

connectDB()
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is running on the port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Database connection failed due to ${err}`);
    });

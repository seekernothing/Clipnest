import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
    }),
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", routes);

connectDB()
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(console.error);

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import connectDB from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//  SINGLE LINE THAT MATTERS

app.use("/api/v1", routes);

connectDB()
    .then(() => {
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(console.error);

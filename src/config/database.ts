import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(mongoUri);
};

export default connectDB;

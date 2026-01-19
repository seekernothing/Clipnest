import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILink extends Document {
    hash: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const linkSchema = new Schema<ILink>(
    {
        hash: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one share link per user
        },
    },
    {
        timestamps: true,
    },
);

const Link = mongoose.model<ILink>("Link", linkSchema);
export default Link;

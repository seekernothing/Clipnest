import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

const tagSchema = new Schema<ITag>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    },
);

const Tag = mongoose.model<ITag>("Tag", tagSchema);
export default Tag;

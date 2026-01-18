import mongoose, { Schema, Types, Document } from "mongoose";

export type ContentType = "document" | "tweet" | "youtube" | "link";

export interface IContent extends Document {
    title: string;
    link: string;
    type: ContentType;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        link: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["document", "tweet", "youtube", "link"],
            required: true,
        },

        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    },
);

// Fast: fetch latest content of a user
contentSchema.index({ userId: 1, createdAt: -1 });

// Fast: filter by tags
// contentSchema.index({ tags: 1 });//

const Content = mongoose.model<IContent>("Content", contentSchema);
export default Content;

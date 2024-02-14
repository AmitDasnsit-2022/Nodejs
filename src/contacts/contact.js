import mongoose from "mongoose";

const contact = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("contactUs", contact);

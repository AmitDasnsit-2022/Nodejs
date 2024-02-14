import mongoose from "mongoose";

const news = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      default: null,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
      }
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("news", news);

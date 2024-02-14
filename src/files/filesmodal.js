import mongoose from "mongoose";

const filesModel = new mongoose.Schema(
  {
    fileName: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: null,
    },
    fileUrl: {
      type: String,
      default: null,
    },
    createdBy: {
      type: String,
      default: null,
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

export default mongoose.model("filesmodel", filesModel);

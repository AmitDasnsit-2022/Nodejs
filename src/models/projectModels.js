import mongoose from "mongoose";

const projectModels = new mongoose.Schema(
  {
    modelsName: {
      type: String,
      default: null,
      index: true,
    },
    description: {
      type: String,
      default: null,
    },
    iconUrl: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("projectmodels", projectModels);

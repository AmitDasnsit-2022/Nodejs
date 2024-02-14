import mongoose from "mongoose";

const jobs = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    designations: {
      type: mongoose.Types.ObjectId,
      ref: "designations",
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

export default mongoose.model("jobs", jobs);

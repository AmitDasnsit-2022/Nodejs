import mongoose from "mongoose";

const department = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      default: null,
      unique: true,
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
      type: String,
      default: null,
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

export default mongoose.model("departments", department);

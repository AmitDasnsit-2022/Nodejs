import mongoose from "mongoose";

const designations = new mongoose.Schema(
  {
    designationName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
      ref: "departments",
    },
    iconUrl: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement",
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

export default mongoose.model("designations", designations);

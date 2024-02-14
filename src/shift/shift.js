import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    shiftName: {
      type: String,
      required: true,
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement",
    },
    shiftTiming: {
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
    },
    weekend: {
      type: String,
      enum: ["LocationBased", "ShiftBased"],
      default: "LocationBased",
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
      ref: "departments",
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

export default mongoose.model("shift", shiftSchema);

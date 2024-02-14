import mongoose from "mongoose";

const leaveApplied = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "employee",
    },
    leaveTypeId: {
      type: mongoose.Types.ObjectId,
      ref: "leavetype",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    leaveReason: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      default: null,
    },
    approvedBy: {
      type: mongoose.Types.ObjectId,
      ref: "employee",
    },
    isDelete: {
      type: String,
      default: false,
    },
    isActive: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("leaveApplied", leaveApplied);

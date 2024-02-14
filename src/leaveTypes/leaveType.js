import mongoose from "mongoose";

const leaveType = new mongoose.Schema(
  {
    leaveTypeName: {
      type: String,
    },
    description: {
      type: String,
      default: null,
    },
    iconUrl: {
      type: String,
      default: null,
    },
    isPaidLeave: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
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

export default mongoose.model("leavetype", leaveType);

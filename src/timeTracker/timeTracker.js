import mongoose from "mongoose";

const timeTracker = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.String,
      ref: "employee",
    },
    taskName: {
      type: String,
      default: "",
    },
    taskDescription: {
      type: String,
      default: "",
    },
    startTime: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    duration: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["inprogress", "completed", "onhold"],
    },
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

export default mongoose.model('timeTracker',timeTracker);
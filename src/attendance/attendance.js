import mongoose from "mongoose";

const attendance = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement",
      required: true,
    },
    attendanceDate: {
      type: Date,
      default: new Date(),
    },
    punchings: [
      {
        punchIn: { type: Date, default: null },
        punchOut: { type: Date, default: null },
      },
    ],
    hoursWorked: {
      type: Number,
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    isLate: {
      type: Boolean,
      default: false,
    },
    lateReason: {
      type: String,
      default: "",
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

export default mongoose.model("attendance", attendance);

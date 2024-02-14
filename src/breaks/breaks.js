import mongoose from "mongoose";

const breaks = new mongoose.Schema(
  {
    breakName: {
      type: String,
      default: null,
    },
    fileName: {
      type: String,
      default: null,
    },
    isPaid: {
      type: Boolean,
      default: null,
    },
    breakMode: {
      type: String,
      enum: ["automatic", "manual"],
      default: "automatic",
    },
    startTime: {
      type: Date,
      default: new Date(),
    },
    endTime: {
      type: Date,
      default: new Date(),
    },
    shiftId: {
      type: mongoose.Types.ObjectId,
      ref: "shift",
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

export default mongoose.model("breaks", breaks);

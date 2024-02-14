import mongoose, { Schema } from "mongoose";

const payments = new mongoose.Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "employee",
    },
    amount: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "failed"],
    },
    paymentDate: {
      type: Date,
      default: new Date(),
    },
    paymentMethod: {
      type: String,
      enum: ["bank transfer", "check", "cash", "other"],
    },
    referenceNumber: {
      type: Number,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
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

export default mongoose.model("payments", payments);

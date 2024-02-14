import mongoose from "mongoose";

const notifications = new mongoose.Schema(
  {
    notificationType: {
      type: String,
      enum: ["announcement", "reminder", "task", "other"],
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    recipientId: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement",
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    readAt: {
      type: Date,
      default: new Date(),
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

export default mongoose.model("notifications", notifications);

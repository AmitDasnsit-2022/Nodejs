import mongoose from "mongoose";

const permission = new mongoose.Schema(
  {
    permissionName: {
      type: String,
      enum: ["create", "read", "edit", "delete"],
      default: "read",
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

export default mongoose.model("permission", permission);

import mongoose from "mongoose";

const roles = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
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

export default mongoose.model("roles", roles);

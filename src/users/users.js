import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    companyName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    mobile: {
      type: String,
      default: null,
    },
    roleId: {
      type: String,
      default: "ceo",
    },
    otp: {
      type: String,
    },
    otpExpireTime: {
      type: Date,
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

export default mongoose.model("users", users);

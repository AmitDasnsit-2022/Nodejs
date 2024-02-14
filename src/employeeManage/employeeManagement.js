import mongoose from "mongoose";

const employeemanagement = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "employeemanagement" || "users",
    },
    dateofJoining: {
      type: Date,
      default: null,
    },
    roleId: {
      type: mongoose.Types.ObjectId,
      ref: "roles",
    },
    departmentId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "departments",
      },
    ],
    designation: {
      type: mongoose.Types.ObjectId,
      ref: "designations",
    },
    employmentType: {
      type: String,
      enum: [
        "full_time",
        "part_time",
        "apprenticeship",
        "internship",
        "contract",
      ],
      default: null,
    },
    employeeStatus: {
      type: String,
      enum: ["active", "terminated", "probation", "resigned", "notice_period"],
      default: null,
    },
    shiftId: {
      type: mongoose.Types.ObjectId,
      ref: "shift",
    },
    username: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
    officeEmail: {
      type: String,
      default: null,
    },
    repoterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employeemanagement",
    },
    sourceofHire: {
      type: String,
      default: null,
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

export default mongoose.model("employeemanagement", employeemanagement);

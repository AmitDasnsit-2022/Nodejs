import mongoose from "mongoose";

const salary = new mongoose.Schema(
  {
    basicSalary: {
      type: String,
      default: null,
    },
    netSalary: {
      type: String,
      default: null,
    },
    month: {
      type: Date,
      default: new Date(),
    },
    description: {
      type: String,
      default: null,
    },
    Attachments: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: String,
      default: null,
    },
    isDelete: {
      type: String,
      default: null,
    },
    isActive: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("salary", salary);

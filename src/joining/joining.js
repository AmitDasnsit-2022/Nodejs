import mongoose from "mongoose";

const joiningStatusENUM = ["pending", "completed", "rejected", "joined"];

const joiningSchema = new mongoose.Schema({
  joiningStatus: {
    type: String,
    enum: joiningStatusENUM,
    default: "pending",
  },

  offerLetter: {
    type: String,
  },

  remarks: {
    type: String,
  },

  interviewId: {
    type: mongoose.Schema.ObjectId,
    ref: "interview",
  },

  joiningDate: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
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
});

export default mongoose.model("joining", joiningSchema);

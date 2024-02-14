import mongoose from "mongoose";

const chats = new mongoose.Schema(
  {
    livestreamId: {
      type: mongoose.Types.ObjectId,
      ref: "liveStream",
      required: true,
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "studentsModule",
    },
    coursefieldId: {
      type: mongoose.Types.ObjectId,
      ref: "courseFields",
      required: true,
    },
    subjectId: {
      type: mongoose.Types.ObjectId,
      ref: "subjects",
      required: true,
    },
    teacherId: {
      type: mongoose.Types.ObjectId,
      ref: "teachers",
    },
    message: {
      type: String,
      required: true,
    },
    fileurl: {
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

export default mongoose.model("chats", chats);

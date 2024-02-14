import mongoose from "mongoose";

const rooms = new mongoose.Schema(
  {
    livestreamId: {
      type: mongoose.Types.ObjectId,
      ref: "liveStream",
      required: true,
    },
    coursefieldId: {
      type: mongoose.Types.ObjectId,
      ref: "courseFields",
      required: true,
    },
    roomId: {
      type: String,
      required: true,
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

export default mongoose.model("rooms", rooms);

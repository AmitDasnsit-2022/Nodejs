import mongoose, { Schema } from "mongoose";

const order = new mongoose.Schema(
  {
    planDurationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'planduration',
        required: true,
      },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'plans',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'studentsModule',
      required: true,
    },
    orderId:{
        type:String,
        default:null,
    },
    entity: {
        type: String,
        default: null,
      },
    amount: {
        type: Number,
        default: 0
      },
    amount_due: {
        type: Number,
        default: 0
      },
    amount_paid: {
        type: Number ,
        default: 0
      },
    currency: {
        type: String ,
        default: null,
      },
    receipt: {
        type: String ,
        default: null,
      },
    offer_id: {
        type: Number,
        default: 0
      },
    status: {
        type:String ,
        default :null,
      },
    attempts: {
        type: String ,
        default: null,
      },
    created_at: {
        type: String ,
        default: null,
      },
    courseFieldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseFields",
      required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
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

export default mongoose.model("order",order );

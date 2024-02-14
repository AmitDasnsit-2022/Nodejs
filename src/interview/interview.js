import mongoose from "mongoose";

const interview = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      default: "No Name",
    },
    email: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    preferredLocation: {
      type: String,
    },
    applyingFor: {
      type: String,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
    },

    resume: {
      type: String,
    },

    interviewStatus: {
      type: String,
      enum: ["pending", "cancel", "ongoing", "rescheduled", "completed"],
    },

    roundInfo: [
      {
        roundNumber: {
          type: Number,
          default: null,
        },
        roundStatus: {
          type: String,
          enum: ["pending", "cancel", "ongoing", "rescheduled", "completed"],
        },
        interviewerId: [
          {
            type: mongoose.Types.ObjectId,
            ref: "employeemanagement",
          },
        ],
        scheduledTime: {
          type: Date,
          default: null,
        },
        interviewType: {
          type: String,
        },
      },
    ],
    totalRounds: {
      type: Number,
      default: null,
    },

    employeeRatings: {
      type: Number,
      default: null,
    },
    linkedinUrl: {
      type: String,
    },
    portfolioUrl: {
      type: String,
    },
    otherUrls: {
      type: [String],
    },
    currentCTC: {
      type: String,
    },
    expectedCTC: {
      type: String,
    },
    inHandSalary: {
      typer: String,
    },
    expectedCtcNegotiable: {
      type: Boolean,
      default: true,
    },
    noticePeriod: {
      type: String,
    },
    noticeNegotiable: {
      type: Boolean,
    },
    highestQualification: { type: String },
    currentlyWorking: {
      type: Boolean,
    },

    curentCompany: {
      type: String,
    },
    totalExperience: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"employeemanagement"
    }
  },
  { timestamps: true }
);

export default mongoose.model("interview", interview);

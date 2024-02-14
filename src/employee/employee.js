import mongoose from "mongoose";

const employeeInfo = new mongoose.Schema(
  {
    employeeManageId: {
      type: mongoose.Schema.ObjectId,
      ref: "employeemanagement",
    },
    email: {
      type: String,
      default: null,
    },
    mobile: {
      type: Number,
      required: true,
    },
    profile_img: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    fcmToken: {
      type: String,
      default: null,
    },
    bankDetails: {
      bankName: {
        type: String,
        default: null,
      },
      branchName: {
        type: String,
        default: null,
      },
      accountType: {
        type: String,
        default: null,
      },
      accountNumber: {
        type: String,
        default: null,
      },
      ifscCode: {
        type: String,
        default: null,
      },
    },
    empAddInfo: {
      UAN_Number: {
        type: String,
        default: null,
      },
      dob: {
        type: String,
        default: null,
      },
      maritalStatus: {
        type: String,
        enum: ["single", "married"],
        default: null,
      },
      alternateNumber: {
        type: Number,
        required: true,
      },
      aadharNumber: {
        type: String,
        default: null,
      },
      panNumber: {
        type: String,
        default: null,
      },
      presentAddress: {
        address1: {
          type: String,
          default: "",
        },
        address2: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        state: {
          type: String,
          default: "",
        },
        code: {
          type: String,
          default: "",
        },
        country: {
          type: String,
          default: "",
        },
      },
      permanentAddress: {
        address1: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        state: {
          type: String,
          default: "",
        },
        code: {
          type: String,
          default: "",
        },
        country: {
          type: String,
          default: "",
        },
      },
    },
    empEducation: [
      {
        instituteName: {
          type: String,
          default: null,
        },
        degreeOrDiploma: {
          type: String,
          default: null,
        },
        specialization: {
          type: String,
          default: "",
        },
        startCourseDate: {
          type: Date,
          default: null,
        },
        dateOfCompletion: {
          type: Date,
          default: null,
        },
      },
    ],
    empProfDetails: {
      experience: [
        {
          companyName: {
            type: String,
            default: "",
          },
          jobTitle: {
            type: String,
            default: "",
          },
          fromDate: {
            type: Date,
            default: null,
          },
          toDate: {
            type: Date,
            default: null,
          },
          jobDescription: {
            type: String,
            default: null,
          },
          location: {
            type: String,
            default: null,
          },
          currentlyWorking: {
            type: Boolean,
            default: null,
          },
        },
      ],
      skillSet: {
        type: String,
        default: "",
      },
      highestQualification: {
        type: String,
        default: null,
      },
      noticePeriod: {
        type: String,
        default: null,
      },
      currentSalary: {
        type: Number,
        default: null,
      },
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
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
  },
  { timestamps: true }
);

export default mongoose.model("employeeinfo", employeeInfo);

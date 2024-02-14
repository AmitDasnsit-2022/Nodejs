import mongoose from "mongoose";

const assignservices = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users" || "employeeinfo",
    },
    models: [
      {
        modelId: {
          type: String,
        },
        permissions: [
          {
            type: String,
            enum: ["create", "read", "edit", "delete"],
            default: null,
          },
        ],
        access: {
          type: String,
          enum: ["self", "reporteesData", "reportessPlussSelf", "allData"],
          default: null,
        },
      },
    ],
    roleId: {
      type: mongoose.Schema.ObjectId,
      ref: "roles",
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

export default mongoose.model("assignservices", assignservices);

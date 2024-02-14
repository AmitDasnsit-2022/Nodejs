import mongoose from "mongoose";

const taskEnum = ["pending", "ongoing", "completed"];
const taskPriorityEnum = ["low", "medium", "high"];
const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
  },
  taskStatus: {
    type: String,
    enum: taskEnum,
    default: "pending",
  },
  taskPriority: {
    type: String,
    enum: taskPriorityEnum,
    validate: {
      validator: function (value) {
        return taskPriorityEnum.includes(value);
      },
      message: "Invalid task priority",
    },
  },
  deadline: {
    type: Date,
  },
  assignedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "employeemanagement",
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "employeemanagement",
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  approvalStatus: {
    type: String,
    enum: taskEnum,
    default: "pending",
  },
  departmentId: {
  type: mongoose.Schema.ObjectId,
  ref: "departments",
  },
  taskStartTime: {
    type: Date,
  },
  taskEndingTime: {
    type: Date,
  },
  taskAssignedAt: {
    type: Date,
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "projects",
  },
});

export const taskModel = mongoose.model("task", taskSchema);

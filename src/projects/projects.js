/*
  File: projects.js
  Author: Mansab Mir
  Description: Projects Schema file. 
  
*/

import mongoose from "mongoose";

const projectStatusEnum = ["pending", "inProgress", "completed"];
const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teamLeader: {
    type: mongoose.Schema.ObjectId,
    ref: "employeemanagement",
  },
  teamMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "employeemanagement",
    },
  ],
  departmentId: {
    type: mongoose.Schema.ObjectId,
    ref: "departments",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },

  deadline: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "employeemanagement",
  },

  projectStatus: {
    type: String,
    enum: projectStatusEnum,
    default: "pending",
  },
});

export const projectModel = mongoose.model("projects", projectSchema);

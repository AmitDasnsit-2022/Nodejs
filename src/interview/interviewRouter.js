import express from "express";
import { roles } from "../../middlewares/auth.js";
import { interviewController } from "./interviewController.js";

export const interviewRouter = express();

interviewRouter.post("/create", interviewController.createInterview);
interviewRouter.post("/getall", interviewController.getAlInterviews);
interviewRouter.post("/getbyid", interviewController.getInterviewById);
interviewRouter.post("/update", interviewController.updateInterview);
interviewRouter.post("/delete", interviewController.deleteInterview);
interviewRouter.post(
  "/getByUserId",
  roles("read", "interview"),
  interviewController.assignedInterviews
);

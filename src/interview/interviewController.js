import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import { interviewService } from "./interviewService.js";

export const interviewController = {
  createInterview: AsyncHandler(async (req, res, next) => {
    const payload = { body: req.body, user: req.user };
    const savedInterview = await interviewService.createInterview(payload);

    return successResponse({
      req,
      res,
      data: savedInterview,
      code: 200,
      msg: "Interview Created",
    });
  }),

  getAlInterviews: AsyncHandler(async (req, res, next) => {
    const allInterviews = await interviewService.getAllInterviews(req.body);

    return successResponse({
      req,
      res,
      data: allInterviews.documents,
      code: 200,
      msg: "All Interviews",
      count: allInterviews.totalCount,
    });
  }),
  getInterviewById: AsyncHandler(async (req, res, next) => {
    const interviewByID = await interviewService.getInterviewById(req.body);

    return successResponse({
      req,
      res,
      data: interviewByID,
      code: 200,
      msg: "All Interviews",
    });
  }),
  updateInterview: AsyncHandler(async (req, res, next) => { 
    const  payload  = { user: req.user, data: req.body}
    const updatedInterview = await interviewService.updateInterview(payload);

    return successResponse({
      req,
      res,
      data: updatedInterview,
      code: 200,
      msg: "All Interviews",
    });
  }),
  deleteInterview: AsyncHandler(async (req, res, next) => {
    const deletedInterview = await interviewService.deleteInterview(req.body);

    return successResponse({
      req,
      res,
      data: deletedInterview,
      code: 200,
      msg: "All Interviews",
    });
  }),

  assignedInterviews: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const interviewData = await interviewService.getAssignedInterviews(payload);

    return successResponse({
      req,
      res,
      data: interviewData.assignedInterviews,
      code: 200,
      msg: "Assigned Interviews",
      count: interviewData.count,
    });
  }),
};

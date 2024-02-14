import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { jobsService } from "./jobsService.js";

export const jobsController = {
  create: AsyncHandler(async (req, res, next) => {
    const { jobName, description, designations } = req.body;
    const payload = { jobName, description, designations };
    const data = await jobsService.createJobs(payload, req.user);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Job created successfully",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await jobsService.getAllJobs();
    return successResponse({ req, res, data, code: 200 });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { jobId } = req.body;
    const data = await jobsService.getJobsById(jobId);
    return successResponse({ req, res, data, code: 200 });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const { jobId, jobName, description, designations } = req.body;
    const payload = { jobId, jobName, description, designations };
    const data = await jobsService.updateJobs(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Job updated successfully",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const { jobId } = req.body;
    const data = await jobsService.deleteJobs(jobId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Job deleted successfully",
    });
  }),
};

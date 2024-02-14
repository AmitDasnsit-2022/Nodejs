import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { joiningService } from "./joiningService.js";

export const joiningController = {
  createJoining: AsyncHandler(async (req, res, next) => {
    const savedJoining = await joiningService.createJoining(req.body);

    return successResponse({
      req,
      res,
      data: savedJoining,
      code: 200,
      msg: "Joining Created Successfully",
    });
  }),
  getAllJoining: AsyncHandler(async (req, res, next) => {
    const allJoining = await joiningService.getAllJoinings(req.body);

    return successResponse({
      req,
      res,
      data: allJoining.documents,
      code: 200,
      msg: "All Joinings",
      count: allJoining.totalCount,
    });
  }),
  getJoiningById: AsyncHandler(async (req, res, next) => {
    const joiningByID = await joiningService.getJoiningById(req.body);

    return successResponse({
      req,
      res,
      data: joiningByID,
      code: 200,
      msg: "Joining By Id",
    });
  }),
  updateJoining: AsyncHandler(async (req, res, next) => {
    const updatedJoining = await joiningService.updateJoining(req.body);

    return successResponse({
      req,
      res,
      data: updatedJoining,
      code: 200,
      msg: "Joining Updated",
    });
  }),
  deleteJoining: AsyncHandler(async (req, res, next) => {
    const deletedjoining = await joiningService.deleteJoining(req.body);

    return successResponse({
      req,
      res,
      data: deletedjoining,
      code: 200,
      msg: "Joining Deleted Successfully",
    });
  }),

  getByUserId: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const joiningDocuments = await joiningService.getByUserId(payload);

    return successResponse({
      req,
      res,
      data: joiningDocuments.documents,
      code: 200,
      msg: "All Joining data by userid",
      count: joiningDocuments.count,
    });
  }),
};

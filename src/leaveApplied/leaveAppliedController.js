import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { leaveAppliedService } from "./leaveAppliedService.js";

export const leaveAppliedController = {
  create: AsyncHandler(async (req, res, next) => {
    const { employeeId, leaveTypeId, startDate, endDate, leaveReason, notes } =
      req.body;
    const payload = {
      employeeId,
      leaveTypeId,
      startDate,
      endDate,
      leaveReason,
      notes,
    };
    const data = await leaveAppliedService.createLeaveApplied(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "leaveApplied Created successfully",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await leaveAppliedService.getallLeaveApplied();
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { leaveAppliedId } = req.body;
    const data = await leaveAppliedService.getleaveAppliedById(leaveAppliedId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const {
      leaveAppliedId,
      employeeId,
      leaveType,
      startDate,
      endDate,
      leaveReason,
    } = req.body;
    const payload = {
      leaveAppliedId,
      employeeId,
      leaveType,
      startDate,
      endDate,
      leaveReason,
    };
    const data = await leaveAppliedService.updateleaveApplied(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "leaveApplied Updated",
    });
  }),
  updateStatus: AsyncHandler(async (req, res, next) => {
    const { leaveAppliedId, status, notes } = req.body;
    const payload = { leaveAppliedId, status, notes };
    const data = await leaveAppliedService.updateleaveApplied(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Role Updated",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const { leaveAppliedId } = req.body;
    const data = await leaveAppliedService.deleteLeaveApplied(leaveAppliedId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "leaveApplied Deleted successfully",
    });
  }),
};

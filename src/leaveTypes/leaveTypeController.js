import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { leaveTypeService } from "./leaveTypeService.js";

export const leaveTypeController = {
  create: AsyncHandler(async (req, res, next) => {
    const { leaveTypeName, description, isPaidLeave } = req.body;
    const payload = { leaveTypeName, description, isPaidLeave };
    const data = await leaveTypeService.createLeaveType(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Created successfully",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await leaveTypeService.getallLeaveType();
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { leaveTypeId } = req.body;
    const data = await leaveTypeService.getleaveById(leaveTypeId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const { leaveTypeId, leaveTypeName, description, isPaidLeave, isActive } =
      req.body;
    const payload = {
      leaveTypeId,
      leaveTypeName,
      description,
      isPaidLeave,
      isActive,
    };
    const data = await leaveTypeService.updateleaveType(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Role Updated",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const { leaveTypeId } = req.body;
    const data = await leaveTypeService.deleteLeaveType(leaveTypeId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Leave Deleted successfully",
    });
  }),
};

import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import * as services from "./shiftService.js";

export const createShift = AsyncHandler(async (req, res, next) => {
  const payload = {
    shiftName: req.body.shiftName,
    shiftTiming: req.body.shiftTiming,
    shiftTiming: {
      from: req.body.from,
      to: req.body.to,
    },
    weekend: req.body.weekend,
    departmentId: req.body.departmentId,
    createdby: req.user.userId,
  };
  const data = await services.create(payload);
  if (data)
    return successResponse({ req, res, data, msg: "Data inserted", code: 200 });
});

export const updateShift = AsyncHandler(async (req, res, next) => {
  const data = await services.updateData(req.body);
  if (data)
    return successResponse({ req, res, data, msg: "Data updated", code: 200 });
});

export const getAllShift = AsyncHandler(async (req, res, next) => {
  const data = await services.getAll(req.body);
  if (data) return successResponse({ req, res, data });
});

export const deleteShift = AsyncHandler(async (req, res, next) => {
  const data = await services.deletedata(req.body);
  if (data)
    return successResponse({ req, res, msg: "Date deleted", code: 200 });
});

export const getbydepartment = AsyncHandler(async (req, res, next) => {
  const data = await services.getByDepartment(req.body);
  if (data) return successResponse({ req, res, data, code: 200 });
});

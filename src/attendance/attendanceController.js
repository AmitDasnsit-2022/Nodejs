import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import * as attendanceService from "./attendanceService.js";

export const createData = AsyncHandler(async (req, res, next) => {
  const { punchings } = req.body;
  const { userId } = req.user;
  const employeeId = userId;
  const payload = { punchings, employeeId };
  const data = await attendanceService.createPunchIn(payload);
  return successResponse({ req, res, data, msg: "Data inserted", code: 200 });
});

export const punchOut = AsyncHandler(async (req, res, next) => {
  const { punchings } = req.body;
  const { userId } = req.user;
  const employeeId = userId;
  const payload = { punchings, employeeId };
  const data = await attendanceService.createPunchOut(payload);
  if (data)
    return successResponse({ req, res, data, msg: "Data inserted", code: 200 });
});

export const getall = AsyncHandler(async (req, res, next) => {
  const data = await attendanceService.getall(req.body, req.user);
  if (data) return successResponse({ req, res, data, code: 200 });
});

import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import * as services from "./breaksService.js";

export const createBreak = AsyncHandler(async (req, res, next) => {
  const data = await services.create(req.body);
  if (data)
    return successResponse({ req, res, data, msg: "Data inserted", code: 200 });
});
export const updateBreak = AsyncHandler(async (req, res, next) => {
  const data = await services.updateData(req.body);
  if (data)
    return successResponse({ req, res, data, msg: "Data updated", code: 200 });
});
export const getAllBreak = AsyncHandler(async (req, res, next) => {
  const data = await services.getAll(req.body);
  if (data) return successResponse({ req, res, data });
});
export const deleteBreak = AsyncHandler(async (req, res, next) => {
  const data = await services.deletedata(req.body);
  if (data)
    return successResponse({ req, res, data, msg: "Date deleted", code: 200 });
});

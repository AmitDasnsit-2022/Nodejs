import { body } from "express-validator";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import * as assingService from "./assignService.js";

export const insertData = AsyncHandler(async (req, res, next) => {
  const { models, roleId } = req.body;

  // Extracting values from the models array
  const extractedModels = models.map(({ modelId, permissions, access }) => ({
    modelId,
    permissions, // Assuming permissions is an array of strings, modify as needed
    access,
  }));

  // Create a payload with extracted values
  const payload = {
    models: extractedModels,
    roleId,
  };
  const data = await assingService.createData(payload, req.user);
  if (data) {
    return successResponse({ req, res, data, code: 200, msg: "Data created" });
  }
});

export const getAllAssignService = AsyncHandler(async (req, res, next) => {
  const data = await assingService.getAll();
  if (data) {
    return successResponse({ req, res, data, code: 200 });
  }
});

export const updateData = AsyncHandler(async (req, res, next) => {
  const { assignServiceId, models } = req.body;
  const extractedModels = models.map(({ modelId, permissions, access }) => ({
    modelId,
    permissions,
    access,
  }));
  const payload = { assignServiceId, models: extractedModels };
  const data = await assingService.updateAssignedData(payload);
  return successResponse({ req, res, data, code: 200, msg: "Data updated" });
});

export const getByroleId = AsyncHandler(async (req, res, next) => {
  const data = await assingService.getbyUserroleId(req.body, req.user);
  return successResponse({ req, res, data, code: 200 });
});

export const getModelsByRoleId = AsyncHandler(async (req, res, next) => {
  const data = await assingService
    .getbyUserroleId(req.body, req.user)
    .then((res) => res.populate({
      path:"models", 
      populate: [{path:"modelId"}]
    }));

  return successResponse({ req, res, data, code: 200 });
});
export const removeData = AsyncHandler(async (req, res, next) => {
  const { assignServiceId, modelId } = req.body;
  const payload = { assignServiceId, modelId };
  const data = await assingService.removeAssignModel(payload);
  return successResponse({ req, res, data, code: 200, msg: "Data updated" });
});

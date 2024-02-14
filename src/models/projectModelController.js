import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import * as projectService from "./projectModelsService.js";

export const createProjectModel = AsyncHandler(async (req, res, next) => {
  const data = await projectService.createModel(req.body); 



  if (data) {
    return successResponse({ req, res, data, code: 200, msg: "Data created" });
  }
});

export const getAllProjectModal = AsyncHandler(async (req, res, next) => {
  const data = await projectService.getAllProjectModal(req.data);
  if (data) {
    return successResponse({ req, res, data, code: 200 });
  }
});

export const getAllSavedProjectModal = AsyncHandler(async (req, res, next) => {
  const data = await projectService.getAllSavedProjectModal(req.data);
  if (data) {
    return successResponse({ req, res, data, code: 200 });
  }
});

import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { filesService } from "./filesService.js";

export const filesController = {
  create: AsyncHandler(async (req, res, next) => {
    const { fileName, fileType, fileUrl } = req.body;
    const payload = { fileName, fileType, fileUrl };
    const data = await filesService.createFiles(payload, req.user);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Files Created successfully",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await filesService.getallFiles();
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { fileId } = req.body;
    const data = await filesService.getfilesById(fileId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const { fileId, fileName, fileType, fileUrl, isActive } = req.body;
    const payload = { fileId, fileName, fileType, fileUrl, isActive };
    const data = await filesService.updateFiles(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "File updated successfully",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const { fileId } = req.body;
    const data = await filesService.deleteFiles(fileId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "File deleted successfully",
    });
  }),
};

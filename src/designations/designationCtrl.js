import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";

import { designationService } from "./designationService.js";

export const designationCtrl = {
  createDesignation: AsyncHandler(async (req, res, next) => {
    const savedDesignation = await designationService.createDesignation(
      req.body,
      req.user.userId
    );

    return successResponse({
      req,
      res,
      data: savedDesignation,
      code: 200,
      msg: "Designation created Successfully ",
    });
  }),
  getAllDesignation: AsyncHandler(async (req, res, next) => {
    const designationData = await designationService.getAllDesignation(
      req.body
    );

    return successResponse({
      req,
      res,
      data: designationData.documents,
      code: 200,
      msg: "Designation data",
      count: designationData.totalCount,
    });
  }),
  getDesignationById: AsyncHandler(async (req, res, next) => {
    const designationRes = designationService.getDesignationById(req.body);
    return successResponse({
      req,
      res,
      data: designationRes,
      code: 200,
      msg: "Desgination by id",
    });
  }),

  updateDesignation: AsyncHandler(async (req, res, next) => {}),
  getOneDesignation: AsyncHandler(async (req, res, next) => {}),
};

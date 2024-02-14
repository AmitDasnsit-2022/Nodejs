import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import { departmentService } from "./departmentService.js";

export const departmentCtrl = {
  // create department

  createDept: AsyncHandler(async (req, res, next) => {
    const savedData = await departmentService.createDepartment(req.body);

    return successResponse({
      req,
      res,
      data: savedData,
      code: 200,
      msg: "Created Successfully",
    });
  }),

  // Get All Departments
  getAllDept: AsyncHandler(async (req, res, next) => {
    const data = await departmentService.getAllDepartments(req.body);
    return successResponse({
      req,
      res,
      data: data.documents,
      code: 200,
      msg: "Get All Successfully",
      count:data.totalCount
    });
  }),

  getDeptById: AsyncHandler(async (req, res, next) => {
    const department = await departmentService.getDepartmentById(req.body);
    return successResponse({
      req,
      res,
      data: department,
      code: 200,
      msg: "Department By Id",
    });
  }),
  deleteDept: AsyncHandler(async (req, res, next) => {
    const data = await departmentService.deleteDepartment(req.body);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      mssg: "Department deleted successfully ",
    });
  }),
  updateDept: "",
};

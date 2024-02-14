import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import { employeeService } from "./employeeService.js";

export const empCreateController = {
  create: AsyncHandler(async (req, res, next) => {
    const data = await employeeService.createEmployee(req.body, req.user);
    return successResponse({
      req,
      res,
      data: data,
      code: 200,
      msg: "Employee created",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await employeeService.getallEmployee(req.body);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { employeeId } = req.body;
    const data = await employeeService.getempById(employeeId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      mobile,
      profile_img,
      gender,
    } = req.body;
    const payload = {
      employeeId,
      firstName,
      lastName,
      email,
      mobile,
      profile_img,
      gender,
    };
    const data = await employeeService.updateEmployee(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Employee Updated",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const {} = req.body;
    const data = await employeeService.deleteEmployee();
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Employee Deleted successfully",
    });
  }),
};

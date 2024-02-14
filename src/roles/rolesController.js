import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import { roleService } from "./rolesService.js";

export const rolesController = {
  create: AsyncHandler(async (req, res, next) => {
    const { roleName, description } = req.body;
    const payload = { roleName, description };
    const data = await roleService.createRole(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Role Created",
    });
  }),
  getAll: AsyncHandler(async (req, res, next) => {
    const data = await roleService.getAllRoles(req.body);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  getById: AsyncHandler(async (req, res, next) => {
    const { roleId } = req.body;
    const data = await roleService.getRoleById(roleId);
    return successResponse({
      req,
      res,
      data,
      code: 200,
    });
  }),
  update: AsyncHandler(async (req, res, next) => {
    const { roleId, roleName, description, isActive } = req.body;
    const payload = { roleId, roleName, description, isActive };
    const data = await roleService.updateRole(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Role Updated",
    });
  }),
  delete: AsyncHandler(async (req, res, next) => {
    const { roleId } = req.body;
    const payload = { roleId };
    const data = await roleService.deleteRole(payload);
    return successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Role Deleted successfully",
    });
  }),
};

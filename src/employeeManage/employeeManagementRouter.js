import express from "express";
import * as employeeMangeController from "./employeeManagementController.js";
import * as validate from "../../helpers/validates.js";
import * as auths from "../../middlewares/auth.js";
const router = express();

router.post(
  "/create",
  auths.roles("create", "employeemanagement"),
  validate.employeeMangeCreateValidate,
  employeeMangeController.createUserCredentials
);
router.post(
  "/update",
  auths.roles("edit", "employeemanagement"),
  validate.employeeManageIdValidate,
  employeeMangeController.updateManageEmpl
);
router.post(
  "/getall",
  auths.roles("read", "employeemanagement"),
  employeeMangeController.getAll
);
router.post(
  "/getbyid",
  auths.roles("read", "employeemanagement"),
  employeeMangeController.getById
);
router.post(
  "/delete",
  auths.roles("delete", "employeemanagement"),
  employeeMangeController.deleteById
);

router.post(
  "/getemplbydepartment",
  validate.departmentIdValidate,
  auths.roles("read", "employeemanagement"),
  employeeMangeController.getEmpByDepartment
);


export default router;

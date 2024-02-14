import express from "express";
import { departmentCtrl } from "./departmentController.js";
import * as auths from "../../middlewares/auth.js";

export const deptRouter = express();

deptRouter.post(
  "/create",
  auths.roles("create", "departments"),
  departmentCtrl.createDept
);

deptRouter.post(
  "/getAll",
  auths.roles("read", "departments"),
  departmentCtrl.getAllDept
);

deptRouter.post(
  "/delete",
  auths.roles("delete", "departments"),
  departmentCtrl.deleteDept
);

deptRouter.post(
  "/getById",
  auths.roles("read", "departments"),
  departmentCtrl.getDeptById
);

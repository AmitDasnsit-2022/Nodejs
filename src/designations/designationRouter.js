import express from "express";
import { designationCtrl } from "./designationCtrl.js";
import * as auths from "../../middlewares/auth.js";

export const designationRouter = express();

designationRouter.post(
  "/create",
  auths.roles("create", "designations"),
  designationCtrl.createDesignation
);
designationRouter.post(
  "/getById",
  auths.roles("read", "designations"),
  designationCtrl.getDesignationById
);
designationRouter.post("/getAll", designationCtrl.getAllDesignation);

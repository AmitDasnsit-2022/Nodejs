import express from "express";
import { empCreateController } from "./employeeController.js";
import { employeeCreate, validateSchema } from "../../helpers/validates.js";
import * as auths from "../../middlewares/auth.js";
export const empRouter = express();

empRouter.post(
  "/create",
  auths.roles("create", "employeemanagement"),
  validateSchema(employeeCreate),
  empCreateController.create
);
empRouter.post(
  "/getall",
  auths.roles("read", "employeemanagement"),
  empCreateController.getAll
);
empRouter.post(
  "/getbyid",
  auths.roles("read", "employeemanagement"),
  empCreateController.getById
);
empRouter.post(
  "/update",
  auths.roles("read", "employeemanagement"),
  empCreateController.update
);
empRouter.post(
  "/delete",
  auths.roles("delete", "employeemanagement"),
  empCreateController.delete
);

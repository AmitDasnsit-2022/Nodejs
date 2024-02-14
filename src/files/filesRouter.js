import express from "express";
import { filesController } from "./filesController.js";
import * as auths from "./../../middlewares/auth.js";
export const filesRouter = express();

filesRouter.post(
  "/create",
  auths.roles("create", "filesmodel"),
  filesController.create
);
filesRouter.post(
  "/getall",
  auths.roles("read", "filesmodel"),
  filesController.getAll
);
filesRouter.post(
  "/getbyid",
  auths.roles("read", "filesmodel"),
  filesController.getById
);
filesRouter.post(
  "/update",
  auths.roles("edit", "filesmodel"),
  filesController.update
);
filesRouter.post(
  "/delete",
  auths.roles("delete", "filesmodel"),
  filesController.delete
);

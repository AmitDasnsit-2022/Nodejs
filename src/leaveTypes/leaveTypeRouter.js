import { leaveTypeController } from "./leaveTypeController.js";
import express from "express";
import * as auths from "../../middlewares/auth.js";
export const leaveTypeRouter = express();

leaveTypeRouter.post(
  "/create",
  auths.roles("create", "leavetype"),
  leaveTypeController.create
);
leaveTypeRouter.post(
  "/update",
  auths.roles("edit", "leavetype"),
  leaveTypeController.update
);
leaveTypeRouter.post(
  "/delete",
  auths.roles("delete", "leavetype"),
  leaveTypeController.delete
);
leaveTypeRouter.post(
  "/getall",
  auths.roles("read", "leavetype"),
  leaveTypeController.getAll
);
leaveTypeRouter.post(
  "/getbyid",
  auths.roles("read", "leavetype"),
  leaveTypeController.getById
);

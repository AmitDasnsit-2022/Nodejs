import { leaveAppliedController } from "./leaveAppliedController.js";
import express from "express";
import * as auths from "../../middlewares/auth.js";
export const leaveRouter = express();

leaveRouter.post(
  "/create",
  auths.roles("create", "leaveapplied"),
  leaveAppliedController.create
);
leaveRouter.post(
  "/update",
  auths.roles("edit", "leaveapplied"),
  leaveAppliedController.update
);
leaveRouter.post(
  "/updatestatus",
  auths.roles("edit", "leaveapplied"),
  leaveAppliedController.updateStatus
);
leaveRouter.post(
  "/delete",
  auths.roles("delete", "leaveapplied"),
  leaveAppliedController.delete
);
leaveRouter.post(
  "/getall",
  auths.roles("read", "leaveapplied"),
  leaveAppliedController.getAll
);
leaveRouter.post(
  "/getbyid",
  auths.roles("read", "leaveapplied"),
  leaveAppliedController.getById
);

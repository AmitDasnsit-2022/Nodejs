import express from "express";
import * as validation from "../../helpers/validates.js";
import * as auths from "../../middlewares/auth.js";
import * as controller from "./attendanceController.js";
const router = express();

router.post(
  "/punchin",
  auths.roles("create", "attendance"),
  validation.attendancePunchingVaidateion,
  controller.createData
);

router.post(
  "/punchout",
  auths.roles("create", "attendance"),
  validation.attendancePunchingVaidateion,
  controller.punchOut
);

router.post("/getall", auths.roles("read", "attendance"), controller.getall);

export default router;

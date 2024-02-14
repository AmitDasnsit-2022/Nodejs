import express from "express";
import * as controller from "./shiftController.js";
import * as auths from "../../middlewares/auth.js";
import * as validate from "../../helpers/validates.js";
const router = express();

router.post(
  "/create",
  validate.shiftCreateValidate,
  auths.roles("create", "shift"),
  controller.createShift
);
router.post("/getall", auths.roles("read", "shift"), controller.getAllShift);

router.post(
  "/getbydepartment",
  validate.departmentIdsValidate,
  auths.roles("read", "shift"),
  controller.getbydepartment
);
router.post(
  "/update",
  validate.shiftIdValidate,
  auths.roles("edit", "shift"),
  controller.updateShift
);
router.post(
  "/delete",
  validate.shiftIdValidate,
  auths.roles("delete", "shift"),
  controller.deleteShift
);

export default router;

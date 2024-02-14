import express from "express";
import * as controller from "./breaksController.js";
import * as auths from "../../middlewares/auth.js";
import * as validate from "../../helpers/validates.js";
const router = express();

router.post(
  "/create",
  validate.breakCreateValidate,
  auths.roles("create", "breaks"),
  controller.createBreak
);
router.post("/getall", auths.roles("read", "breaks"), controller.getAllBreak);
router.post("/update", auths.roles("edit", "breaks"), controller.updateBreak);
router.post("/delete", auths.roles("delete", "breaks"), controller.deleteBreak);

export default router;

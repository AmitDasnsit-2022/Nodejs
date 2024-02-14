import express from "express";
import * as assingController from "./assignController.js";
import * as validate from "../../helpers/validates.js";
import * as auths from "../../middlewares/auth.js";
const router = express();

router.post(
  "/create",
  auths.roles("create", "assignservices"),
  validate.assingServiceValidate,
  assingController.insertData
);

router.post(
  "/getall",
  auths.roles("read", "assignservices"),
  assingController.getAllAssignService
);

router.post(
  "/update",
  auths.roles("edit", "assignservices"),
  validate.assingSerUpdateValidate,
  assingController.updateData
);

router.post(
  "/getbyroleId",
  auths.roles("read", "assignservices"),
  assingController.getByroleId
);
router.post(
  "/getmodelsbyroleid",

  assingController.getModelsByRoleId
);

router.post(
  "/delete",
  auths.roles("delete", "assignservices"),
  validate.assingSerUpdateValidate,
  assingController.removeData
);

export default router;

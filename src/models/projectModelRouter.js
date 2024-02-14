import express from "express";
import * as projectModalController from "./projectModelController.js";
import * as auths from "../../middlewares/auth.js";
import {
  projectModelCreateSchema,
  validateSchema,
} from "../../helpers/validates.js";
const router = express();

router.post(
  "/create",
  auths.roles("create", "projectmodels"),
  validateSchema(projectModelCreateSchema),
  projectModalController.createProjectModel
);

router.post(
  "/getall",
  auths.roles("read", "projectmodels"),
  projectModalController.getAllProjectModal
);

router.post(
  "/getallsaved",
  auths.roles("read", "projectmodels"),
  projectModalController.getAllSavedProjectModal
);

export default router;

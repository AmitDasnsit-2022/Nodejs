import express from "express";
import { projectController } from "./projectsController.js";
import * as auths from "../../middlewares/auth.js";
export const projectRouter = express();

projectRouter.post(
  "/create",
  auths.roles("create", "projects"),
  projectController.createProject
);
projectRouter.post(
  
  "/getAll",
  auths.roles("read", "projects"),
  projectController.getAllProjects
);
projectRouter.post(
  "/delete",
  auths.roles("delete", "projects"),
  projectController.deleteProject
);
projectRouter.post(
  "/update",
  auths.roles("edit", "projects"),
  projectController.updateProject
);
projectRouter.post(
  "/getbyId",
  auths.roles("read", "projects"),
  projectController.getSingleProject
);
projectRouter.post(
  "/getbyuserid",
  auths.roles("read", "projects"),
  projectController.getAssignedProjects
);

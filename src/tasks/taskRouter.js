import express from "express";
import { taskController } from "./taskController.js";
import * as auths from "../../middlewares/auth.js";
export const taskRouter = express();

taskRouter.post(
  "/create",
  auths.roles("create", "task"),
  taskController.createTask
);
taskRouter.post(
  "/getall",
  auths.roles("read", "task"),
  taskController.getAllTasks
);
taskRouter.post(
  "/getById",
  auths.roles("read", "task"),
  taskController.getTaskByid
);
taskRouter.post(
  "/update",
  auths.roles("edit", "task"),
  taskController.updateTask
);
taskRouter.post(
  "/delete",
  auths.roles("delete", "task"),
  taskController.deleteTask
);
taskRouter.post(
  "/getbyprojectid",
  auths.roles("read", "task"),
  taskController.getByProject
);

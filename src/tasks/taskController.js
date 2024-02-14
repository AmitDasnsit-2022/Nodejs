import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import { taskService } from "./taskService.js";

export const taskController = {
  createTask: AsyncHandler(async (req, res, next) => {
    const savedTask = await taskService.createtask(req.body);
    return successResponse({
      req,
      res,
      data: savedTask,
      code: 200,
      msg: "Task Created Successfully",
    });
  }),

  getAllTasks: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const tasksData = await taskService.getAlltasks(payload);
    return successResponse({
      req,
      res,
      data: tasksData.documents,
      code: 200,
      msg: "Tasks Data",
      count: tasksData.count,
    });
  }),
  getTaskByid: AsyncHandler(async (req, res, next) => {
    const singleTask = await taskService.gettaskById(req.body);
    return successResponse({
      req,
      res,
      data: singleTask,
      code: 200,
      msg: "Task By id",
    });
  }),
  updateTask: AsyncHandler(async (req, res, next) => {
    const updatedTask = await taskService.updatetask(req.body);
    return successResponse({
      req,
      res,
      data: updatedTask,
      code: 200,
      msg: "Task By id",
    });
  }),
  deleteTask: AsyncHandler(async (req, res, next) => {
    const deletedTask = await taskService.deletetask(req.body);
    return successResponse({
      req,
      res,
      data: deletedTask,
      code: 200,
      msg: "Task By id",
    });
  }),

  getByProject: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const taskData = await taskService.getByProjectId(payload);
    return successResponse({
      req,
      res,
      code: 200,
      msg: "Tasks data by user",
      data: taskData.documents,
      count: taskData.count,
    });
  }),
};

/*
  File: projectController.js
  Author: Mansab Mir
  Description: Projects constroller for api entry point. 
  
*/

import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { projectService } from "./projectsService.js";

export const projectController = {
  createProject: AsyncHandler(async (req, res, next) => { 

    const  payload = {data : req.body , user: req.user} 

    const savedProject = await projectService.createProject(payload);

    return successResponse({
      req,
      res,
      data: savedProject,
      code: 200,
      msg: "Project Created Successfully",
    });
  }),
  getAllProjects: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const savedProject = await projectService.getAllProjects(payload);

    return successResponse({
      req,
      res,
      data: savedProject.documents,
      code: 200,
      msg: "All Projects",
      count:savedProject.count



      
    });
  }),
  getSingleProject: AsyncHandler(async (req, res, next) => {
    const savedProject = await projectService.getProjectById(req.body);

    return successResponse({
      req,
      res,
      data: savedProject,
      code: 200,
      msg: "Project Created Successfully",
    });
  }),
  updateProject: AsyncHandler(async (req, res, next) => {
    const savedProject = await projectService.updateProject(req.body);

    return successResponse({
      req,
      res,
      data: savedProject,
      code: 200,
      msg: "Project Updated Successfully",
    });
  }),
  deleteProject: AsyncHandler(async (req, res, next) => {
    const savedProject = await projectService.deleteProject(req.body);

    return successResponse({
      req,
      res,
      data: savedProject,
      code: 200,
      msg: "Project Deleted Successfully",
    });
  }),

  getAssignedProjects: AsyncHandler(async (req, res, next) => {
    const payload = { data: req.body, user: req.user };
    const assignedProjects = await projectService.getAssignedProjects(payload);

    return successResponse({
      req,
      res,
      data: assignedProjects.documents,
      code: 200,
      msg: " Assgigned Projects ",
      count: assignedProjects.count,
    });
  }),
};

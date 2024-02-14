/*
  File: projectService.js
  Author: Mansab Mir
  Description: Projects Service layer to handle business logic of controller layer. 
  
*/
import ModelService from "../../database/ModelService.js";
import { AccessEnum } from "../../middlewares/auth.js";

import { projectModel } from "./projects.js";

const model = new ModelService(projectModel);

const populateOptions = [
  {
    path: "teamLeader",

    select: "username",
  },
  {
    path: "teamMembers",
    select: "username",
  },
  {
    path: "departmentId",
    select: "departmentName",
  },
  {
    path: "createdBy",
  },
];

export const projectService = {
  createProject: async (bodypayload) => {
    const { data, user } = bodypayload;
    const {
      projectTitle,
      description,
      teamLeader,
      teamMembers,
      departmentId,
      deadline,
      projectStatus,
    } = data;
    const payload = {
      projectTitle,
      description,
      teamLeader,
      teamMembers,
      departmentId,
      deadline,
      createdBy: user?.userId,
      projectStatus,
    };
    const savedData = await model
      .createDocument(payload)
      .then((res) => res.populate(populateOptions));

    return savedData;
  },
  getAllProjects: async (data) => {
    const query = { isDelete: false };
    const modifyData = {
      ...data,
      populateOptions,
    };

    const { userId, access, departmentId, reporteesData } = data.user;
    let documents;
    let count;
   if (access === AccessEnum.allData) {
      const modifiedQuery = {
        ...query,
      };

      documents = await model.getAllDocuments(modifiedQuery, modifyData);
      count = await model.getTotalCount(modifiedQuery, modifyData);
    }

    // documents = await model.getAllDocuments(query, modifyData);
    return { documents, count };
  },

  getProjectById: async (data) => {
    const { projectId } = data;
    const payload = { _id: projectId, isDelete: false };
    const documents = await model.findOneDocument(payload).then(res  => res.populate(populateOptions));
    return documents;
  },
  updateProject: async (data) => {
    const payload = {};
    const documents = await model.updateDocument();
    return documents;
  },
  // getOneDocument: async (data) => {
  //   const payload = {};
  //   const documents = await model.findOneDocument();
  //   return documents;
  // },

  deleteProject: async (data) => {
    const { projectId } = data;
    const filter = { _id: projectId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const documents = await model.deleteDocument(filter, update, options);
    return documents;
  },
  getAssignedProjects: async (payload) => {
    const { data, user } = payload;
    const query = { isDelete: false };
    const modifyData = {
      ...data,
      populateOptions,
    };

    const { userId, access } = user;

    let documents;
    let count;
    if (access === AccessEnum.self) {
      const findQuery = {
        ...query,
        $or: [{ teamLeader: userId }, { teamMembers: { $in: userId } }],
      };
      documents = await model.getAllDocuments(findQuery, modifyData);
      count = await model.getTotalCount(findQuery);
    } else if (access === AccessEnum.allData) {
      const findQuery = { isDelete: false };
      documents = await model.getAllDocuments(findQuery, modifyData);
      count = await model.getTotalCount(findQuery);
    } else if (access === AccessEnum.reporteesPlusSelf) {
      const findQuery = {
        $or: [{ teamLeader: userId }, { createdBy: userId }],
      };
      documents = await model.getAllDocuments(findQuery, modifyData);
      count = await model.getTotalCount(findQuery);
    }

    return { documents, count };
  },
};

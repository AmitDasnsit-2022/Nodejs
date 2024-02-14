import ModelService from "../../database/ModelService.js";
import { AccessEnum } from "../../middlewares/auth.js";
import { taskModel } from "./Tasks.js";

const model = new ModelService(taskModel);

const populate = [
  {
    path: "assignedBy assignedTo departmentId projectId",
    select: "username departmentName projectTitle",
  },
];

export const taskService = {
  createtask: async (data) => {
    const {
      taskTitle,
      taskDescription,
      taskStatus,
      taskPriority,
      deadline,
      assignedBy,
      assignedTo,
      isDelete,
      isActive,
      approvalStatus,
      departmentId,
      taskStartTime,
      taskEndingTime,
      taskAssignedAt,
      projectId,
    } = data;
    const payload = {
      taskTitle,
      taskDescription,
      taskStatus,
      taskPriority,
      deadline,
      assignedBy,
      assignedTo,
      isDelete,
      isActive,
      approvalStatus,
      departmentId,
      taskStartTime,
      taskEndingTime,
      taskAssignedAt,
      projectId,
    };
    const savedData = await model.createDocument(payload).then((res) => {
      return res.populate(populate);
    });

    return savedData;
  },
  getAlltasks: async (data) => {
    const { access, userId, departmentId, reporteesData } = data.user;
    console.log(reporteesData);
    const query = {
      isDelete: false,
    };
    let documents;
    let count;

    if (access === AccessEnum.allData) {
      const modifiedQuery = {
        ...query,
      };
      documents = await model.getAllDocuments(modifiedQuery, data);
      count = await model.getTotalCount(modifiedQuery);
    } else if (access === AccessEnum.reporteesPlusSelf) {
      const modifiedQuery = {
        ...query,
        // $or: [
        //   { assignedTo: { $in: reporteesData } },
        //   { assignedBy: { $in: userId } },
        // ],
      };
      count = await model.getTotalCount(modifiedQuery);

      documents = await model.getAllDocuments(modifiedQuery, data);
    }

    return { documents, count };
  },

  gettaskById: async (data) => {
    const { taskId } = data;
    console.log(taskId);
    const payload = { _id: taskId, isDelete: false };
    const documents = await model.findOneDocument(payload);
    return documents;
  },
  updatetask: async (data) => {
    const payload = {};
    const documents = await model.updateDocument();
    return documents;
  },

  /**
   * @description Task get by project id
   */
  getByProjectId: async (payload) => {
    const { data, user } = payload;
    let documents, count;
    const { projectId } = data;
    const { access, userId } = user;
    const populateOptions = [
      {
        path: "projectId",
        populate: [
          { path: "teamLeader", select: "firstName lastName" },
          { path: "departmentId", select: "departmentName" },
        ],
      },
      {
        path: "assignedTo", select: "firstName lastName",
      },
    ];
    let query = { isDelete: false, projectId: projectId };
    if (access === AccessEnum.self) {
      query.assignedTo = user.userId;
      query.approvalStatus = { $in: ["pending", "ongoing"] };
      documents = await model.getAllDocuments(query, { populateOptions });
      count = await model.getTotalCount(query);
    } else if (access === AccessEnum.reporteesPlusSelf) {
      documents = await model.getAllDocuments(query, { populateOptions });
      count = await model.getTotalCount(query);
    } else {
      documents = await model.getAllDocuments(query, { populateOptions });

      count = await model.getTotalCount(query);
    }

    return { documents, count };
  },

  deletetask: async (data) => {
    const { taskId } = data;
    const filter = { _id: taskId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const documents = await model.deleteDocument(filter, update, options);
    return documents;
  },
};

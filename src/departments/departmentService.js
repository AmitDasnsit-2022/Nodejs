import ModelService from "../../database/ModelService.js";
import departments from "./departments.js";

const model = new ModelService(departments);

export const departmentService = {
  createDepartment: async (data) => {
    const { departmentName, description } = data;
    const payload = { departmentName, description };
    const savedData = await model.createDocument(payload);
    return savedData;
  },
  getAllDepartments: async (data) => {
    const query = { isDelete: false };
    const documents = await model.getAllDocuments(query, data);
    const totalCount = await model.getTotalCount({ isDelete: false });
    return { documents, totalCount };
  },

  getDepartmentById: async (data) => {
    const { departmentId } = data;
    const payload = { _id: departmentId, isDelete: false };
    const documents = await model.findOneDocument(payload);
    return documents;
  },
  updateDepartment: async (data) => {
    const payload = {};
    const documents = await model.updateDocument();
    return documents;
  },
  // getOneDocument: async (data) => {
  //   const payload = {};
  //   const documents = await model.findOneDocument();
  //   return documents;
  // },

  deleteDepartment: async (data) => {
    const { departmentId } = data;
    const filter = { _id: departmentId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const documents = await model.deleteDocument(filter, update, options);
    return documents;
  },
};

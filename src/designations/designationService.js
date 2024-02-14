import ModelService from "../../database/ModelService.js";
import designations from "./designations.js";

const model = new ModelService(designations);

export const designationService = {
  createDesignation: async (data, userId) => {
    const { designationName, description, departmentId } = data;
    let iconUrl = "some file url when files will be  uploaded";
    const payload = {
      designationName,
      description,
      departmentId,
      iconUrl,
      createdBy: userId,
    };
    const savedData = await model.createDocument(payload);
    return savedData;
  },
  getAllDesignation: async (data) => {
    const query = { isDelete: false };
    const modifyData = {
      ...data,
      populateOptions: [{ path: "departmentId" }],
    };
    const documents = await model.getAllDocuments(query, modifyData);
    const totalCount = await model.getTotalCount({ isDelete: false });

    return { documents, totalCount };
  },

  getDesignationById: async (data) => {
    const payload = { _id: data };
    const documents = await model.findDocumentById(payload);
    return documents;
  },
  updateDesignation: async (data) => {
    const filter = { _id: data.designationId };
    if (data?.isDelete) {
      delete data["isDelete"];
    }
    const update = { ...data };
    const options = { new: true };

    const documents = await model.updateDocument(filter, update, options);
    return documents;
  },
  getOneDesignation: async (data) => {
    const payload = { _id: data, isDelete: false };

    const documents = await model.findOneDocument(payload);
    return documents;
  },
};

import ModelService from "../../database/ModelService.js";
import files from "./filesmodal.js";
import { NotFound, alreadyExist } from "../../Error/BaseError.js";

const filesModel = new ModelService(files);

export const filesService = {
  createFiles: async (data, userId) => {
    const createdBy = userId;
    data["createdBy"] = createdBy;
    const existData = await filesModel.findOneDocument({
      fileName: data.fileName,
      isDelete: false,
    });
    if (existData) {
      throw new alreadyExist("File already exist");
    }
    const savedData = await filesModel.createDocument(data);
    return savedData;
  },
  getallFiles: async (data) => {
    const query = { isDelete: false };
    const allData = await filesModel.getAllDocuments(query);
    if (!allData.length) {
      throw new NotFound("No files were found");
    }
    return allData;
  },
  getfilesById: async (data) => {
    const payload = { _id: data, isDelete: false };
    const dataById = await filesModel.findOneDocument(payload);
    if (!dataById) {
      throw new NotFound("No file were found");
    }
    return dataById;
  },
  updateFiles: async (data) => {
    const { fileId, fileName, fileType, fileUrl, isActive } = data;
    const filter = { _id: fileId };
    const existFile = await filesModel.findOneDocument(filter);
    if(!existFile) {
      throw new NotFound("No file was found to update");
    }
    const update = { fileName, fileType, fileUrl, isActive };
    const options = { new: true };
    const updateData = await filesModel.updateDocument(filter, update, options);
    return updateData;
  },
  deleteFiles: async (data) => {
    const filter = { _id: data };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await filesModel.deleteDocument(filter, update, options);
    return deleteData;
  },
};

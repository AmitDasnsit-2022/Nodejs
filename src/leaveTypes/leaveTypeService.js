import ModelService from "../../database/ModelService.js";
import leaveModel from "./leaveType.js";
import { alreadyExist, NotFound } from "../../Error/BaseError.js";

const leaveTypeModel = new ModelService(leaveModel);

export const leaveTypeService = {
  createLeaveType: async (data) => {
    const payload = { leaveTypeName: data.leaveTypeName };
    const existData = await leaveTypeModel.findOneDocument(payload);
    if (existData) throw new alreadyExist("Leave type already exists");
    const savedData = await leaveTypeModel.createDocument(data);
    return savedData;
  },
  getallLeaveType: async (data) => {
    const query = { isDelete: false };
    const allData = await leaveTypeModel.getAllDocuments(query);
    if (allData.length == 0) throw new NotFound("Leave type not found");
    return allData;
  },
  getleaveById: async (data) => {
    const payload = { _id: data, isDelete: false };
    const dataById = await leaveTypeModel.findOneDocument(payload);
    if (!dataById) {
      throw new NotFound("No leave were found");
    }
    return dataById;
  },
  updateleaveType: async (data) => {
    const { leaveTypeId, leaveTypeName, description, isPaidLeave, isActive } =
      data;
    const filter = { _id: leaveTypeId };
    const update = { leaveTypeName, description, isPaidLeave, isActive };
    const options = { new: true };
    const updateData = await leaveTypeModel.updateDocument(
      filter,
      update,
      options
    );
    return updateData;
  },
  deleteLeaveType: async (data) => {
    const filter = { _id: data };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await leaveTypeModel.deleteDocument(
      filter,
      update,
      options
    );
    return deleteData;
  },
};

import ModelService from "../../database/ModelService.js";
import leaveApplied from "./leaveApplied.js";
import { alreadyExist, NotFound } from "../../Error/BaseError.js";
const leaveAppliedModel = new ModelService(leaveApplied);

export const leaveAppliedService = {
  createLeaveApplied: async (data) => {
    const savedData = await leaveAppliedModel.createDocument(data);
    return savedData;
  },
  getallLeaveApplied: async (data) => {
    const query = { isDelete: false };
    const allData = await leaveAppliedModel.getAllDocuments(query);
    if (!allData.length) throw new NotFound("No leave application were found");
    return allData;
  },
  getleaveAppliedById: async (data) => {
    const payload = { _id: data, isDelete: false };
    const dataById = await leaveAppliedModel.findOneDocument(payload);
    if (!dataById) throw new NotFound("No leave application were found");
    return dataById;
  },
  updateleaveApplied: async (data) => {
    const {
      leaveAppliedId,
      leaveType,
      startDate,
      endDate,
      leaveReason,
      status,
    } = data;
    const filter = { _id: leaveAppliedId };
    const existData = await leaveAppliedModel.findOneDocument(filter);
    if (!existData)
      throw new NotFound("No leave application were found to update");
    const update = {
      $set: { leaveType, startDate, endDate, leaveReason, status },
    };
    const options = { new: true };
    const updateData = await leaveAppliedModel.updateDocument(
      filter,
      update,
      options
    );
    return updateData;
  },
  updateleaveAppliedStatus: async (data) => {
    const { leaveAppliedId, status, notes } = data;
    const filter = { _id: leaveAppliedId };
    const update = { $set: { status, notes } };
    const options = { new: true };
    const updateData = await leaveAppliedModel.updateDocument(
      filter,
      update,
      options
    );
    return updateData;
  },
  deleteLeaveApplied: async (data) => {
    const filter = { _id: data };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await leaveAppliedModel.deleteDocument(
      filter,
      update,
      options
    );
    return deleteData;
  },
};

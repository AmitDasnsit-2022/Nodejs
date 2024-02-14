import employee from "./employee.js";
import ModelService from "../../database/ModelService.js";
import { NotFound, alreadyExist } from "../../Error/BaseError.js";

const employeeModal = new ModelService(employee);

export const employeeService = {
  createEmployee: async (data, userId) => {
    const createdBy = userId;
    const payload = { createdBy, employeeManageId: createdBy };
    data["createdBy"] = payload.createdBy;
    const existData = await employeeModal.findOneDocument({
      email: data.email,
    });
    if (existData) {
      throw new alreadyExist("Employee already exist");
    }
    const savedata = await employeeModal.createDocument(data);
    return savedata;
  },
  getallEmployee: async (data) => {
    const query = { isDelete: false };
    if (data?.keys) {
      const regex = new RegExp(data.keys, "i");
      query["firstName"] = regex;
    }
    const allData = await employeeModal.getAllDocuments(query);
    if (!allData.length) {
      throw new NotFound("No education details were found");
    }
    return allData;
  },
  getempById: async (data) => {
    const payload = { employeeManageId: data, isDelete: false };
    const dataById = await employeeModal.findOneDocument(payload);
    if (!dataById) {
      throw new NotFound("No employee details were found");
    }
    return dataById;
  },
  updateEmployee: async (data) => {
    const filter = { _id: data.employeeId };
    const update = { data };
    const options = { new: true };
    const updateData = await employeeModal.updateDocument(
      filter,
      update,
      options
    );
    return updateData;
  },
  deleteEmployee: async (data) => {
    const filter = { _id: data };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await employeeModal.deleteDocument(
      filter,
      update,
      options
    );
    return deleteData;
  },
};

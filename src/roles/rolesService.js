import { BadValueError } from "../../Error/BaseError.js";
import ModelService from "../../database/ModelService.js";
import Roles from "./roles.js";
const roleModel = new ModelService(Roles);

export const roleService = {
  createRole: async (data) => {
    const { roleName, description } = data;
    const payload = { roleName, description };
    const finddata = await roleModel.findOneDocument({ roleName: roleName });
    if (!finddata) {
      const savedData = await roleModel.createDocument(payload);
      return savedData;
    }
    throw new BadValueError("Date already exist");
  },
  getAllRoles: async (data) => {
    const { limit, skip, sortBy, sortOrder } = data;
    const query = { isDelete: false };
    // const payload = { limit, skip, sortBy, sortOrder };
    const allData = await roleModel.getAllDocuments(query, data);
    // console.log(allData);
    return allData;
  },
  getRoleById: async (data) => {
    console.log(data);
    const payload = { _id: data };
    const dataById = await roleModel.findDocumentById(payload);
    return dataById;
  },
  updateRole: async (data) => {
    const { roleId, roleName, description, isActive } = data;
    const filter = { _id: roleId };
    const update = { $set: { roleName, isActive, description } };
    const options = { new: true };
    const updateData = await roleModel.updateDocument(filter, update, options);
    return updateData;
  },
  deleteRole: async (data) => {
    const { roleId } = data;
    const filter = { _id: roleId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await roleModel.deleteDocument(filter, update, options);
    return deleteData;
  },
};

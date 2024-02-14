import { BadValueError, BaseError, NotFound } from "../../Error/BaseError.js";
import dbModalService from "../../database/ModelService.js";
import assignModal from "./assignModal.js";

const assignmodal = new dbModalService(assignModal);

/**
 * @description Create assign service
 * @param {*} data
 * @returns
 */
export const createData = async (data, userId) => {
  const { roleId, models } = data;

  // Check if role id already exists
  const existingData = await assignmodal.findOneDocument({ roleId });

  // Case 3: If role id and modelId already exist, throw an error
  const existingModel = existingData?.models.find(
    (model) => model.modelId === models[0].modelId
  );

  if (existingModel) {
    throw new BadValueError("Data already exists");
  }

  if (existingData) {
    // Case 2: If role id exists, add a new object with the provided modelId
    existingData.models.push(models[0]);
    const updatedData = await assignmodal.updateDocument(
      { roleId },
      { models: existingData.models },
      { new: true }
    );

    return updatedData;
  } else {
    // Case 1: If role id doesn't exist, create a new document
    data.createdBy = userId;
    const createdData = await assignmodal.createDocument(data);
    return createdData;
  }
};

/**
 * @description this is used in role middleware
 * @param {*} data
 * @param {*} userId
 * @returns
 */
export const getbyroleId = async (data) => {
  const findata = await assignmodal.findOneDocument({
    roleId: data.roleId,
    isActive: true,
    isDelete: false,
  });
  if (!findata) throw new NotFound("Data not found");
  return findata;
};

/**
 * @param {*} data
 * @param {*} userId
 * @returns
 */
export const getbyUserroleId = async (data, userdata) => {
  const { roleId } = userdata;
  const findata = await assignmodal.findOneDocument({
    roleId: data.roleId || roleId,
    isActive: true,
    isDelete: false,
  });
  if (!findata) throw new NotFound("Data not found");
  return findata;
};

/**
 * @description Get all assinged services
 * @param {*} data
 * @returns
 */
export const getAll = async (data) => {
  const finddata = await assignmodal.getAllDocuments({
    isActive: true,
    isDelete: false,
  });
  if (!finddata) {
    throw new NotFound("Data not found");
  }
  return finddata;
};

export const updateAssignedData = async (data) => {
  const { assignServiceId, models } = data;

  const existingData = await assignmodal.findDocumentById({
    _id: assignServiceId,
  });

  if (!existingData) {
    throw new NotFound("Data not found");
  }

  // Find the index of the modelId in the array
  const modelIndex = existingData.models.findIndex((model) =>
    model.modelId.equals(models[0].modelId)
  );

  if (modelIndex === -1) {
    throw new NotFound("ModelId not found");
  }

  // Update only the specified modelId with new values
  existingData.models[modelIndex] = models[0];

  // Save the updated data
  const updatedData = await assignmodal.updateDocument(
    { _id: assignServiceId },
    { models: existingData.models },
    { new: true }
  );

  return updatedData;
};

export const removeAssignModel = async (data, userdata) => {
  const { assignServiceId, modelId } = data;
  const existingData = await assignmodal.findOneDocument({
    _id: assignServiceId,
  });
  if (!existingData) {
    throw new NotFound("Assign Service Id not found or exist");
  }
  const modelIndex = existingData.models.findIndex((model) =>
    model.modelId.equals(modelId)
  );
  if (modelIndex === -1) {
    throw new NotFound("ModelId not found");
  }
  existingData.models.splice(modelIndex, 1);
  const updatedData = await assignmodal.updateDocument(
    { _id: assignServiceId },
    { models: existingData.models },
    { new: true }
  );
  return updatedData;
};

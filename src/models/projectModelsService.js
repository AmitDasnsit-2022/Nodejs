import { modelNames } from "mongoose";
import dbServiceModal from "../../database/ModelService.js";
import projectModal from "./projectModels.js";
import { BadValueError, DuplicateKeyError } from "../../Error/BaseError.js";
const model = new dbServiceModal(projectModal);

/**
 * @description insert data of all model
 * @param {*} data
 * @returns
 */
export const createModel = async (data) => {
  data.modelsName.toLowerCase();

  const finddata = await model.findOneDocument({ modelsName: data.modelsName });
  if (finddata) {
    throw new DuplicateKeyError(`${data.modelsName} already exists`);
  }
  const createddata = await model.createDocument({
    modelsName: data.modelsName,
    description: data.description,
  });
  return createddata;
};

/**
 * @description Get all project model
 * @param {*} data
 * @returns
 */
export const getAllProjectModal = async (data) => {
  return modelNames();
};

/**
 * @description Get all exist project model
 * @param {*} data
 * @returns
 */
export const getAllSavedProjectModal = async (data) => {
  const existdata = await model.getAllDocuments();
  if (!existdata.length) {
    throw new BadValueError("Data not exist");
  }
  return existdata;
};

/**
 * @description Get One model modelsName
 * @param {*} data
 * @returns
 */
export const getOneModel = async (data) => {
  const existdata = await model.findOneDocument(data);
  if (!existdata) {
    throw new BadValueError("Data not exist");
  }
  return existdata;
};

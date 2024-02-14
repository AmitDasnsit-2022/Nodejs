import EventEmitter from "node:events";
import assignModel from "../src/assignService/assignModal.js";
import ModelService from "../database/ModelService.js";
import projectModal from "../src/models/projectModels.js";
import mongoose from "mongoose";
const eventEmitter = new EventEmitter();
const assignmodel = new ModelService(assignModel);

eventEmitter.on("assignAllmodule", async (data) => {
  const modelsname = mongoose.modelNames();
  const modeldata = modelsname.map((model) => ({
    modelId: model,
    permissions: ["create", "read", "edit", "delete"],
    access: "allData",
  }));
  const payload = {
    createdBy: data.createdBy,
    roleId: data.roleId,
    models: modeldata,
  };
  await assignmodel.insertManyDocuments(payload);
});

export default eventEmitter;

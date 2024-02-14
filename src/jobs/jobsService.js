import ModelService from "../../database/ModelService.js";
import jobs from "./jobs.js";

const jobsModel = new ModelService(jobs);
export const jobsService = {
  createJobs: async (data, userId) => {
    data["createdBy"] = userId;
    const savedData = await jobsModel.createDocument(data);
    return savedData;
  },
  getAllJobs: async (data) => {
    const allData = await jobsModel.getAllDocuments();
    if (!allData.length) throw new Error("No jobs found");
    return allData;
  },
  getJobsById: async (data) => {
    const dataById = await jobsModel.findOneDocument({ _id: data });
    if (!dataById) throw new Error("Job id not found");
    return dataById;
  },
  updateJobs: async (data) => {
    const { jobId, jobName, description, designations } = data;
    const filter = { _id: jobId };
    const update = { $set: { jobName, description, designations } };
    const options = { new: true };
    const updatedData = await jobsModel.updateDocument(filter, update, options);
    return updatedData;
  },
  deleteJobs: async (data) => {
    const filter = { _id: data };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const deleteData = await jobsModel.deleteDocument(filter, update, options);
    return deleteData;
  },
};
    
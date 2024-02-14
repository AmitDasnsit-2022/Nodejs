import ModelService from "../../database/ModelService.js";

import joining from "./joining.js";

const model = new ModelService(joining);

const populateOptions = [
  {
    path: "interviewId",
    populate: {
      path: "departmentId",
    },
  },
];

export const joiningService = {
  createJoining: async (data) => {
    const { joiningStatus, offerLetter, remarks, interviewId, joiningDate } =
      data;
    const payload = {
      joiningStatus,
      offerLetter,
      remarks,
      interviewId,
      joiningDate,
    };

    const populateOptions = {
      fieldsName: `interviewId`,
    };

    const savedData = await model
      .createDocument(payload, populateOptions)
      .then((res) => {
        return res.populate(
          "interviewId.departmentId interviewId.interviewerId"
        );
      });

    return savedData;
  },
  getAllJoinings: async (data) => {
    const query = { isDelete: false };

    const documents = await model.getAllDocuments(query, {
      ...data,
      populateOptions,
    });

    const totalCount = await model.getTotalCount({ isDelete: false });
    return { documents, totalCount };
  },

  getJoiningById: async (data) => {
    const { joiningId } = data;
    const payload = { _id: joiningId, isDelete: false };

    const documents = await model
      .findOneDocument(payload)
      .then((res) => res.populate(populateOptions));
    return documents;
  },
  updateJoining: async (data) => {
    const {
      joiningStatus,
      offerLetter,
      remarks,
      joiningId,
      interviewId,
      joiningDate,
      isActive,
    } = data;

    const filter = { _id: joiningId };
    const update = {
      joiningStatus,
      offerLetter,
      remarks,
      isActive,
      interviewId,
      joiningDate,
    };
    const options = { new: true };

    const documents = await model
      .updateDocument(filter, update, options)
      .then((res) => res.populate(populateOptions));
    return documents;
  },

  deleteJoining: async (data) => {
    const { joiningId } = data;
    const filter = { _id: joiningId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const documents = await model.deleteDocument(filter, update, options);
    return documents;
  },

  getByUserId: async (payload) => {
    const { data, user } = payload;
    console.log(data, user);
  },
};

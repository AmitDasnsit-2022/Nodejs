import ModelService from "../../database/ModelService.js";
import { AccessEnum } from "../../middlewares/auth.js";
import joining from "../joining/joining.js";
import interview from "./interview.js";

const model = new ModelService(interview);

const joiningModel = new ModelService(joining);

const populateOptions = [
  {
    path: "departmentId roundInfo.interviewerId",
  },
];
export const interviewService = {
  createInterview: async (data) => {
    const {
      candidateName,
      email,
      mobileNumber,
      currentLocation,
      preferredLocation,
      applyingFor,
      departmentId,
      resume,
      interviewStatus,
      roundInfo,
      totalRounds,
      employeeRatings,
      linkedinUrl,
      portfolioUrl,
      otherUrls,
      currentCTC,
      expectedCTC,
      inHandSalary,
      expectedCtcNegotiable,
      noticePeriod,
      noticeNegotiable,
      highestQualification,
      currentlyWorking,
      curentCompany,
      totalExperience,
    } = data.body;
    const payload = {
      candidateName,
      email,
      mobileNumber,
      currentLocation,
      preferredLocation,
      applyingFor,
      departmentId,
      resume,
      interviewStatus,
      roundInfo,
      totalRounds,
      employeeRatings,
      linkedinUrl,
      portfolioUrl,
      otherUrls,
      currentCTC,
      expectedCTC,
      inHandSalary,
      expectedCtcNegotiable,
      noticePeriod,
      noticeNegotiable,
      highestQualification,
      currentlyWorking,
      curentCompany,
      totalExperience,
      createdBy: data.user.userId,
    };

    const savedData = await model.createDocument(payload).then((res) => {
      return res.populate([
        {
          path: "departmentId roundInfo.interviewerId",

          select: "departmentName username email scheduledTime",
        },
      ]);
    });

    return savedData;
  },
  getAllInterviews: async (data) => {
    const query = { isDelete: false };
    const modifyQuery = { ...data, populateOptions };

    const documents = await model.getAllDocuments(query, modifyQuery);
    const totalCount = await model.getTotalCount(query);
    return { documents, totalCount };
  },

  getInterviewById: async (data) => {
    const { interviewId } = data;
    const payload = { _id: interviewId, isDelete: false };
    const documents = await model.findOneDocument(payload).then((res) => {
      return res.populate(populateOptions);
    });
    console.log(documents);
    return documents;
  },
  updateInterview: async (payload) => {
    const { data, user } = payload;
    console.log(user.userId);
    const { interviewId, interviewStatus, ...otherFields } = data;
    const filter = { _id: interviewId };
    const update = {
      interviewId,
      interviewStatus,

      ...otherFields,
    };
    const options = { new: true };

    if (interviewStatus === "completed") {
      const isInterviewPresent = await joiningModel.findOneDocument({
        interviewId: interviewId,
      });
      if (!isInterviewPresent) {
        const joiningPayload = {
          joiningStatus: "pending",
          offerLetter: "",
          remarks: "",
          interviewId,
          createdBy: user.userId,
          joiningDate: "",
        };

        await joiningModel.createDocument(joiningPayload);
      }
    }

    const documents = await model
      .updateDocument(filter, update, options)
      .then((res) => res.populate(populateOptions));
    return documents;
  },

  // getOneDocument: async (data) => {
  //   const payload = {};
  //   const documents = await model.findOneDocument();
  //   return documents;
  // },

  deleteInterview: async (data) => {
    const { interviewId } = data;
    const filter = { _id: interviewId };
    const update = { $set: { isDelete: true, isActive: false } };
    const options = { new: true };
    const documents = await model.deleteDocument(filter, update, options);
    return documents;
  },

  getAssignedInterviews: async (data) => {
    const { user } = data;

    const limit = data.data.limit;
    const query = { limit, populateOptions };
    const { userId, departmentId, access } = user;
    let assignedInterviews;
    let count;

    if (access === AccessEnum.allData) {
      const filter = {
        isDelete: false,
      };

      assignedInterviews = await model.getAllDocuments(filter, query);
      count = await model.getTotalCount(filter, query);
    } else if (
      access === AccessEnum.self ||
      access === AccessEnum.reporteesPlusSelf
    ) {
      assignedInterviews = await model.getAllDocuments(
        {
          isDelete: false,
          $or: [
            {
              roundInfo: {
                $elemMatch: {
                  interviewerId: { $in: userId },
                  roundStatus: "pending",
                },
              },
            },
            {
              createdBy: userId,
            },
          ],
        },
        query
      );

      count = await model.getTotalCount({
        isDelete: false,
        $or: [
          {
            roundInfo: {
              $elemMatch: {
                interviewerId: { $in: userId },
                roundStatus: "pending",
              },
            },
          },
          {
            createdBy: userId,
          },
        ],
      });
    }

    return { assignedInterviews, count };
  },
};

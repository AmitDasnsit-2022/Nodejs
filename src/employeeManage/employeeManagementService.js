import employeeManagement from "./employeeManagement.js";
import modelService from "../../database/ModelService.js";
import employeeInfo from "../employee/employee.js";
import {
  BadValueError,
  DuplicateKeyError,
  NotFound,
} from "../../Error/BaseError.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../../helpers/index.js";
import { AccessEnum } from "../../middlewares/auth.js";
import assignModal from "../assignService/assignModal.js";
import mongoose from "mongoose";
const employeeManagementModel = new modelService(employeeManagement);
const employeeinfoModel = new modelService(employeeInfo);
const assignService = new modelService(assignModal);
const ObjectId = mongoose.Types.ObjectId;

export const create = async (data, userId) => {
  const {
    firstName,
    lastName,
    dateofJoining,
    designation,
    employmentType,
    employeeStatus,
    password,
    officeEmail,
    departmentId,
    roleId,
    repoterId,
    email,
    profile_img,
    gender,
    mobile,
    sourceofHire,
    shiftId,
    bankDetails,
    empAddInfo,
    empEducation,
    empProfDetails,
  } = data;
  const empManagePayload = {
    firstName,
    lastName,
    dateofJoining,
    designation,
    employmentType,
    employeeStatus,
    password,
    officeEmail,
    departmentId,
    roleId,
    repoterId,
    mobile,
    sourceofHire,
    shiftId,
    createdBy: userId,
  };
  const empPayload = {
    email,
    profile_img,
    mobile,
    gender,
    createdBy: userId,
    bankDetails,
    empAddInfo,
    empEducation,
    empProfDetails,
  };
  const finddata = await employeeManagementModel.findOneDocument({
    officeEmail: officeEmail,
  });
  if (finddata) {
    throw new DuplicateKeyError("Email Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  empManagePayload.password = await bcrypt.hash(
    empManagePayload.password,
    salt
  );
  const createddata = await employeeManagementModel.createDocument(
    empManagePayload
  );
  if (!createddata) {
    throw new BadValueError("Something is wrong");
  }
  empPayload["employeeManageId"] = createddata._id;
  const empData = await employeeinfoModel.createDocument(empPayload);
  await sendMail(
    empManagePayload.officeEmail,
    "First time password",
    `Your first time Password :- ${password}`
  );
  const fullData = { employeeManagement: createddata, employeeInfo: empData };
  return fullData;
};

/**
 * @description Get data by repoter id
 * @param {*} data repoterId, roleId
 * @returns
 */
export const getRepoterData = async (data) => {
  const finddata = await employeeManagementModel.getAllDocuments(data);
  if (!finddata) {
    throw new BadValueError("Data not found");
  }
  return finddata;
};
export const getempById = async (data) => {
  const getById = await employeeManagementModel.getAllDocuments({
    _id: data,
    isDelete: false,
  });
  if (!getById) {
    throw new BadValueError("Data not found");
  }
  return getById;
};
export const getallEmp = async (data) => {
  const { access, userId, reporteesData, departmentId } = data.userdata;
  let filter = {
    isDelete: false,
    isActive: true,
  };

  if (access === AccessEnum.self) {
    filter["_id"] = userId;
  } else if (access === AccessEnum.reporteesPlusSelf || "reporteesData") {
    filter["departmentId"] = { $in: departmentId };
  }
  const populateOptions = [
    { path: "shiftId", select: "shiftName shiftTiming" }, // Assuming 'shiftName' is the field you want to select
    { path: "roleId", select: "roleName" }, // Assuming 'roleName' is the field you want to select
    { path: "departmentId", select: "departmentName" }, // Assuming 'departmentName' is the field you want to select
  ];
  const allData = await employeeManagementModel.getAllDocuments(
    {
      isDelete: false,
    },
    { populateOptions }
  );
  if (!allData) {
    throw new NotFound("Data not found");
  }
  return allData;
};

/**
 * @description Upddate management employee data
 * @param {*} data
 * @returns
 */
export const updateEmployee = async (data) => {
  let emplManagePayload = {
    firstName: data.firstName,
    lastName: data.lastName,
    dateofJoining: data.dateofJoining,
    designation: data.designation,
    employmentType: data.employmentType,
    employeeStatus: data.employeeStatus,
    roleId: data.roleId,
    departmentId: data.departmentId,
    repoterId: data.repoterId,
    officeEmail: data.officeEmail,
    isActive: data.isActive,
  };
  const { access } = data.userdata.models;
  if (access != AccessEnum.allData) {
    delete emplManagePayload.roleId;
  }
  const empmanageUpdate = await employeeManagementModel.updateDocument(
    { _id: data.empManageId || data.employeeInfoId },
    { $set: emplManagePayload },
    {
      new: true,
    }
  );
  const empinfoUpdate = await employeeinfoModel.updateDocument(
    { _id: data.employeeInfoId },
    {
      email: data.email,
      profile_img: data.profile_img,
      gender: data.gender,
      mobile: data.mobile,
      shiftId: data.shiftId,
      bankDetails: data.bankDetails,
      empAddInfo: data.empAddInfo,
      empEducation: data.empEducation,
      empProfDetails: data.empProfDetails,
    },
    {
      new: true,
    }
  );
  const totalUpdatedData = {
    empManageUpdate: empmanageUpdate,
    empInfoUpdate: empinfoUpdate,
  };
  if (!totalUpdatedData) throw new BadValueError("Data not updated");
  return totalUpdatedData;
};

export const deleteempById = async (data) => {
  const getById = await employeeManagementModel.deleteDocument(
    { _id: data },
    { isDelete: true, isActive: false },
    { new: true }
  );
  if (!getById) {
    throw new BadValueError("Data not found");
  }
  return getById;
};

export const getEmpByDepartment = async (data) => {
  const ids = data.departmentId.map((id) => new ObjectId(id));
  const finddata = await employeeManagementModel.getDataWithAggregate([
    {
      $match: {
        departmentId: { $in: ids },
      },
    },
    {
      $lookup: {
        from: "assignservices",
        let: { roleId: "$roleId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$roleId", "$$roleId"],
              },
              "models.access": { $eq: "reportessPlussSelf" },
              isActive: true,
              isDelete: false,
            },
          },
        ],
        as: "assignservices",
      },
    },
    {
      $lookup: {
        from: "departments",
        let: { departmentId: "$departmentId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$_id", "$$departmentId"],
              },
              isActive: true,
              isDelete: false,
            },
          },
        ],
        as: "departments",
      },
    },
    {
      $match: {
        assignservices: { $ne: [] },
      },
    },
    {
      $project: {
        _id: 1,
        officeEmail: 1,
        firstName: 1,
        lastName: 1,
        departments: {
          $filter: {
            input: "$departments",
            as: "department",
            cond: {
              $in: ["$$department._id", ids],
            },
          },
        },
      },
    },
  ]);

  return finddata;
};

import { successResponse } from "../../helpers/index.js";
import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import * as employeeManagementService from "./employeeManagementService.js";

export const createUserCredentials = AsyncHandler(async (req, res, next) => {
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
    isActive,
        email,
    profile_img,
    gender,
    mobile,
    sourceofHire,
    shiftId,
    bankDetails: { bankName, branchName, accountType, accountNumber, ifscCode },
    empAddInfo: {
      UAN_Number,
      dob,
      maritalStatus,
      alternateNumber,
      aadharNumber,
      panNumber,
      presentAddress: {
        address1: presentAddress1,
        address2: presentAddress2,
        city: presentCity,
        state: presentState,
        code: presentCode,
        country: presentCountry,
      },
      permanentAddress: {
        address1: permanentAddress1,
        address2: permanentAddress2,
        city: permanentCity,
        state: permanentState,
        code: permanentCode,
        country: permanentCountry,
      },
    },
    empEducation,
    empProfDetails: {
      experience:[
        {
          companyName,
          jobTitle,
          fromDate,
          toDate,
          jobDescription,
          location,
          currentlyWorking,
        },
      ],
      skillSet,
      highestQualification,
      noticePeriod,
      currentSalary,
    },
  } = req.body;
  const dynamicEmpEducation = empEducation.map((item) => {
    // Handle each item in empEducation
    return {
      instituteName: item.instituteName,
      degreeOrDiploma: item.degreeOrDiploma,
      specialization: item.specialization,
      startCourseDate: item.startCourseDate,
      dateOfCompletion: item.dateOfCompletion,
    };
  });
  const payload = {
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
    isActive,
        email,
    profile_img,
    gender,
    mobile,
    sourceofHire,
    shiftId,
    bankDetails: {
      bankName,
      branchName,
      accountType,
      accountNumber,
      ifscCode,
    },
    empAddInfo: {
      UAN_Number,
      dob,
      maritalStatus,
      alternateNumber,
      aadharNumber,
      panNumber,
      presentAddress: {
        address1: presentAddress1,
        address2: presentAddress2,
        city: presentCity,
        state: presentState,
        code: presentCode,
        country: presentCountry,
      },
      permanentAddress: {
        address1: permanentAddress1,
        address2: permanentAddress2,
        city: permanentCity,
        state: permanentState,
        code: permanentCode,
        country: permanentCountry,
      },
    },
    empEducation: dynamicEmpEducation,
    empProfDetails: {
      experience:[
        {
          companyName,
          jobTitle,
          fromDate,
          toDate,
          jobDescription,
          location,
          currentlyWorking,
        },
      ],
      skillSet,
      highestQualification,
      noticePeriod,
      currentSalary,
    },
  };
  const data = await employeeManagementService.create(payload, req.user.userId);
  if (data) {
    successResponse({
      req,
      res,
      data,
      code: 200,
      msg: "Data created successfully",
    });
  }
});

export const getAll = AsyncHandler(async (req, res, next) => {
  const payload = { bodydata: req.body, userdata: req.user };
  const data = await employeeManagementService.getallEmp(payload);
  return successResponse({ req, res, data, code: 200 });
});
export const getById = AsyncHandler(async (req, res, next) => {
  const { empManageId } = req.body;
  const data = await employeeManagementService.getempById(empManageId);
  return successResponse({ req, res, data, code: 200 });
});
export const updateManageEmpl = AsyncHandler(async (req, res, next) => {
  const {
    empManageId,
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
    isActive,
    employeeInfoId,
    email,
    profile_img,
    gender,
    mobile,
    sourceofHire,
    shiftId,
    bankDetails: { bankName, branchName, accountType, accountNumber, ifscCode },
    empAddInfo: {
      UAN_Number,
      dob,
      maritalStatus,
      alternateNumber,
      aadharNumber,
      panNumber,
      presentAddress: {
        address1: presentAddress1,
        address2: presentAddress2,
        city: presentCity,
        state: presentState,
        code: presentCode,
        country: presentCountry,
      },
      permanentAddress: {
        address1: permanentAddress1,
        address2: permanentAddress2,
        city: permanentCity,
        state: permanentState,
        code: permanentCode,
        country: permanentCountry,
      },
    },
    empEducation: [
      {
        instituteName,
        degreeOrDiploma,
        specialization,
        startCourseDate,
        dateOfCompletion,
      },
    ],
    empProfDetails: {
      experience: [
        {
          companyName,
          jobTitle,
          fromDate,
          toDate,
          jobDescription,
          location,
          currentlyWorking,
        },
      ],
      skillSet,
      highestQualification,
      noticePeriod,
      currentSalary,
    },
  } = req.body;
  const payload = {
    empManageId,
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
    isActive,
    employeeInfoId,
    email,
    profile_img,
    gender,
    mobile,
    sourceofHire,
    shiftId,
    bankDetails: {
      bankName,
      branchName,
      accountType,
      accountNumber,
      ifscCode,
    },
    empAddInfo: {
      UAN_Number,
      dob,
      maritalStatus,
      alternateNumber,
      aadharNumber,
      panNumber,
      presentAddress: {
        address1: presentAddress1,
        address2: presentAddress2,
        city: presentCity,
        state: presentState,
        code: presentCode,
        country: presentCountry,
      },
      permanentAddress: {
        address1: permanentAddress1,
        address2: permanentAddress2,
        city: permanentCity,
        state: permanentState,
        code: permanentCode,
        country: permanentCountry,
      },
    },
    empEducation: [
      {
        instituteName,
        degreeOrDiploma,
        specialization,
        startCourseDate,
        dateOfCompletion,
      },
    ],
    empProfDetails: {
      experience: [
        {
          companyName,
          jobTitle,
          fromDate,
          toDate,
          jobDescription,
          location,
          currentlyWorking,
        },
      ],
      skillSet,
      highestQualification,
      noticePeriod,
      currentSalary,
    },
    userdata: req.user
  };

  const data = await employeeManagementService.updateEmployee(payload);
  if (data) return successResponse({ req, res, data, code: 200 });
});

export const deleteById = AsyncHandler(async (req, res, next) => {
  const { empManageId } = req.body;
  const data = await employeeManagementService.deleteempById(empManageId);
  return successResponse({ req, res, data, code: 200 });
});

export const getEmpByDepartment = AsyncHandler(async (req, res, next) => {
  const data = await employeeManagementService.getEmpByDepartment(req.body);
  successResponse({ req, res, data, code: 200 });
});

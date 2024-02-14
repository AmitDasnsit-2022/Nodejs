import ModelService from "../../database/ModelService.js";
import users from "./users.js";
import bcrypt from "bcryptjs";
import {
  BadValueError,
  DuplicateKeyError,
  NotFound,
  UnAuthorized,
} from "../../Error/BaseError.js";
import { generateJwtToken } from "../../middlewares/auth.js";
import { encryptData, generateOTP, sendMail } from "../../helpers/index.js";
import employeeMange from "../employeeManage/employeeManagement.js";
import roleModal from "../roles/roles.js";
import eventEmitter from "../../events/index.js";
const usersModel = new ModelService(users);
const employeeMangement = new ModelService(employeeMange);
const rolesModel = new ModelService(roleModal);

/**
 * @description User Registration
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const userRegisterService = async (req, res, next) => {
  const data = req.body;
  const finddata = await usersModel.findOneDocument({ email: data.email });
  if (finddata) {
    throw new DuplicateKeyError("Email Already Exist");
  }
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  const otp = generateOTP();
  data["otp"] = otp;
  data["otpExpireTime"] = Date.now() + 60000;
  const savedData = await usersModel.createDocument(data);
  if (!savedData) {
    throw new BadValueError("Something is wrong");
  }
  const roledata = await rolesModel.createDocument({
    roleName: "director",
    isActive: true,
  });
  data["createdBy"] = savedData._id;
  data["roleId"] = roledata._id;
  const employemangesaveddata = await employeeMangement.createDocument(data);
  eventEmitter.emit("assignAllmodule", data);
  sendMail(
    data.email,
    "Registration Successfull",
    `Your verification otp is ${otp}`
  );
  return savedData;
};

/**
 * @description user registred mail verification
 * @param {*} data
 * @returns
 */
export const userEmailVerification = async (data) => {
  const finddata = await usersModel.findOneDocument({
    $and: [{ email: data.email }, { otp: data.otp }],
  });
  if (!finddata) {
    throw new NotFound("Data not found");
  }

  if (finddata.otpExpireTime < Date.now()) {
    throw new UnAuthorized("OTP Expired");
  }
  const updatedata = await usersModel.updateDocument(
    { email: data.email },
    {
      $unset: { otpExpireTime: finddata.otpExpireTime, otp: finddata.otp },
      $set: { isActive: true },
    },
    { new: true }
  );
  return updatedata;
};

/**
 * @description resend opt on user registred mail
 * @param {*} data
 * @returns
 */
export const resendOtp = async (data) => {
  const finddata = await usersModel.findOneDocument({ email: data.email });
  if (!finddata) {
    throw new NotFound("Data not found");
  }
  const otp = generateOTP();
  data["otp"] = otp;
  data["otpExpireTime"] = Date.now() + 60000;
  const updatedata = await usersModel.updateDocument(
    { email: data.email },
    { $set: { otp: data.otp, otpExpireTime: data.otpExpireTime } },
    { new: true }
  );
  return updatedata;
};

/**
 * @description user Login
 * @param {*} data
 * @returns
 */
export const userLoginService = async (data) => {
  // console.log(data)
  let savedData;
  savedData = await employeeMangement.getDataWithAggregate([
    {
      $match: { officeEmail: data.email },
    },
    {
      $lookup: {
        from: "assignservices",
        localField: "roleId",
        foreignField: "roleId",
        as: "assignservices",
      },
    },
    {
      $unwind: "$assignservices",
    },
  ]);
  if (!savedData.length) {
    throw new BadValueError("Email is not registered");
  }
  savedData = savedData[0];
  if (!savedData.isActive) {
    throw new BadValueError("Email is not verify");
  }
  const isMatch = await bcrypt.compare(data.password, savedData.password);
  if (!isMatch) {
    throw new BadValueError("Invalid Credentials");
  }
  delete savedData.password;
  const encriptedData = encryptData(JSON.stringify(savedData));
  delete savedData.assignservices;
  const token = await generateJwtToken(encriptedData);
  return { token, savedData };
};

import { AsyncHandler } from "../../helpers/AsyncHandler.js";
import { successResponse } from "../../helpers/index.js";
import * as userService from "./usersService.js";

export const register = AsyncHandler(async (req, res, next) => {
  const data = await userService.userRegisterService(req, res, next);
  return successResponse({
    req,
    res,
    data,
    code: 200,
    msg: "Registration successfully",
  });
});

export const login = AsyncHandler(async (req, res, next) => {
  const data = await userService.userLoginService(req.body);
  return successResponse({
    req,
    res,
    data: data.savedData,
    code: 200,
    msg: "Login successfully",
    token: data.token,
  });
});

export const mailVerification = AsyncHandler(async (req, res, next) => {
  const data = await userService.userEmailVerification(req.body);
  if (data) {
    return successResponse({
      req,
      res,
      data: [],
      code: 200,
      msg: "Email verification successfull",
    });
  }
});

export const resendOtpOnMail = AsyncHandler(async (req, res, next) => {
  const data = await userService.resendOtp(req.body);
  if (data) {
    return successResponse({
      req,
      res,
      data: [],
      code: 200,
      msg: "OTP sended",
    });
  }
});

import express from "express";
import * as usersController from "./usersController.js";
import * as validate from "../../helpers/validates.js";
const usersRouter = express();

usersRouter.post(
  "/register",
  validate.validateSchema(validate.userRegister),
  usersController.register
);
usersRouter.post(
  "/login",
  validate.validateSchema(validate.userLogin),
  usersController.login
);

usersRouter.post(
  "/email/verify",
  validate.validateSchema(validate.mailVerify),
  usersController.mailVerification
);

usersRouter.post(
  "/email/resendotp",
  validate.validateSchema(validate.email),
  usersController.resendOtpOnMail
);

export default usersRouter;

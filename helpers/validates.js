import { body, param, query, validationResult } from "express-validator";
import Joi from "joi";
import { ValidationError } from "../Error/BaseError.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

export const validateLogin = [
  body("mobile").isMobilePhone().notEmpty(),
  body("password").notEmpty(),
  handleValidationErrors,
];

export const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((singleError) => {
      return singleError.message;
    });
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

export const userRegister = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required(),
  companyName: Joi.string().required().min(3),
  password: Joi.string().required().min(3),
  address: Joi.string().required().min(3),
  mobile: Joi.string().required().min(3),
});

export const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3),
});

export const email = Joi.object({
  email: Joi.string().email().required(),
});

export const mailVerify = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required().min(6),
});

export const roleSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().required(),
  companyName: Joi.string().required().min(3),
});

export const employeeCreate = Joi.object({
  firstName: Joi.string().required().min(3).max(20),
  lastName: Joi.string().required().min(3).max(20),
  email: Joi.string().required().min(3).max(40),
  mobile: Joi.string().required().min(3).max(20),
  gender: Joi.string().required().min(3).max(20),
  profile_img: Joi.string().required().min(3).max(50),
});

export const leaveTypeSchema = Joi.object({
  leaveTypeName: Joi.string().required().min(3).max(20),
});

export const projectModelCreateSchema = Joi.object({
  modelsName: Joi.string().required().min(3).max(20),
  description: Joi.string().required().min(3).max(20),
});

export const assingServiceValidate = [
  body("roleId").isMongoId(),
  body("models").isArray().withMessage("Data must be an array of object"),
  body("models.*.modelId").notEmpty().withMessage("ModelId is required"),
  body("models.*.permissions").isArray({ min: 1 }),
  body("models.*.access").notEmpty().withMessage("Access is required"),
  handleValidationErrors,
];

export const assingSerUpdateValidate = [
  body("assignServiceId").isMongoId(),
  handleValidationErrors,
];

export const roleIdValidate = [
  body("roleId").isMongoId(),
  handleValidationErrors,
];

/**
 *
 */
export const employeeMangeCreateValidate = [
  body("roleId").isMongoId().withMessage("Role Id is required"),
  body("repoterId").isMongoId().withMessage("RepoterId is required"),
  body("password").notEmpty().withMessage("Password is requried"),
  body("officeEmail").isEmail().withMessage("ModelId is required"),
  body("firstName").notEmpty().withMessage("firstName is requried"),
  body("lastName").notEmpty().withMessage("lastName is requried"),
  body("email").notEmpty().withMessage("email is requried"),
  body("mobile").notEmpty().withMessage("mobile is requried"),
  body("profile_img").notEmpty().withMessage("profile_img is requried"),
  body("gender").notEmpty().withMessage("gender is requried"),
  body("shiftId").isMongoId().withMessage("shiftId is requried"),
  body("departmentId")
    .isArray({ min: 1 })
    .isMongoId()
    .withMessage("Department is required"),
  handleValidationErrors,
];

export const employeeManageIdValidate = [
  body("empManageId").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

export const employeeLoginValidate = [
  body("password").notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("ModelId is required"),
  handleValidationErrors,
];
export const employeeId = [
  body("employeeId").isMongoId().withMessage("Employee Id is required"),
  handleValidationErrors,
];

export const attendancePunchingVaidateion = [
  body("punchings").notEmpty().withMessage("punching is required"),
  handleValidationErrors,
];

// export const attendancePunchOutVaidateion = [
//   body("punchings").notEmpty().withMessage("punchOut is required"),
//   handleValidationErrors,
// ];

export const breakCreateValidate = [
  body("breakName").notEmpty().withMessage("breakName is required"),
  body("isPaid").isBoolean().withMessage("isPaid is required"),
  body("breakMode").notEmpty().withMessage("breakMode is required"),
  body("startTime").notEmpty().withMessage("startTime is required"),
  body("endTime").notEmpty().withMessage("endTime is required"),
  body("shiftId").isMongoId().withMessage("endTime is required"),
  handleValidationErrors,
];

export const shiftCreateValidate = [
  body("shiftName").notEmpty().withMessage("shiftName is required"),
  body("from").notEmpty().withMessage("from is required"),
  body("to").notEmpty().withMessage("to is required"),
  body("departmentId").notEmpty().withMessage("Department is required"),
  handleValidationErrors,
];

export const departmentIdsValidate = [
  body("departmentId")
    .isArray()
    .notEmpty()
    .withMessage("Department Ids is required"),
  handleValidationErrors,
];

export const shiftIdValidate = [
  body("shiftId").isMongoId().withMessage("Shift Id is required"),
  handleValidationErrors,
];

export const departmentIdValidate = [
  body("departmentId").isMongoId().withMessage("Department Id is required"),
  handleValidationErrors,
];

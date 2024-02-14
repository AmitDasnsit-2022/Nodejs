import jwt from "jsonwebtoken";
import { jwtErrorHandler } from "../Error/BaseError.js";
import { decryptData } from "../helpers/index.js";
import { getbyroleId } from "../src/assignService/assignService.js";
import { getRepoterData } from "../src/employeeManage/employeeManagementService.js";
import { getOneModel } from "../src/models/projectModelsService.js";

export const AccessEnum = Object.freeze({
  self: "self",
  reporteesPlusSelf: "reportessPlussSelf",
  allData: "allData",
});

export const auth = (req, res, next) => {
  // Get token from header

  const token = req.header("x-auth-token");
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_ADMIN, async (error, data) => {
    if (error) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    let decodeData = await decryptData(data.user);
    if (!decodeData) {
      return res.status(401).json({ msg: "You are not authorized" });
    }
    decodeData["userId"] = decodeData._id;
    req.user = decodeData;
    // console.log({ decodeData });
    next();
  });
};

/**
 * Verify role, model, permission and access.
 * @description enum: ["self", "reporteesData", "reportessPlussSelf", "allData"],access
 * @param {*} permission
 * @returns
 */
export const roles = (permission, modelsName) => async (req, res, next) => {
  const { roleId, departmentId, assignservices, userId } = req.user;
  const checkAssingModel = assignservices.models.find(
    (item) => item.modelId === modelsName
  );

  if (!checkAssingModel) {
    return res.status(401).json({ msg: "You are not eligibile" });
  }
  if (!checkAssingModel.permissions.includes(permission)) {
    return res.status(401).json({ msg: "You are not authorized" });
  }

  if (permission === "read") {
    const repoterdata = await getRepoterData({ repoterId: userId });

    if (checkAssingModel.access === "reporteesData") {
      req.user["reporteesData"] = repoterdata.length
        ? repoterdata.map((data) => data._id.toString())
        : [];
    } else if (checkAssingModel.access === AccessEnum.reporteesPlusSelf) {
      req.user["access"] = AccessEnum.reporteesPlusSelf;
      req.user["reporteesData"] = repoterdata.length
        ? repoterdata.map((data) => data._id.toString())
        : [];
      req.user["reporteesData"].push(userId);
    } else if (checkAssingModel.access === AccessEnum.allData) {
      req.user["access"] = AccessEnum.allData;
    } else {
      req.user["access"] = AccessEnum.self;
    }
  }
  req.user["models"] = checkAssingModel;
  next();
};

export const verifyDepartment = async (req, res, next) => {
  try {
    const departmentId = req.body.departmentId;
    const departmentIds = req.user.departmentId.includes(departmentId);
    if (!departmentIds)
      return res.status(401).json({ msg: "You are not authorized" });
    return next();
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ msg: error.message });
  }
};

export const generateJwtToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user: data },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "80h" },
      (err, token) => {
        if (err) {
          reject(new jwtErrorHandler(err.message));
        } else {
          resolve(token);
        }
      }
    );
  });
};

import attendance from "./attendance.js";
import modelService from "../../database/ModelService.js";
import {
  alreadyExist,
  NotFound,
  BadValueError,
} from "../../Error/BaseError.js";
const attendanceModel = new modelService(attendance);

/**
 * @description This API is mark punch in timings of an employee
 * @param {} data
 * @returns
 */
export const createPunchIn = async (data) => {
  const { punchings, employeeId } = data;

  // Get the current date as a string without time
  let currentDate = new Date().toISOString().split("T")[0];
  // currentDate.setDate(currentDate.getDate()+1);

  // Calculate the date range for the current day (from midnight to next midnight)
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 1);

  // Check if there is existing attendance data for the current date and employee
  const existingData = await attendanceModel.findOneDocument({
    employeeId,
    attendanceDate: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  if (existingData) {
    const lastPunching =
      existingData.punchings[existingData.punchings.length - 1];
    if (lastPunching && lastPunching.punchOut === null) {
      throw new BadValueError("PunchOut is required before another PunchIn");
    }
    // If existing data is found, update the punchings array with new punchIn
    existingData.punchings.push({ punchIn: punchings });
    const updatedData = await attendanceModel.updateDocument(
      { _id: existingData._id },
      { punchings: existingData.punchings },
      { new: true }
    );
    return updatedData;
  }

  // If no existing data, create a new attendance document
  const payload = {
    punchings: [{ punchIn: punchings }],
    employeeId,
    attendanceDate: currentDate,
  };
  const createdData = await attendanceModel.createDocument(payload);
  return createdData;
};

/**
 * @description This APi is to mark punch out timings for an employee.
 * @param {*} data
 * @returns
 */
export const createPunchOut = async (data) => {
  const { punchings, employeeId } = data;

  // Check if there is existing attendance data for the current date and employee
  // const currentDate = new Date().toISOString().split("T")[0];
  let currentDate = new Date().toISOString().split("T")[0];
  // currentDate.setDate(currentDate.getDate()+1);


  // Calculate the date range for the current day (from midnight to next midnight)
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 1);
  const existingData = await attendanceModel.findOneDocument({
    employeeId,
    attendanceDate: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  if (existingData) {
    const lastPunchOut =
      existingData.punchings[existingData.punchings.length - 1];
    if (lastPunchOut && lastPunchOut.punchOut !== null) {
      throw new alreadyExist("Punch out already done for his session");
    }
    existingData.punchings[ existingData.punchings.length - 1].punchOut = punchings;
    const updatedData = await attendanceModel.updateDocument(
      { _id: existingData._id },
      { punchings: existingData.punchings },
      { new: true }
    );

    return updatedData;
  }
  throw new Error("Cannot find corresponding Punch In data for Punch Out.");
};

export const getall = async (bodydata, userdata) => {
  let filter = {
    isDelete: false,
    isActive: true,
  };
  const { access, userId, reporteesData } = userdata;
  if (access === "self") {
    filter["employeeId"] = userId;
  } else if (access === "reportessPlussSelf" || "reporteesData") {
    filter["employeeId"] = { $in: reporteesData };
  }
  const finddata = await attendanceModel.getAllDocuments(filter);
  return finddata;
};

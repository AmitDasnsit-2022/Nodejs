import shift from "./shift.js";
import serviceModal from "../../database/ModelService.js";
import { alreadyExist } from "../../Error/BaseError.js";
const shiftModule = new serviceModal(shift);

export const create = async (data) => {
  const finddata = await shiftModule.findOneDocument({
    departmentId: data.departmentId,
  });
  if (finddata) {
    throw new alreadyExist("Data already Exist");
  }
  const saveddata = await shiftModule.createDocument(data);
  if (saveddata) return saveddata;
};

export const updateData = async (data) => {
  const updateddata = await shiftModule.updateDocument(
    { _id: data.shiftId },
    { $set: data },
    { new: true }
  );
  if (updateddata) return updateddata;
};

export const deletedata = async (data) => {
  const deletedata = await shiftModule.deleteDocument(
    { _id: data.shiftId },
    { isActive: false, isDelete: true }
  );
  if (deletedata) return deletedata;
};

export const getAll = async (data) => {
  const findata = await shiftModule.getAllDocuments({
    isActive: true,
    isDelete: false,
  });
  if (findata) return findata;
};

export const getByDepartment = async (data) => {
  const populateOptions = [
    {
      path: "departmentId",
      select: ["departmentName"],
    },
  ];
  const findata = await shiftModule.getAllDocuments(
    {
      departmentId: { $in: data.departmentId },
    },
    { populateOptions }
  );
  console.log({ findata });
  if (findata) return findata;
};

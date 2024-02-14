import breaks from "./breaks.js";
import serviceModal from "../../database/ModelService.js";
const breakModule = new serviceModal(breaks);

export const create = async (data) => {
  const saveddata = await breakModule.createDocument(data);
  if (saveddata) return saveddata;
};

export const updateData = async (data) => {
  const deletedata = await breakModule.updateDocument(
    { _id: data.breakId },
    { data },
    { new: true }
  );
  if (deletedata) return deletedata;
};

export const deletedata = async (data) => {
  const deletedata = await breakModule.deleteDocument(
    { _id: data.breakId },
    { isActive: false, isDelete: true }
  );
  if (deletedata) return deletedata;
};

export const getAll = async (data) => {
  const findata = await breakModule.getAllDocuments({
    isActive: true,
    isDelete: false,
  });
  if (findata) return findata;
};

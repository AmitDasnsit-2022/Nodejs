import { MongoHandler } from "../helpers/AsyncHandler.js";

export default class ModelService {
  constructor(model) {
    this.model = model;
  }

  createDocument = MongoHandler(async (data, options = {}) => {
    const customQuery = await this.model.create(data);

    let savedData;

    savedData = customQuery;

    return savedData;
  });

  /**
   * @description Find one Document
   * @param {*} filter
   * @returns
   */
  findOneDocument = MongoHandler(async (query, options = {}) => {
    let data;
    const customQuery = this.model.findOne(query);
    const { populateOptions, selectFields } = options;
    if (populateOptions) {
      customQuery.populate(populateOptions);
    }
    data = await customQuery.exec();
    return data;
  });

  /**
   * @description Find one Document
   * @param {*} filter
   * @returns
   */
  findDocumentById = MongoHandler(async (filter) => {
    const data = await this.model.findById(filter);
    return data;
  });

  /**
   * @description Update Document
   * @param {*} filter, update, options
   * @returns
   */
  updateDocument = MongoHandler(async (filter, update, options) => {
    const updatedata = await this.model.findOneAndUpdate(
      filter,
      update,
      options
    );
    return updatedata;
  });

  /**
   * @description Insert many documents
   * @param {*} filter, update, options
   * @returns
   */
  insertManyDocuments = MongoHandler(async (data, option) => {
    const saveddata = await this.model.insertMany(data);
    return saveddata;
  });

  /**
   * @description Insert many documents
   * @param {*} filter, update, options
   * @returns
   */
  findOneAndReplaceDocument = MongoHandler(async (data, option) => {
    const saveddata = await this.model.findOneAndReplace(data);
    return saveddata;
  });

  /**
   *@description Delete Document
   * @param {*} filter, update, options
   * @returns
   */
  deleteDocument = MongoHandler(async (filter, update, options) => {
    const deleteData = await this.model.findOneAndUpdate(
      filter,
      update,
      options
    );
    return deleteData;
  });

  /**
   * params query, options= {limit, skip, sortBy, sort, populateOptions, selectFields}
   */
  getAllDocuments = MongoHandler(async (query, options = {}) => {
    const { limit, skip, sortBy, sort, populateOptions, selectFields } =
      options;
    let customQuery;

    customQuery = this.model.find(query);

    if (limit) {
      customQuery.limit(limit);
    }
    if (skip) {
      customQuery.skip(skip);
    }
    if (sortBy && sort) {
      customQuery.sort({ [sortBy]: sort });
    } else if (sort) {
      customQuery.sort(sort);
    }

    let allDocuments;

    if (populateOptions && Array.isArray(populateOptions)) {
      populateOptions.forEach((path) => {
        customQuery.populate(path);
      });
    }
    allDocuments = await customQuery.exec();

    return allDocuments;
  });

  getTotalCount = MongoHandler(async (query, options = {}) => {
    const totalCount = await this.model.countDocuments(query);
    return totalCount;
  });

  /**
   * @description aggregatePipeline = []
   */
  getDataWithAggregate = MongoHandler(async (aggregatePipeline) => {
    const data = await this.model.aggregate(aggregatePipeline);
    return data;
  });
}

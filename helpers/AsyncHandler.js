import {
  BadValueError,
  BaseError,
  DuplicateKeyError,
  ExceedTimeLimitError,
} from "../Error/BaseError.js";

export const AsyncHandler = (func) => {
  return (req, res, next) => {
    return func(req, res, next).catch((err) => next(err));
  };
};

export const MongoHandler = (func) => {
  return (...data) => {
    return func(...data).catch((err) => {
      switch (err.code) {
        case 11000:
          throw new DuplicateKeyError("Duplicate Id Insertion");
        case 11500:
          throw new WriteConflictError("Write conflict occurred");

        case 50:
          throw new ExceedTimeLimitError("Failed due to timelimit exceeded");

        case 2:
          throw new BadValueError("Bad Value, Insert correct values");

        default:
          throw new BaseError(500, "failed", err.message);
      }
    });
  };
};

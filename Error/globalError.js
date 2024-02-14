
// response for errors in production mode
const productionError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.httpCode).json({
      message: err.message,
      errStack: err.stack,
    });
  } else {
    if (err instanceof ReferenceError) {
    }
  }

  return res.status(500).json({
    message: err.message,
  });
};

// response for errors in dev mode
const developmentError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.httpCode).json({
      message: err.message,
      errStack: err.stack,
    });
  }

  return res.status(500).json({
    message: "Something went wrong, try again later.",
    errStack: err.stack,
  });
};

// Global error Handler. Executes when Throw Error is called.
export const globalErrorHandler = (err, req, res, next) => {
  err.httpCode = err.httpCode || 500;
  err.status = err.status || "server error";

  if (process.env.NODE_ENV === "production") {
    return productionError(err, res);
  } else if (process.env.NODE_ENV === "development") {
    return developmentError(err, res);
  }

  return res
    .status(500)
    .json({ error: "Server Error, Please try again later" });
};

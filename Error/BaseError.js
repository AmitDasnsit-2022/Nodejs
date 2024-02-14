// BaseError: Template for creating custom error classes
export class BaseError extends Error {
  constructor(httpCode, status, message) {
    super(message);
    this.httpCode = httpCode;
    this.status = httpCode >= 400 && httpCode < 500 ? "fail" : "error";
    this.isOperational = true; // Indicates whether the error is operational
    Error.captureStackTrace(this, this.constructor);
  }
}

// JWTMalformed: Error class for JWT Malformed errors
class JWTMalformed extends BaseError {
  constructor(httpCode = 401, message = "JWT Malformed") {
    super(httpCode, message);
  }
}

// JWTMalformed: Error class for JWT Malformed errors
export class jwtErrorHandler extends BaseError {
  constructor(httpCode = 401, message = "Jwt error") {
    super(httpCode, message);
  }
}

// UnAuthorized: Error class for unauthorized access
export class UnAuthorized extends BaseError {
  constructor(message = "Unauthorized") {
    super(401, "failed", message);
  }
}

// UnAuthenticated: Error class for unauthenticated access
export class UnAuthenticated extends BaseError {
  constructor(message = "Unauthenticated") {
    super(401, "failed", message);
  }
}

// DuplicateKeyError: Error class for duplicate key violations
export class DuplicateKeyError extends BaseError {
  constructor(message = "Duplicate ID error") {
    super(400, "failed", message);
  }
}

// ExceedTimeLimitError: Error class for operations exceeding time limits
export class ExceedTimeLimitError extends BaseError {
  constructor(message = "Time limit exceeded") {
    super(429, "failed", message);
  }
}

// BadValueError: Error class for invalid or bad input values
export class BadValueError extends BaseError {
  constructor(message = "Bad value") {
    super(400, "failed", message);
  }
}

// WriteConflictError: Error class for write conflicts
export class WriteConflictError extends BaseError {
  constructor(message = "Write conflict") {
    super(400, "failed", message);
  }
}

// Validation Error
export class ValidationError extends BaseError {
  constructor(message = "Validation failed") {
    super(400, "failed", message);
  }
}

// mail extends BaseError
export class mailErrorHandler extends BaseError {
  constructor(message = "E-Mail error") {
    super(400, "failed", message);
  }
}

// Not found NotFound
export class NotFound extends BaseError {
  constructor(message = "Not Found") {
    super(404, "failed", message);
  }
}

// Already exists
export class alreadyExist extends BaseError {
  constructor(message = "Already exists") {
    super(403, "failed", message);
  }
}

class ApiError extends Error {
  constructor(message = "API Error", status = 0, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.details = details;
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;

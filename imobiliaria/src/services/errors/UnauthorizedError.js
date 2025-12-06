import ApiError from "./ApiError";

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", status = 401, details = null) {
    super(message, status, details);
  }
}

export default UnauthorizedError;

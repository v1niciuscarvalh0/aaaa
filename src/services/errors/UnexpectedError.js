import ApiError from "./ApiError";

class UnexpectedError extends ApiError {
  constructor(message = "Unexpected server error", status = 500, details = null) {
    super(message, status, details);
  }
}

export default UnexpectedError;

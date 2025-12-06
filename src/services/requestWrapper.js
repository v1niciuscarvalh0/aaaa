import ApiError from "./errors/ApiError";
import UnauthorizedError from "./errors/UnauthorizedError";
import UnexpectedError from "./errors/UnexpectedError";

export async function requestWrapper(promise) {
  try {
    const response = await promise;
    return handleResponse(response);
  } catch (err) {
    if (err && err.response) {
      const { status, data } = err.response;
      switch (status) {
        case 401:
          throw new UnauthorizedError(data?.message || "Unauthorized", 401, data);
        case 500:
          throw new UnexpectedError(
            data?.message || "Unexpected server error",
            500,
            data
          );
        default:
          throw new ApiError(data?.message || "Request failed", status, data);
      }
    }

    throw new UnexpectedError(err?.message || "Network or unknown error", 0, err);
  }
}

export function handleResponse(response) {
  const { status, data } = response;
  switch (status) {
    case 200:
      return data;
    case 401:
      throw new UnauthorizedError(data?.message || "Unauthorized", 401, data);
    case 500:
      throw new UnexpectedError(data?.message || "Unexpected server error", 500, data);
    default:
      throw new ApiError(data?.message || "Request failed", status, data);
  }
}

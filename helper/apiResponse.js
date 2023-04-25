export const successResponse = (res, statusCode, message, data, count) => {
  res.status(statusCode).json({ message: message, data: data, count: count });
};
export const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message: message });
};
export const validateResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message: message });
};

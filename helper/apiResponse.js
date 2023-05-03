import mongoose from "mongoose";

export const successResponse = (res, statusCode, message, data, count) => {
  res.status(statusCode).json({ message: message, data: data, count: count });
};
export const errorResponse = (res, statusCode, message, err, funName) => {
  console.log(`[ERROR] ${funName} : ${err.message}`);
  var errMsg;
  if (err instanceof mongoose.Error.CastError) {
    errMsg = "Invalid ID provided";
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    errMsg = "Document not found"; // Custom error message for DocumentNotFoundError
  } else if (err instanceof mongoose.Error.ValidationError) {
    errMsg = "Validation failed"; // Custom error message for ValidationError
  } else {
    errMsg = "Internal server error"; // Re-throw the original error if it's not one of the above types
  }
  res.status(statusCode).json({ message: message, error: errMsg });
};
export const validateResponse = (res, error) => {
  var arrOjb = { message: "error" };
  error.details.map((item) => {
    const { path, message } = item;
    arrOjb = { ...arrOjb, [path]: message };
  });
  res.status(400).json(arrOjb);
};

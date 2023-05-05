import { errorResponse } from "../helper/apiResponse.js";

const ADMIN = "ADMIN";
const SUBADMIN = "SUBADMIN";
const CUSTOMER = "CUSTOMER";
const PHLEBOTOMIST = "PHLEBOTOMIST";
const roleErrorMsg = "You don't have permission to perform this action";

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === ADMIN) {
    next();
  } else {
    return errorResponse(res, 400, roleErrorMsg);
  }
  next();
};
export const isSubAdmin = (req, res, next) => {
  if (req.user && req.user.role === SUBADMIN) {
    next();
  } else {
    return errorResponse(res, 400, roleErrorMsg);
  }
  next();
};
export const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === CUSTOMER) {
    next();
  } else {
    return errorResponse(res, 400, roleErrorMsg);
  }
  next();
};
export const isPhlebotomist = (req, res, next) => {
  if (req.user && req.user.role === PHLEBOTOMIST) {
    next();
  } else {
    return errorResponse(res, 400, roleErrorMsg);
  }
  next();
};

import { allowRole } from "../helper/allowRole.js";
import { validateResponse } from "../helper/apiResponse.js";

const ADMIN = "ADMIN";
const SUBADMIN = "SUBADMIN";
const CUSTOMER = "CUSTOMER";
const PHLEBOTOMIST = "PHLEBOTOMIST";
const errorObj = {
  details: [
    {
      path: "authorization ",
      message: "You don't have permission to perform this action",
    },
  ],
};

// Define middleware function to check user roles
export const authorization = (roles) => {
  return (req, res, next) => {
    const userRoles = req.user.role;
    if (!roles.includes(userRoles)) {
      return validateResponse(res, errorObj);
    } else {
      next();
    }
  };
};

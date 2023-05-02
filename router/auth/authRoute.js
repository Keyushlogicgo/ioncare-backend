import express from "express";
import authController from "../../controller/auth/authController.js";
import authValidate from "../../validator/auth/authValidate.js";
import { tokenValidate } from "../../middleware/tokenValidate.js";
import { roleValidate } from "../../middleware/roleValidate.js";

const route = express.Router();

route.post(
  "/forgot-password",
  authValidate.forgotPassword,
  authController.forgotPassword
);
route.patch(
  "/reset-password/:token?",
  authValidate.resetPassword,
  authController.resetPassword
);
route.patch(
  "/change-password",
  tokenValidate,
  roleValidate,
  authValidate.changePassword,
  authController.changePassword
);

export default route;

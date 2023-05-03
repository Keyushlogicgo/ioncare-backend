import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import bcrypt from "bcrypt";
import phlebotomistModel from "../../model/phlebotomist/phlebotomistModel.js";
import jwt from "jsonwebtoken";
import { mailTransport } from "../../config/mailTransport.js";
import { sendMail } from "../../helper/sendMail.js";

class authController {
  static forgotPassword = async (req, res) => {
    try {
      const { first_name, last_name } = req.user;

      const userId = "64509b1a01003ba85cbf437b" || req.user.userId;
      const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      const link =
        process.env.SERVER_BASE_URL + "/api/v2/auth/reset-password/" + token;

      const dynamicData = {
        Username: first_name + " " + last_name,
        email: req.body.email,
        link: link,
      };
      sendMail(req.body.email, "Reset Password", dynamicData, "forgot.html");
      return successResponse(res, 200, "reset password mail send successfully");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCart");
    }
  };
  static resetPassword = async (req, res) => {
    try {
      const userId = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY,
        function (err, decoded) {
          if (err) {
            return errorResponse(res, 400, "error", err, "resetPassword");
          } else {
            return decoded.userId;
          }
        }
      );
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const result = await phlebotomistModel.findByIdAndUpdate(userId, {
        $set: { password: hashPassword },
      });
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCart");
    }
  };
  static changePassword = async (req, res) => {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const result = await phlebotomistModel.findByIdAndUpdate(
        req.user.userId,
        {
          $set: { password: hashPassword },
        }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCart");
    }
  };
}
export default authController;

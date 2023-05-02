import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";
import phlebotomistModel from "../../model/phlebotomist/phlebotomistModel.js";
import bcrypt from "bcrypt";

const options = {
  abortEarly: false,
};

class authValidate {
  static forgotPassword = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .label("email")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const user = await phlebotomistModel.findOne({ email: req.body.email });
      if (!user) {
        const errorObj = {
          details: [
            {
              path: "email",
              message: "user with this email dose not exist",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else {
        next();
      }
    }
  };
  static resetPassword = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      password: Joi.string()
        .required()
        .label("password")
        .messages(validateMsg(null, null, "string")),
      confirm_password: Joi.string().valid(Joi.ref("password")).required(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      next();
    }
  };
  static changePassword = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      old_password: Joi.string().required(),
      password: Joi.string().min(8).required().invalid(Joi.ref("old_password")),
      confirm_password: Joi.string().valid(Joi.ref("password")).required(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const userId = "64509b1a01003ba85cbf437b";
      const { password } = await phlebotomistModel
        .findById(userId || req.user.userId)
        .select("password");
      const comparePassword = await bcrypt.compare(
        req.body.old_password,
        password
      );
      if (!comparePassword) {
        const errorObj = {
          details: [
            {
              path: "password",
              message: "old password is wrong",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else {
        next();
      }
    }
  };
}
export default authValidate;

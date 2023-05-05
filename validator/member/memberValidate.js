import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import memberModel from "../../model/member/memberModel.js";
import { inputPattern, validateMsg } from "../../helper/comman.js";
import { genderEnum, relationEnum } from "../../config/enum.js";

const options = {
  abortEarly: false,
};

class memberValidate {
  static createMember = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .label("email")
        .messages(validateMsg(null, null, "string")),
      first_name: Joi.string()
        .required()
        .label("first_name")
        .messages(validateMsg(null, null, "string")),
      last_name: Joi.string()
        .required()
        .label("last_name")
        .messages(validateMsg(null, null, "string")),
      dob: Joi.string()
        .pattern(inputPattern.date)
        .required()
        .label("dob")
        .messages(validateMsg(null, null, "string")),
      age: Joi.number()
        .required()
        .label("age")
        .messages(validateMsg(null, null, "number")),
      phone: Joi.number()
        .required()
        .label("phone")
        .messages(validateMsg(null, null, "number")),
      gender: Joi.string()
        .required()
        .label("gender")
        .valid(...genderEnum)
        .messages(validateMsg(null, null, "string")),
      relations: Joi.string()
        .required()
        .label("relations")
        .valid(...relationEnum)
        .messages(validateMsg(null, null, "string")),
      address: Joi.string()
        .required()
        .label("address")
        .messages(validateMsg(null, null, "string")),
      area: Joi.string()
        .required()
        .label("area")
        .messages(validateMsg(null, null, "string")),
      city: Joi.string()
        .required()
        .label("city")
        .messages(validateMsg(null, null, "string")),
      state: Joi.string()
        .required()
        .label("state")
        .messages(validateMsg(null, null, "string")),
      country: Joi.string()
        .required()
        .label("country")
        .messages(validateMsg(null, null, "string")),
      image: Joi.string()
        .label("image")
        .required()
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await memberModel.findOne({
        email: req.body.email,
        user_id: req.user.userId,
      });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "email",
              message: "this one is already exist",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else {
        next();
      }
    }
  };
  static patchMember = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      email: Joi.string()
        .email()
        .empty()
        .label("email")
        .messages(validateMsg(null, null, "string")),
      first_name: Joi.string()
        .empty()
        .label("first_name")
        .messages(validateMsg(null, null, "string")),
      last_name: Joi.string()
        .empty()
        .label("last_name")
        .messages(validateMsg(null, null, "string")),
      dob: Joi.string()
        .pattern(inputPattern.date)
        .empty()
        .label("dob")
        .messages(validateMsg(null, null, "string")),
      age: Joi.number()
        .empty()
        .label("age")
        .messages(validateMsg(null, null, "number")),
      phone: Joi.number()
        .empty()
        .label("phone")
        .messages(validateMsg(null, null, "number")),
      gender: Joi.string()
        .empty()
        .label("gender")
        .valid(...genderEnum)
        .messages(validateMsg(null, null, "string")),
      relations: Joi.string()
        .empty()
        .label("relations")
        .valid(...relationEnum)
        .messages(validateMsg(null, null, "string")),
      address: Joi.string()
        .empty()
        .label("address")
        .messages(validateMsg(null, null, "string")),
      area: Joi.string()
        .empty()
        .label("area")
        .messages(validateMsg(null, null, "string")),
      city: Joi.string()
        .empty()
        .label("city")
        .messages(validateMsg(null, null, "string")),
      state: Joi.string()
        .empty()
        .label("state")
        .messages(validateMsg(null, null, "string")),
      country: Joi.string()
        .empty()
        .label("country")
        .messages(validateMsg(null, null, "string")),
      image: Joi.string()
        .label("image")
        .empty()
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await memberModel.findOne({
        email: req.body.email,
        user_id: req.user.userId,
      });
      if (result) {
        if (JSON.stringify(result._id) !== JSON.stringify(req.params.id)) {
          const errorObj = {
            details: [
              {
                path: "email",
                message: "this one is already exist",
              },
            ],
          };
          return validateResponse(res, errorObj);
        } else {
          next();
        }
      } else {
        next();
      }
    }
  };
}
export default memberValidate;

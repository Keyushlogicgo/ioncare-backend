import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class ratingValidate {
  static createRating = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      rating: Joi.number()
        .required()
        .label("rating")
        .min(0)
        .max(5)
        .messages(validateMsg(0, 5, "number")),
      message: Joi.string()
        .required()
        .label("message")
        .messages(validateMsg(null, null, "string")),
      ref_id: Joi.string()
        .required()
        .label("ref_id")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      next();
    }
  };
  static patchRating = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      rating: Joi.number()
        .empty()
        .label("rating")
        .min(0)
        .max(5)
        .messages(validateMsg(0, 5, "number")),
      message: Joi.string()
        .empty()
        .label("message")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      next();
    }
  };
}
export default ratingValidate;

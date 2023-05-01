import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class remarkValidate {
  static createRemark = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      ref_id: Joi.string()
        .required()
        .label("ref_id")
        .messages(validateMsg(null, null, "string")),
      message: Joi.string()
        .required()
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
  static patchRemark = async (req, res, next) => {
    const validateSchema = Joi.object().keys({  
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
export default remarkValidate;

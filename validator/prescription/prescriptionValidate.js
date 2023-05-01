import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class prescriptionValidate {
  static createPrescription = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      user_id: Joi.string()

        .label("user_id")
        .messages(validateMsg(null, null, "string")),
        image: Joi.string()
        .required()
        .label("image")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      next();
    }
  };
  static editPrescription = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      image: Joi.string()
        .empty()
        .label("image ")
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
export default prescriptionValidate;

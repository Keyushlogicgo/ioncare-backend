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
      phone: Joi.number()
        .label("phone")
        .required()
        .messages(validateMsg(null, null, "number")),
      images: Joi.array()
        .required()
        .min(1)
        .label("images")
        .messages(validateMsg(1, null, "array")),
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

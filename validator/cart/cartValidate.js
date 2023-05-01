import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class cartValidate {
  static createCart = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      item: Joi.string()
        .required()
        .label("item")
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
export default cartValidate;

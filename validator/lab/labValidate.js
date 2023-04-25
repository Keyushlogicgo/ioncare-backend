import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";

const options = {
  abortEarly: false,
};

class labValidate {
  static createLab = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.array().min(1).required(),
      discount: Joi.number(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await labModel.findOne({ title: req.body.title });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "title",
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
  static patchLab = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().empty(),
      price: Joi.number().empty(),
      category: Joi.array().min(1).empty(),
      discount: Joi.number().max(100),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await labModel.findOne({ title: req.body.title });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "title",
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
}
export default labValidate;

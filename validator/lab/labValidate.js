import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class labValidate {
  static createLab = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string()
        .required()
        .label("title")
        .messages(validateMsg(null, null, "string")),

      category: Joi.array()
        .min(1)
        .required()
        .label("category")
        .messages(validateMsg(1, null, "array")),
      discount: Joi.number()
        .max(100)
        .label("discount")
        .messages(validateMsg(null, 100, "number")),
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
      title: Joi.string()
        .empty()
        .label("title")
        .messages(validateMsg(null, null, "string")),

      category: Joi.array()
        .min(1)
        .empty()
        .label("category")
        .messages(validateMsg(null, null, "array")),
      discount: Joi.number()
        .max(100)
        .label("discount")
        .messages(validateMsg(0, 100, "number")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await labModel.findOne({ title: req.body.title });
      if (result) {
        if (JSON.stringify(result._id) !== JSON.stringify(req.params.id)) {
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
      } else {
        next();
      }
    }
  };
}
export default labValidate;

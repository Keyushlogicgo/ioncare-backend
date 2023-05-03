import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import packageModel from "../../model/package/packageModel.js";
import { inputPattern, validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class packageValidate {
  static createPackage = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string()
        .required()
        .label("title")
        .messages(validateMsg(null, null, "string")),
      description: Joi.string()
        .label("description")
        .messages(validateMsg(null, null, "string")),
      image: Joi.string()
        .required()
        .label("image")
        .messages(validateMsg(null, null, "string")),
      background: Joi.string()
        .label("background")
        .pattern(inputPattern.color)
        .messages(validateMsg(null, null, "array")),
      note: Joi.array()
        .label("note")
        .messages(validateMsg(null, null, "array")),
      test: Joi.array()
        .min(1)
        .required()
        .label("test")
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
      const result = await packageModel.findOne({ title: req.body.title });
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
  static patchPackage = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string()
        .empty()
        .label("title")
        .messages(validateMsg(null, null, "string")),
      description: Joi.string()
        .label("description")
        .messages(validateMsg(null, null, "string")),
      test: Joi.array()
        .min(1)
        .empty()
        .label("test")
        .messages(validateMsg(null, null, "array")),
      image: Joi.string()
        .empty()
        .label("image")
        .messages(validateMsg(null, null, "string")),
      background: Joi.string()
        .label("background")
        .pattern(inputPattern.color)
        .messages(validateMsg(null, null, "array")),
      note: Joi.array()
        .label("note")
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
      const result = await packageModel.findOne({ title: req.body.title });

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
export default packageValidate;

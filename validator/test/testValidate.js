import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import testModel from "../../model/test/testModel.js";
import { validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class testValidate {
  static createTest = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string()
        .required()
        .label("title")
        .messages(validateMsg(null, null, "string")),
      price: Joi.number()
        .required()
        .label("price")
        .messages(validateMsg(null, null, "number")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await testModel.findOne({ title: req.body.title });
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
  static patchTest = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string()
        .empty()
        .label("title")
        .messages(validateMsg(null, null, "string")),
      price: Joi.number()
        .empty()
        .label("price")
        .messages(validateMsg(null, null, "number")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await testModel.findOne({ title: req.body.title });
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
export default testValidate;

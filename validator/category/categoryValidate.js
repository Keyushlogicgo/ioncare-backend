import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import categoryModel from "../../model/category/categoryModel.js";

const options = {
  abortEarly: false,
};

class categoryValidate {
  static createCategory = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().required(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await categoryModel.findOne({ title: req.body.title });
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
  static patchCategory = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      title: Joi.string().empty(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await categoryModel.findOne({ title: req.body.title });
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
export default categoryValidate;

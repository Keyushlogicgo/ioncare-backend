import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";
import labAppoinmentModel from "../../model/lab/labAppoinmentModel.js";
import { appoinmentEnum } from "../../config/enum.js";

const options = {
  abortEarly: false,
};

class labValidate {
  static createLabAppoinment = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      date: Joi.date().timestamp().required(),
      test_id: Joi.string().required(),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await labAppoinmentModel.findOne({ date: req.body.date, test_id: req.body.test_id });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "date",
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
  static updateAppoinmentStatus = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      status: Joi.string().valid(...appoinmentEnum),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      next();
    }
  };
}
export default labValidate;

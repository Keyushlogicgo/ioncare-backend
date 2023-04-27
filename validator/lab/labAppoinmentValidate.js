import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";
import labAppoinmentModel from "../../model/lab/labAppoinmentModel.js";
import { appoinmentEnum } from "../../config/enum.js";
import { inputPattern, validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class labValidate {
  static createLabAppoinment = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      start_time: Joi.string()
        .pattern(inputPattern.time)
        .required()
        .label("start_time")
        .messages(validateMsg(null, null, "string")),
      end_time: Joi.string()
        .pattern(inputPattern.time)
        .required()
        .label("end_time")
        .messages(validateMsg(null, null, "string")),
      date: Joi.string()
        .pattern(inputPattern.date)
        .required()
        .label("date")
        .messages(validateMsg(null, null, "string")),
      test_id: Joi.string()
        .required()
        .label("test_id")
        .messages(validateMsg(null, null, "string")),
      payment_id: Joi.string()
        .required()
        .label("payment_id")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const { start_time, end_time, date, test_id } = req.body;
      const result = await labAppoinmentModel.findOne({
        start_time: start_time,
        test_id: test_id,
        date: date,
        end_time: end_time,
      });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "date",
              message: "sorry, Appoinment is already taken",
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
      status: Joi.string()
        .valid(...appoinmentEnum)
        .label("status")
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
export default labValidate;

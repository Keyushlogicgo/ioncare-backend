import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import packageModel from "../../model/package/packageModel.js";
import appoinmentModel from "../../model/appoinment/appoinmentModel.js";
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
      package_id: Joi.string()
        .required()
        .label("package_id")
        .messages(validateMsg(null, null, "string")),
      member_id: Joi.string()
        .required()
        .label("member_id")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const { start_time, end_time, date, package_id } = req.body;
      const result = await appoinmentModel.findOne({
        start_time: start_time,
        package_id: package_id,
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

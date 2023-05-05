import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import packageAppointmentModel from "../../model/packageAppointment/packageAppointmentModel.js";
import { statusEnum } from "../../config/enum.js";
import { inputPattern, validateMsg } from "../../helper/comman.js";

const options = {
  abortEarly: false,
};

class packageAppointmentValidate {
  static createPackageAppointment = async (req, res, next) => {
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
      const result = await packageAppointmentModel.findOne({
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
              message: "sorry, Appointment is already taken",
            },
          ],
        };
        return validateResponse(res, errorObj);
      } else {
        next();
      }
    }
  };
  static updatePackageAppointmentStatus = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      status: Joi.string()
        .valid(...statusEnum)
        .empty()
        .label("status")
        .messages(validateMsg(null, null, "string")),
      phlebotomist_id: Joi.string()
        .empty()
        .label("phlebotomist_id")
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
export default packageAppointmentValidate;

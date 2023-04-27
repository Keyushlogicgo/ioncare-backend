import Joi from "joi";
import { validateResponse } from "../../helper/apiResponse.js";
import { validateMsg } from "../../helper/comman.js";
import { appoinmentEnum } from "../../config/enum.js";
import paymentModel from "../../model/payment/paymentModel.js";

const options = {
  abortEarly: false,
};

class paymentValidate {
  static createPayment = async (req, res, next) => {
    const validateSchema = Joi.object().keys({
      order_id: Joi.string()
        .required()
        .label("order_id")
        .messages(validateMsg(null, null, "string")),
      amount: Joi.number()
        .empty()
        .label("amount")
        .messages(validateMsg(null, null, "number")),
      status: Joi.string()
        .valid(...appoinmentEnum)
        .label("status")
        .messages(validateMsg(null, null, "string")),
      payment_method: Joi.string()
        .empty()
        .label("payment_method")
        .messages(validateMsg(null, null, "string")),
    });
    const { error } = validateSchema.validate(req.body, options);
    if (error) {
      return validateResponse(res, error);
    } else {
      const result = await paymentModel.findOne({
        order_id: req.body.order_id,
      });
      if (result) {
        const errorObj = {
          details: [
            {
              path: "order",
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
export default paymentValidate;

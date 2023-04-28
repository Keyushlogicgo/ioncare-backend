import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import orderModel from "../../model/order/orderModel.js";
import paymentModel from "../../model/payment/paymentModel.js";

class paymentController {
  static createPayment = async (req, res) => {
    try {
      const doc = new paymentModel(req.body);
      console.log(doc);
      const result = await doc.save();
      await orderModel.findByIdAndUpdate(result.order_id, {
        $set: { status: result.status },
      });
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editLabTest");
    }
  };
  static getPayment = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await paymentModel.findById(id);
      } else {
        result = await paymentModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCategory");
    }
  };
}
export default paymentController;

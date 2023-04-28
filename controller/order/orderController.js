import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import orderModel from "../../model/order/orderModel.js";

class orderController {
  static getOrder = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await orderModel.findById(id);
      } else {
        result = await orderModel
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
export default orderController;

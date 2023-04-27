import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import paymentModel from "../../model/payment/paymentModel.js";

class paymentController {
  static createPayment = async (req, res) => {
    try {
      const doc = new paymentModel(req.body);
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editLabTest");
    }
  };
}
export default paymentController;

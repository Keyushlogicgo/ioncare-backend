import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";

class labTestController {
  static createLabTest = async (req, res) => {
    const { title, price, category, discount } = req.body;
    const selling_price = price * (discount / 100);
    try {
      const doc = new labModel({
        title: title,
        price: price,
        category: category,
        selling_price: selling_price,
        discount: discount,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      var result = [];
      if (id) {
        result = await labModel.findById(id);
      } else {
        result = await labModel.find();
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static editLabTest = async (req, res) => {
    const { id } = req.params;
    const { price, discount } = req.body;

    try {
      if (price !== undefined || discount !== undefined) {
        const data = await labModel.findById(id).select(["price", "discount"]);
        const newPrice = price ? price : data.price;
        const newDiscount = discount ? discount : data.discount;
        const selling_price = newPrice - newPrice * (newDiscount / 100);

        console.log(`selling_price: ${selling_price}`);

        req.body.selling_price = selling_price;
      }
      req.body.updated_at = Date.now();
      const result = await labModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static deleteLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      await labModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}
export default labTestController;

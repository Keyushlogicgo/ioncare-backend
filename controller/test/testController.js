import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import testModel from "../../model/test/testModel.js";
import packageModel from "../../model/package/packageModel.js";

class testController {
  static createTest = async (req, res) => {
    try {
      const doc = new testModel(req.body);
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createTest");
    }
  };
  static getTest = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await testModel.findById(id);
      } else {
        result = await testModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getTest");
    }
  };
  static deleteTest = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await testModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteTest");
    }
  };
  static updateTest = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await testModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (req.body.price) {
        const newData = await packageModel.find({
          test: { $in: [id] },
        });
        for (let i = 0; i < newData.length; i++) {
          const element = newData[i];
          const priceData = await testModel.find({
            _id: { $in: element.test },
          });
          const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);

          const selling_price =
            totalPrice - totalPrice * (element.discount / 100);

          const newResult = await packageModel.findByIdAndUpdate(element._id, {
            $set: { price: totalPrice, selling_price: selling_price },
          });
        }
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "updateTest");
    }
  };
}
export default testController;

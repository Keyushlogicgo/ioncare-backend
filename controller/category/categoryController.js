import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import categoryModel from "../../model/category/categoryModel.js";
import packageModel from "../../model/package/packageModel.js";

class categoryController {
  static createCategory = async (req, res) => {
    try {
      const doc = new categoryModel(req.body);
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createCategory");
    }
  };
  static getCategory = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await categoryModel.findById(id);
      } else {
        result = await categoryModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCategory");
    }
  };
  static deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await categoryModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteCategory");
    }
  };
  static updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await categoryModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (req.body.price) {
        const newData = await packageModel.find({
          category: { $in: [id] },
        });
        for (let i = 0; i < newData.length; i++) {
          const element = newData[i];
          const priceData = await categoryModel.find({
            _id: { $in: element.category },
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
      return errorResponse(res, 400, "error", error, "updateCategory");
    }
  };
}
export default categoryController;

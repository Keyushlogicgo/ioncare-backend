import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import labModel from "../../model/lab/labModel.js";
import { paginationFun } from "../../helper/comman.js";
import categoryModel from "../../model/category/categoryModel.js";

class labTestController {
  static createLabTest = async (req, res) => {
    const { title, category, discount } = req.body;
    try {
      const priceData = await categoryModel.find({
        _id: { $in: category },
      });
      const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
      const selling_price = totalPrice - totalPrice * (discount / 100);

      const doc = new labModel({
        title: title,
        price: totalPrice,
        category: category,
        selling_price: selling_price,
        discount: discount,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createLabTest");
    }
  };
  static getLabTest = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      const result = await labModel.aggregate([
        filter,
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: "$categoryInfo",
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            price: { $first: "$price" },
            selling_price: { $first: "$selling_price" },
            discount: { $first: "$discount" },
            category: { $push: "$categoryInfo.title" },
          },
        },
        {
          $limit: pagination.limit,
        },
        {
          $skip: pagination.skip,
        },
      ]);
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getLabTest");
    }
  };
  static editLabTest = async (req, res) => {
    const { id } = req.params;
    const { discount, category } = req.body;

    try {
      if (category || discount) {
        const data = await labModel
          .findById(id)
          .select(["category", "discount"]);

        const newDiscount = discount !== undefined ? discount : data.discount;

        const newcategory = category !== undefined ? category : data.category;
        const priceData = await categoryModel.find({
          _id: { $in: newcategory },
        });
        const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
        const selling_price = totalPrice - totalPrice * (newDiscount / 100);
        req.body.discount = newDiscount;
        req.body.price = totalPrice;
        req.body.selling_price = selling_price;
      }

      const result = await labModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editLabTest");
    }
  };
  static deleteLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      await labModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteLabTest");
    }
  };
}
export default labTestController;

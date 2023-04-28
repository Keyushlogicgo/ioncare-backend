import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import packageModel from "../../model/package/packageModel.js";
import { paginationFun } from "../../helper/comman.js";
import categoryModel from "../../model/category/categoryModel.js";

class packageController {
  static createLabPackage = async (req, res) => {
    const { title, category, discount } = req.body;
    try {
      const priceData = await categoryModel.find({
        _id: { $in: category },
      });
      const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
      const selling_price = totalPrice - totalPrice * (discount / 100);

      const doc = new packageModel({
        title: title,
        price: totalPrice,
        category: category,
        selling_price: selling_price,
        discount: discount,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createLabPackage");
    }
  };
  static getLabPackage = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      const result = await packageModel.aggregate([
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
      return errorResponse(res, 400, "error", error, "getLabPackage");
    }
  };
  static editLabPackage = async (req, res) => {
    const { id } = req.params;
    const { discount, category } = req.body;

    try {
      if (category || discount) {
        const data = await packageModel
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

      const result = await packageModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editLabPackage");
    }
  };
  static deleteLabPackage = async (req, res) => {
    const { id } = req.params;
    try {
      await packageModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteLabPackage");
    }
  };
}
export default packageController;

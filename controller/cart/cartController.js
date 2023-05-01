import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import cartModel from "../../model/cart/cardModel.js";

class cartController {
  static createCart = async (req, res) => {
    const { item } = req.body;
    try {
      var result;
      const data = await cartModel.findOne({ user_id: req.user.userId });
      if (data) {
        var doc;
        if (data.items.includes(item)) {
          doc = await cartModel.findOneAndUpdate(
            { user_id: req.user.userId },
            { $pull: { items: item } },
            { new: true }
          );
        } else {
          doc = await cartModel.findOneAndUpdate(
            { user_id: req.user.userId },
            { $push: { items: item } },
            { new: true }
          );
        }
        result = await doc.save();
      } else {
        const doc = new cartModel({
          user_id: req.user.userId,
          items: [item],
        });
        result = await doc.save();
      }
      if (result.items.length === 0) {
        await cartModel.findOneAndDelete({ user_id: req.user.userId });
      }
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createCart");
    }
  };
  static getCart = async (req, res) => {
    try {
      const pagination = paginationFun(req.query);
      const result = await cartModel.aggregate([
        {
          $match: {
            user_id: new mongoose.Types.ObjectId(req.user.userId),
          },
        },
        {
          $lookup: {
            from: "tests",
            localField: "items",
            foreignField: "_id",
            as: "testInfo",
          },
        },
        {
          $unwind: "$testInfo",
        },
        {
          $group: {
            _id: "$_id",
            items: { $push: { title: "$testInfo.title", price: "$testInfo.price" } },
          },
        },
        {
          $limit: pagination.limit,
        },
        {
          $skip: pagination.skip,
        },
      ]);
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCart");
    }
  };
}
export default cartController;

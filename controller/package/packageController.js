import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import packageModel from "../../model/package/packageModel.js";
import { paginationFun } from "../../helper/comman.js";
import testModel from "../../model/test/testModel.js";
import { handleFile, handleFileRemove } from "../../helper/fileUploading.js";

class packageController {
  static createLabPackage = async (req, res) => {
    const { title, test, discount, image, background, note, description } =
      req.body;
    try {
      const priceData = await testModel.find({
        _id: { $in: test },
      });
      const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
      const selling_price = totalPrice - totalPrice * (discount / 100);
      const imageUrl = await handleFile(image, "package");
      const doc = new packageModel({
        title: title,
        price: totalPrice,
        test: test,
        selling_price: selling_price,
        discount: discount,
        description: description,
        background: background,
        note: note,
        image: imageUrl,
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
            from: "tests",
            localField: "test",
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
            title: { $first: "$title" },
            description: { $first: "$description" },
            background: { $first: "$background" },
            price: { $first: "$price" },
            selling_price: { $first: "$selling_price" },
            discount: { $first: "$discount" },
            image: { $first: "$image" },
            note: { $first: "$note" },
            test: { $push: "$testInfo.title" },
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
    const { discount, test, image } = req.body;

    try {
      if (test || discount || discount === 0) {
        const data = await packageModel
          .findById(id)
          .select(["test", "discount"]);

        const newDiscount = discount !== undefined ? discount : data.discount;

        const newtest = test !== undefined ? test : data.test;
        const priceData = await testModel.find({
          _id: { $in: newtest },
        });
        const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
        const selling_price = totalPrice - totalPrice * (newDiscount / 100);
        req.body.discount = newDiscount;
        req.body.price = totalPrice;
        req.body.selling_price = selling_price;
      }
      if (image) {
        const packageData = await packageModel.findById(id).select("image");
        const imageUrl = await handleFile(image, "package");
        handleFileRemove(packageData.image, "package");
        req.body.image = imageUrl;
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
      const { image } = await packageModel.findById(id);
      handleFileRemove(image, "package");
      await packageModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteLabPackage");
    }
  };
}
export default packageController;

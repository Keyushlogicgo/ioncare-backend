import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import labAppoinmentModel from "../../model/lab/labAppoinmentModel.js";
import labModel from "../../model/lab/labModel.js";
import {
  getFullDate,
  getFullTime,
  paginationFun,
} from "../../helper/comman.js";

class labTestAppoinmentController {
  static createLabTestAppoinment = async (req, res) => {
    const { start_time, end_time, test_id, payment_id, date } = req.body;
    try {
      const { price } = await labModel.findById(test_id).select("price");
      const doc = new labAppoinmentModel({
        start_time: start_time,
        end_time: end_time,
        test_id: test_id,
        payment_id: payment_id,
        price: price,
        date: date,
        user_id: req.user.userId,
      });
      const result = await doc.save();

      return successResponse(res, 201, "success", result);
    } catch (error) {
      console.log("error", error);
      return errorResponse(res, 400, "error", error, "createLabTestAppoinment");
    }
  };
  static getLabTestAppoinment = async (req, res) => {
    const { id } = req.params;
    const { test, user, date, status } = req.query;
    const pagination = paginationFun(req.query);
    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      if (test) {
        filter.$match = {
          ...filter.$match,
          test_id: new mongoose.Types.ObjectId(test),
        };
      }
      if (user) {
        filter.$match = {
          ...filter.$match,
          user_id: new mongoose.Types.ObjectId(user),
        };
      }
      if (date) {
        filter.$match = { ...filter.$match, date: date };
      }
      if (status) {
        filter.$match = { ...filter.$match, status: status };
      }
      const result = await labAppoinmentModel.aggregate([
        filter,
        {
          $lookup: {
            from: "labtests",
            localField: "test_id",
            foreignField: "_id",
            as: "labtestInfo",
          },
        },
        {
          $unwind: "$labtestInfo",
        },
        {
          $lookup: {
            from: "payments",
            localField: "payment_id",
            foreignField: "_id",
            as: "paymentInfo",
          },
        },
        {
          $unwind: "$paymentInfo",
        },
        {
          $group: {
            _id: "$_id",
            test_title: { $first: "$labtestInfo.title" },
            test_id: { $first: "$labtestInfo._id" },
            price: { $first: "$price" },
            status: { $first: "$status" },
            payment_status: { $first: "$paymentInfo.status" },
            payment_id: { $first: "$paymentInfo.order_id" },
            start_time: { $first: "$start_time" },
            end_time: { $first: "$end_time" },
            date: { $first: "$date" },
            create_at: { $first: "$create_at" },
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
      console.log("error", error);
      return errorResponse(res, 400, "error", error, "getLabTestAppoinment");
    }
  };
  static deleteLabAppoinmentTest = async (req, res) => {
    const { id } = req.params;
    try {
      await labAppoinmentModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteLabAppoinmentTest");
    }
  };
  static updateAppoinmentStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await labAppoinmentModel.findByIdAndUpdate(
        id,
        {
          $set: { status: req.body.status, updated_at: Date.now() },
        },
        { new: true }
      );

      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "updateAppoinmentStatus");
    }
  };
}
export default labTestAppoinmentController;

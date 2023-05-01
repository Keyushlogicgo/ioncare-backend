import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import testAppoinmentModel from "../../model/testAppoinment/testAppoinmentModel.js";
import testModel from "../../model/test/testModel.js";
import { paginationFun } from "../../helper/comman.js";
import orderModel from "../../model/order/orderModel.js";

class testAppoinmentController {
  static createtestAppoinment = async (req, res) => {
    const { start_time, end_time, test_id, date, member_id } = req.body;

    try {
      const priceData = await testModel.find({
        _id: { $in: test_id },
      });
      const totalPrice = priceData.reduce((sum, obj) => sum + obj.price, 0);
      const doc = new testAppoinmentModel({
        start_time: start_time,
        end_time: end_time,
        tests: test_id,
        date: date,
        user_id: req.user.userId,
        member_id: member_id,
      });
      const result = await doc.save();
      const orderDoc = new orderModel({
        appointment_id: result._id,
        user_id: req.user.userId,
        amount: totalPrice,
      });
      await orderDoc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createtestAppoinment");
    }
  };
  static gettestAppoinment = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    const { test, user, date, status, member } = req.query;
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
      if (member) {
        filter.$match = {
          ...filter.$match,
          member_id: new mongoose.Types.ObjectId(member),
        };
      }
      if (date) {
        filter.$match = { ...filter.$match, date: date };
      }
      if (status) {
        filter.$match = { ...filter.$match, status: status };
      }
      const result = await testAppoinmentModel.aggregate([
        filter,
        {
          $lookup: {
            from: "tests",
            localField: "tests",
            foreignField: "_id",
            as: "testInfo",
          },
        },
        {
          $unwind: "$testInfo",
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "appointment_id",
            as: "orderInfo",
          },
        },
        {
          $unwind: "$orderInfo",
        },
        {
          $lookup: {
            from: "members",
            localField: "member_id",
            foreignField: "_id",
            as: "memberInfo",
          },
        },
        {
          $unwind: "$memberInfo",
        },
        {
          $group: {
            _id: "$_id",
            user_id: { $first: "$user_id" },
            order_id: { $first: "$orderInfo._id" },
            payment_status: { $first: "$orderInfo.status" },
            price: { $first: "$orderInfo.amount" },
            status: { $first: "$status" },
            start_time: { $first: "$start_time" },
            end_time: { $first: "$end_time" },
            date: { $first: "$date" },
            member: {
              $first: {
                first_name: "$memberInfo.first_name",
                last_name: "$memberInfo.last_name",
                email: "$memberInfo.email",
                phone: "$memberInfo.phone",
              },
            },
            tests: {
              $push: "$testInfo.title",
            },
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
      return errorResponse(res, 400, "error", error, "gettestAppoinment");
    }
  };
  static deletetestAppoinment = async (req, res) => {
    const { id } = req.params;
    try {
      await testAppoinmentModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deletetestAppoinment");
    }
  };
  static updatetestAppoinmentStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await testAppoinmentModel.findByIdAndUpdate(
        id,
        {
          $set: { status: req.body.status },
        },
        { new: true }
      );

      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(
        res,
        400,
        "error",
        error,
        "updatetestAppoinmentStatus"
      );
    }
  };
}
export default testAppoinmentController;

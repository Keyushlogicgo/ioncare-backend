import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import packageAppointmentModel from "../../model/packageAppointment/packageAppointmentModel.js";
import packageModel from "../../model/package/packageModel.js";
import { paginationFun } from "../../helper/comman.js";
import orderModel from "../../model/order/orderModel.js";

class packageAppointmentController {
  static createPackageAppointment = async (req, res) => {
    const { start_time, end_time, package_id, date, member_id } = req.body;

    try {
      const { selling_price } = await packageModel
        .findById(package_id)
        .select("selling_price");

      const doc = new packageAppointmentModel({
        start_time: start_time,
        end_time: end_time,
        package_id: package_id,
        date: date,
        user_id: req.user.userId,
        member_id: member_id,
      });
      const result = await doc.save();
      const orderDoc = new orderModel({
        appointment_id: result._id,
        user_id: req.user.userId,
        amount: selling_price,
      });
      await orderDoc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(
        res,
        400,
        "error",
        error,
        "createPackageAppointment"
      );
    }
  };
  static getPackageAppointment = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    const {
      test,
      user,
      date,
      status,
      member,
      phlebotomist: phlebotomies,
    } = req.query;
    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      if (test) {
        filter.$match = {
          ...filter.$match,
          package_id: new mongoose.Types.ObjectId(test),
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
      if (phlebotomies) {
        filter.$match = {
          ...filter.$match,
          phlebotomist_id: new mongoose.Types.ObjectId(phlebotomies),
        };
      }
      if (date) {
        filter.$match = { ...filter.$match, date: date };
      }
      if (status) {
        filter.$match = { ...filter.$match, status: status };
      }
      const result = await packageAppointmentModel.aggregate([
        filter,
        {
          $lookup: {
            from: "packages",
            localField: "package_id",
            foreignField: "_id",
            as: "labtestInfo",
          },
        },
        {
          $unwind: "$labtestInfo",
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
            test_title: { $first: "$labtestInfo.title" },
            member: {
              $first: {
                first_name: "$memberInfo.first_name",
                last_name: "$memberInfo.last_name",
                email: "$memberInfo.email",
                phone: "$memberInfo.phone",
              },
            },
            package_id: { $first: "$labtestInfo._id" },
            user_id: { $first: "$user_id" },
            order_id: { $first: "$orderInfo._id" },
            payment_status: { $first: "$orderInfo.status" },
            price: { $first: "$orderInfo.amount" },
            status: { $first: "$status" },
            start_time: { $first: "$start_time" },
            end_time: { $first: "$end_time" },
            date: { $first: "$date" },
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
      return errorResponse(res, 400, "error", error, "getPackageAppointment");
    }
  };
  static deletePackageAppointment = async (req, res) => {
    const { id } = req.params;
    try {
      await packageAppointmentModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(
        res,
        400,
        "error",
        error,
        "deletePackageAppointment"
      );
    }
  };
  static updatePackageAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await packageAppointmentModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
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
        "updatePackageAppointmentStatus"
      );
    }
  };
}
export default packageAppointmentController;

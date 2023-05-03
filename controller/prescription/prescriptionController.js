import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import {
  handleFile,
  handleFileRemove,
  handleMultiFile,
} from "../../helper/fileUploading.js";
import prescriptionModel from "../../model/prescription/prescriptionModel.js";

class prescriptionController {
  static createPrescription = async (req, res) => {
    const { images, phone } = req.body;
    try {
      const doc = new prescriptionModel({
        user_id: req.user.userId,
        images: images,
        phone: phone,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createPrescription");
    }
  };
  static getPrescription = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    const { user } = req.query;
    try {
      var filter = { $match: {} };
      if (id) {
        filter.$match = { _id: new mongoose.Types.ObjectId(id) };
      }
      if (user) {
        filter.$match = { user_id: new mongoose.Types.ObjectId(user) };
      }
      const result = await prescriptionModel.aggregate([
        filter,
        {
          $lookup: {
            from: "prescriptionimages",
            localField: "images",
            foreignField: "_id",
            as: "imageInfo",
          },
        },
        {
          $unwind: "$imageInfo",
        },

        {
          $group: {
            _id: "$_id",
            phone: {
              $first: "$phone",
            },
            image: {
              $push: "$imageInfo.image",
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
      return errorResponse(res, 400, "error", error, "getLabPackage");
    }
  };

  static deletePrescription = async (req, res) => {
    const { id } = req.params;
    try {
      const { image } = await prescriptionModel.findById(id).select("image");
      handleFileRemove(image, "prescription");
      const result = await prescriptionModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editPrescription");
    }
  };
}
export default prescriptionController;

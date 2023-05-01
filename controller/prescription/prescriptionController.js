import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import { handleFile, handleFileRemove } from "../../helper/fileUploading.js";
import prescriptionModel from "../../model/prescription/prescriptionModel.js";

class prescriptionController {
  static createPrescription = async (req, res) => {
    const { image } = req.body;
    try {
      const imageUrl = await handleFile(image, "prescription");
      const doc = new prescriptionModel({
        user_id: req.user.userId,
        image: imageUrl,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createPrescription");
    }
  };
  static getPrescription = async (req, res) => {
    const { id } = req.params;
    const { user } = req.query;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await prescriptionModel.findById(id);
      } else if (user) {
        result = await prescriptionModel
          .find({ user_id: user })
          .skip(pagination.skip)
          .limit(pagination.limit);
      } else {
        result = await prescriptionModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCategory");
    }
  };
  static editPrescription = async (req, res) => {
    const { id } = req.params;
    try {
      const imageData = await prescriptionModel.findById(id).select("image");
      handleFileRemove(imageData.image, "prescription");
      const imageUrl = await handleFile(req.body.image, "prescription");

      const result = await prescriptionModel.findByIdAndUpdate(
        id,
        {
          $set: { image: imageUrl },
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editPrescription");
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

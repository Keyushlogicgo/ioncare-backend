import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import { handleFile, handleFileRemove } from "../../helper/fileUploading.js";
import prescriptionImageModel from "../../model/prescriptionImage/prescriptionImageModel.js";

class prescriptionImageController {
  static createPrescriptionImage = async (req, res) => {
    const { image } = req.body;
    try {
      const imageUrl = await handleFile(image, "prescription");
      const doc = new prescriptionImageModel({
        user_id: req.user.userId,
        image: imageUrl,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createPrescriptionImage");
    }
  };
  static getPrescriptionImage = async (req, res) => {
    const { id } = req.params;
    const { user } = req.query;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await prescriptionImageModel.findById(id);
      } else if (user) {
        result = await prescriptionImageModel
          .find({ user_id: user })
          .skip(pagination.skip)
          .limit(pagination.limit);
      } else {
        result = await prescriptionImageModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getPrescriptionImage");
    }
  };

  static deletePrescriptionImage = async (req, res) => {
    const { id } = req.params;
    try {
      const { image } = await prescriptionImageModel
        .findById(id)
        .select("image");
      handleFileRemove(image, "prescription");
      const result = await prescriptionImageModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deletePrescriptionImage");
    }
  };
}
export default prescriptionImageController;

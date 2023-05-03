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
    const { image, phone } = req.body;
    try {
      const imageUrl = await handleMultiFile(image, "prescription");
      const doc = new prescriptionModel({
        user_id: req.user.userId,
        image: imageUrl,
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
    const { user } = req.query;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await prescriptionModel.findById(id);
      } else if (user) {
        const userData = await prescriptionModel
          .find({ user_id: user })
          .skip(pagination.skip)
          .limit(pagination.limit)
          .select(["user_id", "image"]);

        if (userData.length !== 0) {
          result = userData?.reduce((accumulator, currentObject) => {
            console.log("accumulator.image", accumulator.image);
            accumulator.image.push(...currentObject.image);
            return accumulator;
          });
        } else {
          result = userData;
        }
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

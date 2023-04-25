import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import labAppoinmentModel from "../../model/lab/labAppoinmentModel.js";

class labTestAppoinmentController {
  static createLabTestAppoinment = async (req, res) => {
    const { date, test_id } = req.body;
    try {
      const doc = new labAppoinmentModel({
        date: date,
        test_id: test_id,
        user_id: req.user.userId,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      console.log("error", error)
      return errorResponse(res, 400, "error");
    }
  };
  static getLabTestAppoinment = async (req, res) => {
    const { id } = req.params;
    try {
      var result = [];
      if (id) {
        result = await labAppoinmentModel.findById(id);
      } else {
        result = await labAppoinmentModel.find();
      }
      return successResponse(res, 200, "success", result);
    } catch (error) {
      console.log("error", error)
      return errorResponse(res, 400, "error");
    }
  };
  static deleteLabAppoinmentTest = async (req, res) => {
    const { id } = req.params;
    try {
      await labAppoinmentModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static updateAppoinmentStatus = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await labAppoinmentModel.findByIdAndUpdate(
        id,
        {
          $set: { stauts: req.body.status, updated_at: Date.now() },
        },
        { new: true }
      );
      
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}
export default labTestAppoinmentController;

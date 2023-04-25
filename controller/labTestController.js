import { errorResponse, successResponse } from "../helper/apiResponse.js";

class labTestController {
  static createLabTest = async (req, res) => {
    const { title } = req.body;
    try {
      return successResponse(res, 201, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static getLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static editLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
  static deleteLabTest = async (req, res) => {
    const { id } = req.params;
    try {
      return successResponse(res, 200, "success");
    } catch (error) {
      return errorResponse(res, 400, "error");
    }
  };
}
export default labTestController;

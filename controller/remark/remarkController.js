import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import remarkModel from "../../model/remark/remarkModel.js";

class remarkController {
  static createRemark = async (req, res) => {
    const { ref_id, message } = req.body;
    try {
      const doc = new remarkModel({
        ref_id: ref_id,
        message: message,
        written_by: req.user.userId,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createRemark");
    }
  };
  static getRemark = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await remarkModel
          .find({ ref_id: id })
          .skip(pagination.skip)
          .limit(pagination.limit);
      } else {
        result = await remarkModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getCategory");
    }
  };
  static editRemark = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await remarkModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editRemark");
    }
  };
  static deleteRemark = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await remarkModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteRemark");
    }
  };
}
export default remarkController;

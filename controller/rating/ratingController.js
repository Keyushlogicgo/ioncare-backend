import { errorResponse, successResponse } from "../../helper/apiResponse.js";
import { paginationFun } from "../../helper/comman.js";
import ratingModel from "../../model/rating/ratingModel.js";

class ratingController {
  static createRating = async (req, res) => {
    const { rating, message, ref_id } = req.body;
    try {
      const doc = new ratingModel({
        rating: rating,
        message: message,
        written_by: req.user.userId,
        ref_id: ref_id,
      });
      const result = await doc.save();
      return successResponse(res, 201, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "createRating");
    }
  };
  static getRating = async (req, res) => {
    const { id } = req.params;
    const pagination = paginationFun(req.query);
    try {
      var result = [];
      if (id) {
        result = await ratingModel
          .find({ ref_id: id })
          .skip(pagination.skip)
          .limit(pagination.limit);
      } else {
        result = await ratingModel
          .find()
          .skip(pagination.skip)
          .limit(pagination.limit);1
      }
      return successResponse(res, 200, "success", result, result.length);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "getRating");
    }
  };
  static editRating = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ratingModel.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "editRating");
    }
  };
  static deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ratingModel.findByIdAndDelete(id);
      return successResponse(res, 200, "success", result);
    } catch (error) {
      return errorResponse(res, 400, "error", error, "deleteRating");
    }
  };
}
export default ratingController;

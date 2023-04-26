import { errorResponse, successResponse } from "../../helper/apiResponse.js"
import { paginationFun } from "../../helper/comman.js";
import categoryModel from "../../model/category/categoryModel.js"


class categoryController {
    static createCategory = async (req, res) => {
        try {
            const doc = new categoryModel(req.body);
            const result = await doc.save();
            return successResponse(res, 201, "success", result)
        } catch (error) {
            console.log(error)
            return errorResponse(res, 400, "error", error, "createCategory")
        }
    }
    static getCategory = async (req, res) => {
        const { id } = req.params
        const pagination = paginationFun(req.query)
        try {
            var result = [];
            if (id) {
                result = await categoryModel.findById(id);
            } else {
                result = await categoryModel.find().skip(pagination.skip).limit(pagination.limit);
            }
            return successResponse(res, 200, "success", result, result.length)
        } catch (error) {
            return errorResponse(res, 400, "error", error, "getCategory")
        }
    }
    static deleteCategory = async (req, res) => {
        const { id } = req.params
        try {
            const result = await categoryModel.findByIdAndDelete(id)
            return successResponse(res, 200, "success")
        } catch (error) {
            return errorResponse(res, 400, "error", error, "deleteCategory")
        }
    }
    static updateCategory = async (req, res) => {
        const { id } = req.params
        try {
            const result = await categoryModel.findByIdAndUpdate(
                id,
                {
                    $set: { title: req.body.title, updated_at: Date.now() },
                },
                { new: true }
            );

            return successResponse(res, 200, "success", result)
        } catch (error) {
            return errorResponse(res, 400, "error", error, "updateCategory")
        }
    }
}
export default categoryController
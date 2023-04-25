import { errorResponse, successResponse } from "../../helper/apiResponse.js"
import categoryModel from "../../model/category/categoryModel.js"


class categoryController {
    static createCategory = async (req, res) => {
        try {
            const doc = new labAppoinmentModel(req.body);
            const result = await doc.save();
            return successResponse(res, 201, "success", result)
        } catch (error) {
            return errorResponse(res, 201, "error")
        }
    }
    static getCategory = async (req, res) => {
        const { id } = req.params
        try {
            var result = [];
            if (id) {
                result = await categoryModel.findById(id);
            } else {
                result = await categoryModel.find();
            }
            return successResponse(res, 201, "success", result)
        } catch (error) {
            return errorResponse(res, 201, "error")
        }
    }
    static deleteCategory = async (req, res) => {
        const { id } = req.params
        try {
            await categoryModel.findByIdAndDelete(id)
            return successResponse(res, 201, "success")
        } catch (error) {
            return errorResponse(res, 201, "error")
        }
    }
    static updateCategory = (req, res) => {
        const { id } = req.params
        try {
            const result = ""
            return successResponse(res, 201, "success", result)
        } catch (error) {
            return errorResponse(res, 201, "error")
        }
    }
}
export default categoryController
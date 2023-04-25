import express from "express";
import categoryController from "../../controller/category/categoryController.js";
import categoryValidate from "../../validator/category/categoryValidate.js";

const route = express.Router();

route.post("/", categoryValidate.createCategory, categoryController.createCategory);
route.get("/:id?", categoryController.getCategory);
route.patch("/:id", categoryValidate.patchCategory, categoryController.deleteCategory);
route.delete("/:id", categoryController.updateCategory);

export default route;

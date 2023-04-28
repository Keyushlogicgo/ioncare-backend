import express from "express";
import packageController from "../../controller/package/packageController.js";
import labValidate from "../../validator/lab/labValidate.js";

const route = express.Router();

route.post("/", labValidate.createLab, packageController.createLabPackage);
route.get("/:id?", packageController.getLabPackage);
route.patch("/:id", labValidate.patchLab, packageController.editLabPackage);
route.delete("/:id", packageController.deleteLabPackage);

export default route;

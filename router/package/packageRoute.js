import express from "express";
import packageController from "../../controller/package/packageController.js";
import packageValidate from "../../validator/package/packageValidate.js";

const route = express.Router();

route.post(
  "/",
  packageValidate.createPackage,
  packageController.createLabPackage
);
route.get("/:id?", packageController.getLabPackage);
route.patch(
  "/:id",
  packageValidate.patchPackage,
  packageController.editLabPackage
);
route.delete("/:id", packageController.deleteLabPackage);

export default route;

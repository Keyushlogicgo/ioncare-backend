import express from "express";
import packageAppoinmentController from "../../controller/packageAppoinment/packageAppoinmentController.js";
import packageAppoinmentValidate from "../../validator/packageAppoinment/packageAppoinmentValidate.js";

const route = express.Router();

route.post(
  "/",
  packageAppoinmentValidate.createPackageAppoinment,
  packageAppoinmentController.createPackageAppoinment
);
route.get("/:id?", packageAppoinmentController.getPackageAppoinment);
route.delete("/:id", packageAppoinmentController.deletePackageAppoinment);
route.patch(
  "/:id",
  packageAppoinmentValidate.updatePackageAppoinmentStatus,
  packageAppoinmentController.updatePackageAppoinmentStatus
);

export default route;

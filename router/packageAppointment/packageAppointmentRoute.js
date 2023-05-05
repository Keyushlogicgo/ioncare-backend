import express from "express";
import packageAppoinmentController from "../../controller/packageAppointment/packageAppointmentController.js";
import packageAppoinmentValidate from "../../validator/packageAppointment/packageAppointmentValidate.js";

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

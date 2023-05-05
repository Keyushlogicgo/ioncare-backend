import express from "express";
import packageAppointmentController from "../../controller/packageAppointment/packageAppointmentController.js";
import packageAppointmentValidate from "../../validator/packageAppointment/packageAppointmentValidate.js";

const route = express.Router();

route.post(
  "/",
  packageAppointmentValidate.createPackageAppointment,
  packageAppointmentController.createPackageAppointment
);
route.get("/:id?", packageAppointmentController.getPackageAppointment);
route.delete("/:id", packageAppointmentController.deletePackageAppointment);
route.patch(
  "/:id",
  packageAppointmentValidate.updatePackageAppointmentStatus,
  packageAppointmentController.updatePackageAppointmentStatus
);

export default route;

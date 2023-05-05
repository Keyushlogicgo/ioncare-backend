import express from "express";
import testAppointmentController from "../../controller/testAppointment/testAppointmentController.js";
import testAppointmentValidate from "../../validator/testAppointment/testAppointmentValidate.js";

const route = express.Router();

route.post(
  "/",
  testAppointmentValidate.createTestAppointment,
  testAppointmentController.createTestAppointment
);
route.get("/:id?", testAppointmentController.getTestAppointment);
route.delete("/:id", testAppointmentController.deleteTestAppointment);
route.patch(
  "/:id",
  testAppointmentValidate.updateTestAppointmentStatus,
  testAppointmentController.updateTestAppointmentStatus
);

export default route;

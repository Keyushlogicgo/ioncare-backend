import express from "express";
import testAppoinmentController from "../../controller/testAppointment/testAppointmentController.js";
import testAppoinmentValidate from "../../validator/testAppointment/testAppointmentValidate.js";

const route = express.Router();

route.post(
  "/",
  testAppoinmentValidate.createTestAppoinment,
  testAppoinmentController.createTestAppoinment
);
route.get("/:id?", testAppoinmentController.getTestAppoinment);
route.delete("/:id", testAppoinmentController.deleteTestAppoinment);
route.patch(
  "/:id",
  testAppoinmentValidate.updateTestAppoinmentStatus,
  testAppoinmentController.updateTestAppoinmentStatus
);

export default route;

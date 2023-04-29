import express from "express";
import appoinmentController from "../../controller/appoinment/appoinmentController.js";
import appoinmentValidate from "../../validator/appoinment/appoinmentValidate.js";

const route = express.Router();

route.post(
  "/",
  appoinmentValidate.createLabAppoinment,
  appoinmentController.createLabTestAppoinment
);
route.get("/:id?", appoinmentController.getLabTestAppoinment);
route.delete("/:id", appoinmentController.deleteLabAppoinmentTest);
route.patch(
  "/:id",
  appoinmentValidate.updateAppoinmentStatus,
  appoinmentController.updateAppoinmentStatus
);

export default route;

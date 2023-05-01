import express from "express";
import prescriptionValidate from "../../validator/prescription/prescriptionValidate.js";
import prescriptionController from "../../controller/prescription/prescriptionController.js";

const route = express.Router();

route.post(
  "/",
  prescriptionValidate.createPrescription,
  prescriptionController.createPrescription
);
route.get("/:id?", prescriptionController.getPrescription);
route.patch(
  "/:id",
  prescriptionValidate.editPrescription,
  prescriptionController.editPrescription
);
route.delete("/:id", prescriptionController.deletePrescription);

export default route;

import express from "express";
import prescriptionImageValidate from "../../validator/prescriptionImage/prescriptionImageValidate.js";
import prescriptionImageController from "../../controller/prescriptionImage/prescriptionImageController.js";

const route = express.Router();

route.post(
  "/",
  prescriptionImageValidate.createPrescriptionImage,
  prescriptionImageController.createPrescriptionImage
);
route.get("/:id?", prescriptionImageController.getPrescriptionImage);
route.delete("/:id", prescriptionImageController.deletePrescriptionImage);

export default route;

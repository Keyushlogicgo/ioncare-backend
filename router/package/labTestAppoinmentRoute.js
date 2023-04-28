import express from "express";
import labTestAppoinmentController from "../../controller/package/labTestAppoinmentController.js";
import labAppoinmentValidate from "../../validator/lab/labAppoinmentValidate.js";

const route = express.Router();

route.post("/", labAppoinmentValidate.createLabAppoinment, labTestAppoinmentController.createLabTestAppoinment);
route.get("/:id?", labTestAppoinmentController.getLabTestAppoinment);
route.delete("/:id", labTestAppoinmentController.deleteLabAppoinmentTest);
route.patch("/:id", labAppoinmentValidate.updateAppoinmentStatus, labTestAppoinmentController.updateAppoinmentStatus);

export default route;

import express from "express";
import labTestController from "../../controller/lab/labTestController.js";
import labValidate from "../../validator/lab/labValidate.js";

const route = express.Router();

route.post("/", labValidate.createLab, labTestController.createLabTest);
route.get("/:id?", labTestController.getLabTest);
route.patch("/:id", labValidate.patchLab, labTestController.editLabTest);
route.delete("/:id", labTestController.deleteLabTest);

export default route;

import express from "express";
import labTestController from "../controller/labTestController.js";

const route = express.Router();

route.post("/", labTestController.createLabTest);
route.get("/:id?", labTestController.getLabTest);
route.patch("/:id", labTestController.editLabTest);
route.delete("/:id", labTestController.deleteLabTest);

export default route;

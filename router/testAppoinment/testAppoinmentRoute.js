import express from "express";
import testAppoinmentController from "../../controller/testAppoinment/testAppoinmentController.js";
import testAppoinmentValidate from "../../validator/testAppoinment/testAppoinmentValidate.js";

const route = express.Router();

route.post(
  "/",
  testAppoinmentValidate.createtestAppoinment,
  testAppoinmentController.createtestAppoinment
);
route.get("/:id?", testAppoinmentController.gettestAppoinment);
route.delete("/:id", testAppoinmentController.deletetestAppoinment);
route.patch(
  "/:id",
  testAppoinmentValidate.updatetestAppoinmentStatus,
  testAppoinmentController.updatetestAppoinmentStatus
);

export default route;

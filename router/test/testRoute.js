import express from "express";
import testController from "../../controller/test/testController.js";
import testValidate from "../../validator/test/testValidate.js";

const route = express.Router();

route.post("/", testValidate.createTest, testController.createTest);
route.get("/:id?", testController.getTest);
route.patch("/:id", testValidate.patchTest, testController.updateTest);
route.delete("/:id", testController.deleteTest);

export default route;

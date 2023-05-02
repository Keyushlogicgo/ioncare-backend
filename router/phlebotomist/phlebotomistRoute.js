import express from "express";
import phlebotomistController from "../../controller/phlebotomist/phlebotomistController.js";
import phlebotomistValidate from "../../validator/phlebotomist/phlebotomistValidate.js";

const route = express.Router();

route.post(
  "/",
  phlebotomistValidate.createPhlebotomist,
  phlebotomistController.createPhlebotomist
);
route.get("/:id?", phlebotomistController.getPhlebotomist);
route.patch(
  "/:id",
  phlebotomistValidate.patchPhlebotomist,
  phlebotomistController.editPhlebotomist
);
route.delete("/:id", phlebotomistController.deletePhlebotomist);

export default route;

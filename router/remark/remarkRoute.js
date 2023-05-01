import express from "express";
import remarkController from "../../controller/remark/remarkController.js";
import remarkValidate from "../../validator/remark/remarkValidate.js";

const route = express.Router();

route.post("/", remarkValidate.createRemark, remarkController.createRemark);
route.get("/:id?", remarkController.getRemark);
route.patch("/:id", remarkValidate.patchRemark, remarkController.editRemark);
route.delete("/:id", remarkController.deleteRemark);

export default route;

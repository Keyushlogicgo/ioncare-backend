import express from "express";
import memberController from "../../controller/member/memberController.js";
import memberValidate from "../../validator/member/memberValidate.js";

const route = express.Router();

route.post("/", memberValidate.createMember, memberController.createMember);
route.get("/:id?", memberController.getMember);
route.patch("/:id", memberValidate.patchMember, memberController.editMember);
route.delete("/:id", memberController.deleteMember);

export default route;

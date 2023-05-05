import express from "express";
import cartController from "../../controller/cart/cartController.js";
import cartValidate from "../../validator/cart/cartValidate.js";
import { authorization } from "../../middleware/roleValidate.js";

const route = express.Router();

route.post("/", cartValidate.createCart, cartController.createCart);
route.get("/", authorization(["ADMIN", "CUSTOMER"]), cartController.getCart);

export default route;

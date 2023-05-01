import express from "express";
import cartController from "../../controller/cart/cartController.js";
import cartValidate from "../../validator/cart/cartValidate.js";

const route = express.Router();

route.post("/", cartValidate.createCart, cartController.createCart);

export default route;

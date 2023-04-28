import express from "express";
import orderController from "../../controller/order/orderController.js";

const route = express.Router();

route.get("/:id?", orderController.getOrder);

export default route;

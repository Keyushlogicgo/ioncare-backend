import express from "express";
import paymentController from "../../controller/payment/paymentController.js";
import paymentValidate from "../../validator/payment/paymentValidate.js";

const route = express.Router();

route.post("/", paymentValidate.createPayment, paymentController.createPayment);

export default route;

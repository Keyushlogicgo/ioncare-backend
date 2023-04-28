import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import labRoute from "./router/lab/labTestRoute.js";
import labAppoinmentRoute from "./router/lab/labTestAppoinmentRoute.js";
import categoryRoute from "./router/category/categoryRoute.js";
import paymentRoute from "./router/payment/paymentRoute.js";
import orderRoute from "./router/order/orderRoute.js";
import { tokenValidate } from "./middleware/tokenValidate.js";
import { roleValidate } from "./middleware/roleValidate.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded());

// lab route
app.use("/api/v2/lab", tokenValidate, roleValidate, labRoute);
app.use(
  "/api/v2/labappoinment",
  tokenValidate,
  roleValidate,
  labAppoinmentRoute
);
app.use("/api/v2/category", tokenValidate, roleValidate, categoryRoute);
app.use("/api/v2/payment", tokenValidate, roleValidate, paymentRoute);
app.use("/api/v2/order", tokenValidate, roleValidate, orderRoute);

// connect db
connectDb(DATABASE_URL);

// Server Listning
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

// Uncaught exceptions and unhandled rejections
process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err.message);
});
process.on("unhandledRejection", function (err) {
  console.error("Unhandled Rejection:", err.message);
});

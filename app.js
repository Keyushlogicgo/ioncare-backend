import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import { tokenValidate } from "./middleware/tokenValidate.js";
import { roleValidate } from "./middleware/roleValidate.js";
import cors from "cors";

// Router
import memberRoute from "./router/member/memberRoute.js";
import testRoute from "./router/test/testRoute.js";
import packageRoute from "./router/package/packageRoute.js";
import packageAppoinmentRoute from "./router/packageAppoinment/packageAppoinmentRoute.js";
import testAppoinmentRoute from "./router/testAppoinment/testAppoinmentRoute.js";
import orderRoute from "./router/order/orderRoute.js";
import paymentRoute from "./router/payment/paymentRoute.js";
import remarkRoute from "./router/remark/remarkRoute.js";
import cartRoute from "./router/cart/cartRoute.js";
import { join } from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Static
app.use("/uploads", express.static(join(process.cwd(), "upload")));

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

// Routes
app.use("/api/v2/member", tokenValidate, roleValidate, memberRoute);
app.use("/api/v2/test", tokenValidate, roleValidate, testRoute);
app.use("/api/v2/package", tokenValidate, roleValidate, packageRoute);
app.use(
  "/api/v2/package-appointment",
  tokenValidate,
  roleValidate,
  packageAppoinmentRoute
);
app.use(
  "/api/v2/test-appointment",
  tokenValidate,
  roleValidate,
  testAppoinmentRoute
);
app.use("/api/v2/order", tokenValidate, roleValidate, orderRoute);
app.use("/api/v2/payment", tokenValidate, roleValidate, paymentRoute);
app.use("/api/v2/remark", tokenValidate, roleValidate, remarkRoute);
app.use("/api/v2/cart", tokenValidate, roleValidate, cartRoute);

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

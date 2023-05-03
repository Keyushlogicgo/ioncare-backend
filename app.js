import express from "express";
import dotenv from "dotenv";
import { join } from "path";
import cors from "cors";

// Custom Item
import { connectDb } from "./config/connectDb.js";
import { tokenValidate } from "./middleware/tokenValidate.js";
import { roleValidate } from "./middleware/roleValidate.js";

// Router
import * as route from "./router/index.js";

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
app.use("/uploads", express.static(join(process.cwd(), "uploads")));

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

// Routes
app.use(
  "/api/v2/phlebotomist",
  tokenValidate,
  roleValidate,
  route.phlebotomistRoute
);
app.use(
  "/api/v2/package-appointment",
  tokenValidate,
  roleValidate,
  route.packageAppoinmentRoute
);
app.use(
  "/api/v2/test-appointment",
  tokenValidate,
  roleValidate,
  route.testAppoinmentRoute
);
app.use(
  "/api/v2/prescription",
  tokenValidate,
  roleValidate,
  route.prescriptionRoute
);
app.use(
  "/api/v2/prescription-image",
  tokenValidate,
  roleValidate,
  route.prescriptionImageRoute
);
app.use("/api/v2/member", tokenValidate, roleValidate, route.memberRoute);
app.use("/api/v2/test", tokenValidate, roleValidate, route.testRoute);
app.use("/api/v2/package", tokenValidate, roleValidate, route.packageRoute);
app.use("/api/v2/order", tokenValidate, roleValidate, route.orderRoute);
app.use("/api/v2/payment", tokenValidate, roleValidate, route.paymentRoute);
app.use("/api/v2/remark", tokenValidate, roleValidate, route.remarkRoute);
app.use("/api/v2/rating", tokenValidate, roleValidate, route.ratingRoute);
app.use("/api/v2/cart", tokenValidate, roleValidate, route.cartRoute);
app.use("/api/v2/auth", route.authRoute);

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

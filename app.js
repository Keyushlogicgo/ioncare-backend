import express from "express";
import dotenv from "dotenv";
import { join } from "path";
import cors from "cors";

// Custom Item
import { connectDb } from "./config/connectDb.js";
import { tokenValidate } from "./middleware/tokenValidate.js";

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

// Public Routes
app.use("/api/v2/auth", route.authRoute);

// Private Routes
app.use(tokenValidate);
app.use("/api/v2/package-appointment", route.packageAppointmentRoute);
app.use("/api/v2/prescription-image", route.prescriptionImageRoute);
app.use("/api/v2/phlebotomist", route.phlebotomistRoute);
app.use("/api/v2/test-appointment", route.testAppointmentRoute);
app.use("/api/v2/prescription", route.prescriptionRoute);
app.use("/api/v2/member", route.memberRoute);
app.use("/api/v2/test", route.testRoute);
app.use("/api/v2/package", route.packageRoute);
app.use("/api/v2/order", route.orderRoute);
app.use("/api/v2/payment", route.paymentRoute);
app.use("/api/v2/remark", route.remarkRoute);
app.use("/api/v2/rating", route.ratingRoute);
app.use("/api/v2/cart", route.cartRoute);

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

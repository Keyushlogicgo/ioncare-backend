import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import labRoute from "./router/lab/labTestRoute.js";
import labAppoinmentRoute from "./router/lab/labTestAppoinmentRoute.js";
import categoryRoute from "./router/category/categoryRoute.js";
import { tokenValidate } from "./middleware/tokenValidate.js";
import { roleValidate } from "./middleware/roleValidate.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Body parser
app.use(express.json());
app.use(express.urlencoded());

// lab route
app.use("/api/v2/lab", tokenValidate, roleValidate, labRoute);
app.use("/api/v2/labappoinment", tokenValidate, roleValidate, labAppoinmentRoute);
app.use("/api/v2/category", tokenValidate, roleValidate, categoryRoute);

// connect db
connectDb(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

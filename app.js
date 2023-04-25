import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import labRoute from "./router/lab/labTestRoute.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Body parser
app.use(bodyParser.json());

// lab route
app.use("/api/v2/lab", labRoute);

// connect db
connectDb(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

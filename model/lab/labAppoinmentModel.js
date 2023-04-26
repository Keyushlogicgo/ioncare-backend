import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

const labAppoinmentSchema = mongoose.Schema({
  from_date: { type: String, trim: true, required: true },
  to_date: { type: String, trim: true, required: true },
  test_id: { type: mongoose.Schema.Types.ObjectId, ref: "labtest", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true, enum: appoinmentEnum, default: "PENDING", },
  create_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
const labAppoinmentModel = mongoose.model("labappoinment", labAppoinmentSchema);

export default labAppoinmentModel;

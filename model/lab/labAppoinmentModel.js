import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

const labAppoinmentSchema = mongoose.Schema({
  start_time: { type: String, trim: true, required: true },
  end_time: { type: String, trim: true, required: true },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "labtest",
    required: true,
    onDelete: "cascade",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "payment",
  },
  price: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: appoinmentEnum,
    default: "PENDING",
  },
  date: { type: String, required: true },
  create_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
const labAppoinmentModel = mongoose.model("labappoinment", labAppoinmentSchema);

export default labAppoinmentModel;

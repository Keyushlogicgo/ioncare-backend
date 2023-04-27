import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

const paymentSchema = mongoose.Schema({
  order_id: { type: String, required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    default: "PENDING",
    enum: appoinmentEnum,
  },
  payment_method: { type: String, required: true },
  create_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;

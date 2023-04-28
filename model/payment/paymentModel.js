import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

const paymentSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "order",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    transaction_id: { type: String, required: true },
    status: {
      type: String,
      default: "PENDING",
      enum: appoinmentEnum,
    },
    payment_method: { type: String, required: true },
  },
  { timestamps: true }
);
const paymentModel = mongoose.model("payment", paymentSchema);

export default paymentModel;

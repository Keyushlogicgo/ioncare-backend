import mongoose from "mongoose";
import { statusEnum } from "../../config/enum.js";

const orderSchema = mongoose.Schema(
  {
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: "PENDING",
      enum: statusEnum,
    },
  },
  { timestamps: true }
);
const orderModel = mongoose.model("order", orderSchema);

export default orderModel;

import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

const orderSchema = mongoose.Schema(
  {
    appoinment_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "labappoinment",
      onDelete: "cascade",
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      default: "PENDING",
      enum: appoinmentEnum,
    },
  },
  { timestamps: true }
);
const orderModel = mongoose.model("order", orderSchema);

export default orderModel;

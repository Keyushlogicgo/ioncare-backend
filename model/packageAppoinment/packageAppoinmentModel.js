import mongoose from "mongoose";
import { statusEnum } from "../../config/enum.js";

export const packageAppoinmentSchema = mongoose.Schema(
  {
    start_time: { type: String, trim: true, required: true },
    end_time: { type: String, trim: true, required: true },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "labtest",
      required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    member_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: statusEnum,
      default: "PENDING",
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);
const packageAppoinmentModel = mongoose.model("package-appoinment", packageAppoinmentSchema);

export default packageAppoinmentModel;

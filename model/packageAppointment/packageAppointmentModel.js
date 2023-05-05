import mongoose from "mongoose";
import { statusEnum } from "../../config/enum.js";

export const packageAppointmentSchema = mongoose.Schema(
  {
    start_time: { type: String, trim: true, required: true },
    end_time: { type: String, trim: true, required: true },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packages",
      required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    member_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    phlebotomist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "phlebotomists",
    },
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
const packageAppointmentModel = mongoose.model(
  "package-appointment",
  packageAppointmentSchema
);

export default packageAppointmentModel;

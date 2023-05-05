import mongoose from "mongoose";
import { statusEnum } from "../../config/enum.js";

export const testAppointmentSchema = mongoose.Schema(
  {
    start_time: { type: String, trim: true, required: true },
    end_time: { type: String, trim: true, required: true },
    tests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tests",
        required: true,
      },
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "members",
    },
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
const testAppointmentModel = mongoose.model(
  "test-appointment",
  testAppointmentSchema
);

export default testAppointmentModel;

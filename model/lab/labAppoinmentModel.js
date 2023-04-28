import mongoose from "mongoose";
import { appoinmentEnum } from "../../config/enum.js";

export const labAppoinmentSchema = mongoose.Schema(
  {
    start_time: { type: String, trim: true, required: true },
    end_time: { type: String, trim: true, required: true },
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "labtest",
      required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: appoinmentEnum,
      default: "PENDING",
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);
const labAppoinmentModel = mongoose.model("labappoinment", labAppoinmentSchema);

export default labAppoinmentModel;

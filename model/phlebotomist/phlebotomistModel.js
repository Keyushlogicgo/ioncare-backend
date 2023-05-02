import mongoose from "mongoose";
import { genderEnum } from "../../config/enum.js";

const phlebotomistSchema = mongoose.Schema(
  {
    image: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id_proof: { type: String },
    phone: { type: Number, required: true },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: genderEnum },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const phlebotomistModel = mongoose.model("phlebotomist", phlebotomistSchema);

export default phlebotomistModel;

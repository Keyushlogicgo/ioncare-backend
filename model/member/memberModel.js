import mongoose from "mongoose";
import { genderEnum, relationEnum } from "../../config/enum.js";

const memberSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: genderEnum },
    relations: { type: String, required: true, enum: relationEnum },
    image: { type: String },
  },
  { timestamps: true }
);
const memberModel = mongoose.model("member", memberSchema);

export default memberModel;

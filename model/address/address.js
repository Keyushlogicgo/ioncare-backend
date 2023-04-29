import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    ref_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);
const addressModel = mongoose.model("address", addressSchema);

export default addressModel;

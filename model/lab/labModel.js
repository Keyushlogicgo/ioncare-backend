import mongoose from "mongoose";

const labSchema = mongoose.Schema({
  title: { type: String, trim: true, required: true },
  price: { type: Number, required: true },
  selling_price: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category", required: true }],
  create_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
const labModel = mongoose.model("labtest", labSchema);

export default labModel;

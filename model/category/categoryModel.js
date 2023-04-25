import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: { type: String, trim: true, required: true },
  create_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;

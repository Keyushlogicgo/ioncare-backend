import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;

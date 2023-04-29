import mongoose from "mongoose";

const testSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);
const testModel = mongoose.model("test", testSchema);

export default testModel;

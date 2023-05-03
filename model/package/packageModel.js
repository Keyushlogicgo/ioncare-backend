import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    background: { type: String, trim: true, default: "#435aa5" },
    note: [{ type: String, trim: true }],
    image: { type: String, trim: true, required: true },
    price: { type: Number, required: true },
    selling_price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    test: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const packageModel = mongoose.model("package", packageSchema);

export default packageModel;

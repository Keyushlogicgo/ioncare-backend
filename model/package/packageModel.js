import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
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

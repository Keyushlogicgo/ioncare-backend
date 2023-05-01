import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;

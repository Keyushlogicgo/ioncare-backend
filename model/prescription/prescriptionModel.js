import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: [{ type: String, required: true }],
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

const prescriptionModel = mongoose.model("prescription", prescriptionSchema);

export default prescriptionModel;

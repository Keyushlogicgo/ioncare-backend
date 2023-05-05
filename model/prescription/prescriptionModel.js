import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "prescriptionimage",
      },
    ],
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

const prescriptionModel = mongoose.model("prescription", prescriptionSchema);

export default prescriptionModel;

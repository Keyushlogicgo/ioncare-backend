import mongoose from "mongoose";

const prescriptionImageSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const prescriptionImageModel = mongoose.model(
  "prescriptionimage",
  prescriptionImageSchema
);

export default prescriptionImageModel;

import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    written_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const ratingModel = mongoose.model("rating", ratingSchema);

export default ratingModel;

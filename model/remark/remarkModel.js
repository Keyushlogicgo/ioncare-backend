import mongoose from "mongoose";

const remarkSchema = mongoose.Schema(
  {
    ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    written_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const remarkModel = mongoose.model("remark", remarkSchema);

export default remarkModel;

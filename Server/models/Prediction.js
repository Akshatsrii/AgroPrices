import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    crop: String,
    predictedPrice: Number,
    days: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
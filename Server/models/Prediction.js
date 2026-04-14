import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  crop: String,
  price: Number,
}, { timestamps: true });

export default mongoose.model("Prediction", predictionSchema);
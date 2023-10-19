import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    firstname:{
      type: String,
      required: false,
    },
    lastname:{
      type: String,
      required: false,
    },
    userImage: {
      type: String,
      required: false,
    },

    star: {
      type: Number,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    sellerId: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Review", reviewSchema);

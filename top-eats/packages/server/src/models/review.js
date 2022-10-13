import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const reviewSchema = new mongoose.Schema (
  {
    author: {
      type: String,
      ref: 'User'
    },
    restaurantID: {
      type: String,
      required: true
    },
    reviewBody: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
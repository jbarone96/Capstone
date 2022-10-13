import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: false,
      required: true,
    },
    lastName: {
      type: String,
      unique: false,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      unique: false,
      required: true,
    },
    profile_image: {
      type: String,
      required: false,
      default: "packages/client/public/defaultavatar.jpeg"
    },
    birthday: {
      type: String,
      required: false,
    },
    reviews: [
      {
        type: ObjectId,
      },
    ],
    savedRestaurants: [
      {
        type: ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

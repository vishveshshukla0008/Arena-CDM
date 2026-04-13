import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profilePicture: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      required: true,
      trim: true,
      select : false
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
import mongoose from "mongoose";


const userModel = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    avatar: String,
    emailVerified: {
      type: Boolean,
      required: false,
      default: false
    },
    mobileDeviceToken: String,
    webDeviceToken: String,
    refreshToken: String,
    accessToken: String,
    accessTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userModel);

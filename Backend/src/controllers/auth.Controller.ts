import { type Request, type Response } from "express";
import { userModel } from "../models/user.Model.js";
import { generateToken } from "../utils/jwt.utils.js";
import config from "../config/config.js";

const getMeController = async (req: Request, res: Response) => {
  const user = req.user;
  return res
    .status(200)
    .json({ success: true, message: "User fetched Success", user });
};

const googleAuthController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        success: false,
        message: "User not found in request",
      });
    }

    const { id, displayName, emails, photos } = req.user as any;

    const email = emails?.[0]?.value;
    const fullname = displayName;
    const profilePicture = photos?.[0]?.value;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not provided",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        fullname,
        profilePicture,
        googleId: id,
      });
    }

    const token = generateToken({
      userId: user._id,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(config.FRONTEND_URL);
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      success: false,
      message: "Auth failed",
    });
  }
};

const logoutUserController = async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged Out !" });
};

export const authController = {
  googleAuthController,
  getMeController,
  logoutUserController,
};

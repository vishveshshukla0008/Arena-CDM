import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};

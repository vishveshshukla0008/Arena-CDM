import { type Request, type Response, type NextFunction } from "express";
import { userModel } from "../models/user.Model.js";
import { verifyToken } from "../utils/jwt.utils.js";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const token =
      req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded: any = verifyToken(token);
    const user = await userModel
      .findById(decoded.userId)
      .select("-password -__v");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: User not found" });
  }
};

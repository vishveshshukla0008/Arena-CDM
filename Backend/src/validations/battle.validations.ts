import { validationResult, body } from "express-validator";
import type { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

const validator = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "Validation Failed", errors.array());
  }
};

export const battleValidation = [
  body("prompt").notEmpty().withMessage("Prompt is required"),
  validator,
];

import type { NextFunction, Request, Response } from "express";
import { validationResult, body } from "express-validator";

const validate = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const battleValidation = [
  body("prompt").notEmpty().withMessage("Prompt is required"),
  validate,
];

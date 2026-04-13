import { validationResult, body } from "express-validator";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(400, "Validation Failed", errors.array());
  }

  next();
};

export const registerValidation = [
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isLength({ min: 10 })
    .withMessage("Mobile number must be 10 digits !"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 12 })
    .withMessage("Password must be between 8 and 12 characters !"),
  validator,
];

export const loginValidation = [
  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isLength({ min: 10 })
    .withMessage("Mobile number must be 10 digits !"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 12 })
    .withMessage("Password must be between 8 and 12 characters !"),
  validator,
];

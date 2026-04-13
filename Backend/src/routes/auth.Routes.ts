import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/auth.Controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.get("/me", authUser, authController.getMeController);

authRouter.post("/logout", authUser, authController.logoutUserController);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  authController.googleAuthController,
);

export default authRouter;

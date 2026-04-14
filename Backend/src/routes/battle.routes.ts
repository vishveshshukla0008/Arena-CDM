import { Router, type Router as RouterType } from "express";
import { battleValidation } from "../validations/battle.Validation.js";
import { battleController } from "../controllers/battle.Controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const battleRouter: RouterType = Router();

battleRouter.post("/", authUser, battleValidation, battleController);

export default battleRouter;

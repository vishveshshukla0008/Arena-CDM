import { Router, type Router as RouterType } from "express";
import { battleValidation } from "../validations/battle.Validation.js";
import { battleController } from "../controllers/battle.Controller.js";

const battleRouter: RouterType = Router();

battleRouter.post("/", battleValidation, battleController);

export default battleRouter;

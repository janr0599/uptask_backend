import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateLogin, validateUserData } from "../middleware/authMiddleware";
import { validateToken } from "../middleware/validation";

const router = Router();

router.post("/create-account", validateUserData, AuthController.createAccount);
router.post("/confirm-account", validateToken, AuthController.confirmAccount);
router.post("/login", validateLogin, AuthController.login);

export default router;

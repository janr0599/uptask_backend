import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateUserData } from "../middleware/authMiddleware";

const router = Router();

router.post("/create-account", validateUserData, AuthController.createAccount);

export default router;

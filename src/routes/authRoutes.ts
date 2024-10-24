import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import {
    validateLogin,
    validateEmail,
    validateUserData,
    validateNewPassword,
} from "../middleware/authMiddleware";
import { validateToken } from "../middleware/validation";

const router = Router();

router.post("/create-account", validateUserData, AuthController.createAccount);
router.post("/confirm-account", validateToken, AuthController.confirmAccount);
router.post("/login", validateLogin, AuthController.login);
router.post(
    "/request-code",
    validateEmail,
    AuthController.requestConfirmationCode
);
router.post("/forgot-password", validateEmail, AuthController.forgotPassword);
router.post("/validate-token", validateToken, AuthController.validateToken);
router.post(
    "/update-password/:token",
    validateNewPassword,
    AuthController.updatePasswordWithToken
);

export default router;

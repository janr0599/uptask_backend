import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import {
    validateLogin,
    validateEmail,
    validateUserData,
    validateNewPassword,
    authenticate,
} from "../middleware/authMiddleware";
import { validatePassword, validateToken } from "../middleware/validation";

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
router.get("/user", authenticate, AuthController.user);
router.post(
    "/check-password",
    authenticate,
    validatePassword,
    AuthController.checkPassword
);

export default router;

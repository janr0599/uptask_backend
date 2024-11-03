import { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import { authenticate } from "../middleware/authMiddleware";
import {
    validateChangeCurrentPassword,
    validateProfileData,
} from "../middleware/profileMiddleware";

const router = Router();
router.use(authenticate);

router.put("/", validateProfileData, ProfileController.updateProfile);

router.post(
    "/change-password",
    validateChangeCurrentPassword,
    ProfileController.changeCurrentPassword
);

export default router;

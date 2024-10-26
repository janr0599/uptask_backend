import { Router } from "express";
import { validateEmail } from "../middleware/authMiddleware";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router({ mergeParams: true });

router.post("/find", validateEmail, TeamMemberController.findMemberByEmail);

export default router;

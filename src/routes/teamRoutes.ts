import { Router } from "express";
import { validateEmail } from "../middleware/authMiddleware";
import { TeamMemberController } from "../controllers/TeamController";
import { validateId } from "../middleware/validation";

const router = Router({ mergeParams: true });

router.post("/find", validateEmail, TeamMemberController.findMemberByEmail);
router.get("/", TeamMemberController.getProjectTeam);
router.post("/", validateId, TeamMemberController.addMemberById);
router.delete("/", validateId, TeamMemberController.removeMemberById);

export default router;

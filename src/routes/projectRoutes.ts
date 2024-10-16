import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import {
    validateProjectData,
    validateProjectId,
} from "../middleware/validation";

const router = Router();

router.post("/", validateProjectData, ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", validateProjectId, ProjectController.getProjectById);
router.put(
    "/:id",
    validateProjectData,
    validateProjectId,
    ProjectController.updateProject
);
router.delete("/:id", validateProjectId, ProjectController.deleteProject);

export default router;

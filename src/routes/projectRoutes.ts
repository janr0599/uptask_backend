import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import {
    validateProjectData,
    validateProjectExists,
} from "../middleware/projectsMiddleware";
import TaskRoutes from "./taskRoutes";
import { validateId } from "../middleware/validation";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.param("projectId", validateProjectExists);
router.param("id", validateId);
router.use(authenticate);

router.post("/", validateProjectData, ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", validateProjectData, ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

// Task Routes
router.use("/:projectId/tasks", TaskRoutes);

export default router;

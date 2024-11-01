import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import {
    validateProjectData,
    validateProjectExists,
} from "../middleware/projectsMiddleware";
import { validateId } from "../middleware/validation";
import { authenticate } from "../middleware/authMiddleware";
import TaskRoutes from "./taskRoutes";
import TeamRoutes from "./teamRoutes";
import NotesRoutes from "./noteRoutes";
import {
    taskBelongsToProject,
    validateTaskExists,
} from "../middleware/tasksMiddleware";

const router = Router();

router.param("projectId", validateProjectExists);
router.param("id", validateId);

router.param("taskId", validateId);
router.param("taskId", validateTaskExists);
router.param("taskId", taskBelongsToProject);

router.use(authenticate);

router.post("/", validateProjectData, ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.put("/:id", validateProjectData, ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

// Task Routes
router.use("/:projectId/tasks", TaskRoutes);

// Routes for teams
router.use("/:projectId/team/", TeamRoutes);

// Routes for notes
router.use("/:projectId/tasks/:taskId/notes", NotesRoutes);

export default router;

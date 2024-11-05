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
    isAuthorized,
    taskBelongsToProject,
    validateTaskExists,
} from "../middleware/tasksMiddleware";

const router = Router();

router.use(authenticate);

router.param("projectId", validateId);
router.param("projectId", validateProjectExists);

router.param("taskId", validateId);
router.param("taskId", validateTaskExists);
router.param("taskId", taskBelongsToProject);

router.post("/", validateProjectData, ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", validateId, ProjectController.getProjectById);
router.put("/:projectId", isAuthorized, ProjectController.updateProject);
router.delete("/:projectId", isAuthorized, ProjectController.deleteProject);

// Task Routes
router.use("/:projectId/tasks", TaskRoutes);

// Routes for teams
router.use("/:projectId/team/", TeamRoutes);

// Routes for notes
router.use("/:projectId/tasks/:taskId/notes", NotesRoutes);

export default router;

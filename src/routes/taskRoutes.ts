import { Router } from "express";
import { TaskController } from "../controllers/Taskcontroller";
import {
    isAuthorized,
    taskBelongsToProject,
    validateTaskData,
    validateTaskExists,
    validateTaskStatus,
} from "../middleware/tasksMiddleware";
import { validateId } from "../middleware/validation";

const router = Router({ mergeParams: true });
router.param("taskId", validateId);
router.param("taskId", validateTaskExists);
router.param("taskId", taskBelongsToProject);

router.post("/", isAuthorized, validateTaskData, TaskController.createTask);
router.get("/", TaskController.getProjectTasks);
router.get("/:taskId", TaskController.getTaskById);
router.put(
    "/:taskId",
    isAuthorized,
    validateTaskData,
    TaskController.updateTask
);
router.delete("/:taskId", isAuthorized, TaskController.deleteTask);
router.post(
    "/:taskId/status",
    validateTaskStatus,
    TaskController.updateTaskStatus
);

export default router;

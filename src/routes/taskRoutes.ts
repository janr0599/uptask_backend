import { Router } from "express";
import { TaskController } from "../controllers/Taskcontroller";
import {
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

router.post("/", validateTaskData, TaskController.createTask);
router.get("/", TaskController.getProjectTasks);
router.get("/:taskId", TaskController.getTaskById);
router.put("/:taskId", validateTaskData, TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);
router.post(
    "/:taskId/status",
    validateTaskStatus,
    TaskController.updateTaskStatus
);

export default router;

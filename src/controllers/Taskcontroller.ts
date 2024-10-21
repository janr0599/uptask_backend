import { Request, Response } from "express";
import Task from "../models/Tasks";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const task = new Task(req.body);

        task.project = req.project.id;

        req.project.tasks.push(task.id);

        try {
            await Promise.allSettled([task.save(), req.project.save()]);
            res.json({ message: "Task created sucessfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to create task" });
        }
    };

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate(
                "project"
            );
            res.json({ data: tasks });
        } catch (error) {
            res.status(500).json({ error: "Failed to get tasks" });
        }
    };

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.json({ data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to get task" });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;

            await req.task.save();

            res.json({ data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to update task" });
        }
    };

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id.toString()
            );

            await Promise.allSettled([
                req.task.deleteOne(),
                req.project.save(),
            ]);

            res.json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete task" });
        }
    };

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;

            req.task.status = status;
            await req.task.save();

            res.json({ data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to update task status" });
            console.log(error);
        }
    };
}

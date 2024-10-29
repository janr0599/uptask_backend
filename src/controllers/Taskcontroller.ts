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
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate(
                "project"
            );
            res.json({ data: tasks });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.task.id).populate({
                path: "completedBy",
                select: "id name email",
            });
            res.json({ task: task });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;

            await req.task.save();

            res.json({ message: "Task updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
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
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static updateTaskStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;

            req.task.status = status;
            if (status === "pending") {
                req.task.completedBy = null;
            } else {
                req.task.completedBy = req.user.id;
            }
            await req.task.save();

            res.json({ message: "Task status updated sucessfully" });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
            console.log(error);
        }
    };
}

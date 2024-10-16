import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).json({ data: project });
        } catch (error) {
            res.status(500).json({ error: "Failed to create project" });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json({ data: projects });
        } catch (error) {
            res.status(500).json({ error: "Failed to get projects" });
        }
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            res.json({ data: project });
        } catch (error) {
            res.status(500).json({ error: "Failed to get project" });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(id, req.body, {
                new: true,
            });

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            // await project.save();
            res.json({ data: project });
        } catch (error) {
            res.status(500).json({ error: "Failed to update project" });
        }
    };

    static deleteProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            await project.deleteOne();

            res.json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to dekete project" });
        }
    };
}

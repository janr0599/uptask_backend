import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).json({ message: "Project created successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to create project" });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.status(200).json({ data: projects });
        } catch (error) {
            res.status(500).json({ error: "Failed to get projects" });
        }
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id).populate("tasks");

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            res.status(200).json({ data: project });
        } catch (error) {
            res.status(500).json({ error: "Failed to get project" });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;

            await project.save();

            res.status(200).json({ data: project });
        } catch (error) {
            res.status(500).json({ error: "Failed to update project" });
        }
    };

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                res.status(404).json({ error: error.message });
                return;
            }

            await project.deleteOne();

            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete project" });
        }
    };
}

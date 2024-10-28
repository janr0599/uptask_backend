import { Request, Response } from "express";
import User from "../models/User";

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body;

        try {
            //Find user
            const user = await User.findOne({ email }).select("id email name");
            if (!user) {
                const error = new Error("User not found");
                res.status(404).json({ error: error.message });
                return;
            }

            res.status(200).json({ user: user });
        } catch (error) {
            res.status(500).json({ error: "There's been an error" });
        }
    };

    static getProjectTeam = async (req: Request, res: Response) => {
        try {
            const { team } = await req.project.populate(
                "team",
                "id name email"
            );
            res.json({ team: team });
        } catch (error) {
            res.status(500).json({
                message: "There's been an error",
            });
        }
    };

    static addMemberById = async (req: Request, res: Response) => {
        const { memberId } = req.body;
        try {
            const user = await User.findById(memberId).select("id");
            if (!user) {
                const error = new Error("User not found");
                res.status(404).json({ error: error.message });
                return;
            }

            // Avoid adding same member twice
            if (
                req.project.team.some(
                    (member) => member.toString() === user.id.toString()
                )
            ) {
                const error = new Error(
                    "User has already been added to the project"
                );
                res.status(409).json({ error: error.message });
                return;
            }

            req.project.team.push(user.id);
            await req.project.save();

            res.status(200).json({ message: "User added successfully" });
        } catch (error) {
            res.status(500).json({ error: "There's been an error" });
        }
    };

    static removeMemberById = async (req: Request, res: Response) => {
        const { userId } = req.params;

        //  Avoid executing the code if user does not exist in the project
        if (!req.project.team.some((member) => member.toString() === userId)) {
            const error = new Error("User does not exist in the project");
            res.status(409).json({ error: error.message });
            return;
        }

        req.project.team = req.project.team.filter(
            (member) => member.toString() !== userId
        );
        await req.project.save();

        res.status(200).json({ message: "User removed successfully" });
    };
}

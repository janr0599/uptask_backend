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
}

import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export class ProfileController {
    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        try {
            const userExists = await User.findOne({ email });

            if (
                userExists &&
                req.user._id.toString() !== userExists._id.toString()
            ) {
                const error = new Error("Email already in use");
                res.status(404).json({ error: error.message });
                return;
            }
            req.user.name = name;
            req.user.email = email;

            await req.user.save();
            res.status(200).json({ message: "Profile updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };

    static changeCurrentPassword = async (req: Request, res: Response) => {
        const { currentPassword, password } = req.body;

        try {
            const user = await User.findById(req.user._id);

            const isPasswordCorrect = await checkPassword(
                currentPassword,
                user.password
            );

            if (!isPasswordCorrect) {
                const error = new Error("Current password is incorrect");
                res.status(400).json({ error: error.message });
                return;
            }

            user.password = await hashPassword(password);
            await user.save();

            res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };
}

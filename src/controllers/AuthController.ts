import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            // Prevent duplicates
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error("Email already in use");
                res.status(409).json({ error: error.message });
                return;
            }

            // create a new user
            const user = new User(req.body);

            // Hash password
            user.password = await hashPassword(password);

            await user.save();
            res.status(201).json({
                message:
                    "Account created, please check your email to confirm your account",
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create account" });
        }
    };
}

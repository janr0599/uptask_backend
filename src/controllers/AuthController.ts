import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";

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

            // Generate token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Send confirmation email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            await Promise.allSettled([user.save(), token.save()]);
            res.status(201).json({
                message:
                    "Account created, please check your email to confirm your account",
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to create account" });
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Token not valid");
                res.status(404).json({ error: error.message });
                return;
            }

            const user = await User.findById(tokenExists.user);
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.status(200).json({ message: "Account confimed" });
        } catch (error) {
            res.status(500).json({ error: "Failed to confirm account" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            // Confirm user
            if (!user) {
                const error = new Error("User not found ");
                res.status(404).json({ error: error.message });
                return;
            }

            // Check account has been confirmed
            if (!user.confirmed) {
                // Generate token
                const token = new Token();
                token.token = generateToken();
                token.user = user.id;
                await token.save();

                // Send confirmation email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });

                const error = new Error(
                    "Account has not been confirmed, we have sent you an email confirmation"
                );
                res.status(401).json({ error: error.message });
                return;
            }

            // Check password match
            const isCorrectPassword = await checkPassword(
                password,
                user.password
            );
            if (!isCorrectPassword) {
                const error = new Error("Incorrect password");
                res.status(401).json({ error: error.message });
                return;
            }

            res.send("Authenticated");
        } catch (error) {
            res.status(500).json({ error: "Failed to login" });
        }
    };
}

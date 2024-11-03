import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

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
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                res.status(404).json({ error: error.message });
                return;
            }

            const user = await User.findById(tokenExists.user);
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.status(200).json({
                message:
                    "Your account has been successfully confirmed! Please log in to continue",
            });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
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
                await token.save();

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

            const token = generateJWT({ id: user.id });

            res.json({ token: token });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            // Check if user Exists
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("User not registered");
                res.status(404).json({ error: error.message });
                return;
            }

            if (user.confirmed) {
                const error = new Error(
                    "Account has already been confirmed, try logging in"
                );
                res.status(403).json({ error: error.message });
                return;
            }

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

            await token.save();
            res.status(200).json({
                message:
                    "A new token has been sent, please check your email to confirm your account",
            });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            // Check if user Exists
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("User not registered");
                res.status(404).json({ error: error.message });
                return;
            }

            // Generate token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            await token.save();

            // Send confirmation email
            AuthEmail.sendResetPasswordEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });

            res.status(200).json({
                message:
                    "We have sent you an email with instructions to reset your password",
            });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                res.status(404).json({ error: error.message });
                return;
            }

            res.status(200).json({
                message: "Confirmed, set a new password",
            });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                res.status(404).json({ error: error.message });
                return;
            }

            const user = await User.findById(tokenExists.user);
            user.password = await hashPassword(password);

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.status(200).json({
                message: "New password successfully set",
            });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };

    static user = async (req: Request, res: Response) => {
        res.status(200).json({ user: req.user });
    };

    static checkPassword = async (req: Request, res: Response) => {
        try {
            const { password } = req.body;
            const user = await User.findById(req.user._id);

            const isPasswordCorrect = await checkPassword(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                const error = new Error("Incorrect password");
                res.status(401).json({ error: error.message });
                return;
            }

            res.status(200).json({ message: "Password is correct" });
        } catch (error) {
            res.status(500).json({ error: "there's been an error" });
        }
    };
}

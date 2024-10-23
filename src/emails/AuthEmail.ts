import { transporter } from "../config/nodemailer";

type AuthEmailProps = {
    email: string;
    name: string;
    token: string;
};

export class AuthEmail {
    static sendConfirmationEmail = async (user: AuthEmailProps) => {
        await transporter.sendMail({
            from: "UpTask <admin@uptask.com>",
            to: user.email,
            subject: "Uptask - Confirm your account",
            html: `
                    <p>Hi ${user.name},</p>
                    <p>Thank you for signing up! Please confirm your account by clicking the link below and entering the following confirmation token:</p>
                    <p><strong>Confirmation Token: ${user.token}</strong></p>
                    <p><a href="[Confirmation Link]">Confirm Account</a>
                    <p>This link will expire in 10 minutes.</p>
                    <p>If you didn’t create this account, you can safely ignore this email.</p>
                    <p>Cheers,<br>UpTask Team
                `,
        });
    };
}

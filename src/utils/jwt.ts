import jwt from "jsonwebtoken";
import { UserPayload } from "../types/Users";

export const generateJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
    });
    return token;
};

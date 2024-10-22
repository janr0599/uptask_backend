import mongoose, { Schema } from "mongoose";
import { UserType } from "../types/Users";

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false, // Untill user confirms their account, it will remain as false
    },
});

const User = mongoose.model<UserType>("User", UserSchema);
export default User;

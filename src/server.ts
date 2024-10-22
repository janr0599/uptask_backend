import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import AuthRoutes from "./routes/authRoutes";
import ProjecRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors(corsConfig));

// Loggin
app.use(morgan("dev"));

// Read json
app.use(express.json());

//Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/projects", ProjecRoutes);

export default app;

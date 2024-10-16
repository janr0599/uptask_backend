import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import ProjecRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

// Read json
app.use(express.json());

//Routes
app.use("/api/projects", ProjecRoutes);

export default app;

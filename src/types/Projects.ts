import { Document } from "mongoose";
import { z } from "zod";
import { ProjectSchema } from "../schemas/projectSchemas";

export type Project = z.infer<typeof ProjectSchema>;

export type ProjectType = Document & Project;

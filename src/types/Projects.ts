import { Document, PopulatedDoc } from "mongoose";
import { TaskType } from "./Tasks";
import { UserType } from "./Users";

//Mongoose Model Type
export type ProjectType = Document & {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<TaskType & Document>[];
    manager: PopulatedDoc<UserType & Document>;
};

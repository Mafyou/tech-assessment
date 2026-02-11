import { Instructor } from "./Instructor";

export interface Course {
    id: number;
    title: string;
    shortDescription: string;
    instructor: Instructor;
}
import { Instructor } from "./Instructor";
export interface Course {
    id: number;
    title: string;
    shortDescription: string;
    description: string;
    durationInDays: number;
    audiance: number;
    maxAttendees: number;
    instructor: Instructor;
    sessionId?: number;
}
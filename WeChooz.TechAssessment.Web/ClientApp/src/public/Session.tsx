import { Course } from "./Course";

export interface Session {
    id: number;
    shortDescription: string;
    audience: number;
    startDate: string;
    durationInDays: number;
    remainingSeats: number;
    delivrance: number;
    courses: Course[];
}
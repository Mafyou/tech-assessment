import { Participant } from "./Participant";
import { Course } from "./Course";

export interface Session {
    id: number;
    shortDescription: string;
    audience: number;
    startDate: string;
    durationInDays: number;
    delivrance: number;
    remainingSeats: number;
    participants?: Participant[];
    courses?: Course[];
}
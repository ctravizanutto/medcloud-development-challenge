import {Patient} from "./patient.interface.ts";

export interface APIGetResponse {
    page: number,
    totalPages: number,
    patients: Patient[]
}
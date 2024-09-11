import {ApplicationError} from "./protocol.js";

export function patientNotExistsError(): ApplicationError {
    return {
        name: "PatientNotExistsError",
        message: "There is not a patient with given id",
    };
}
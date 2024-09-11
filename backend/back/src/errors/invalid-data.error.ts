import {ApplicationError} from "./protocol.js";

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details,
    };
}


type ApplicationInvalidateDataError = ApplicationError & {
    details: string[];
};
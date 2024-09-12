import {Address} from "./address.interface.ts";

export interface Patient {
    id: string,
    name: string,
    email: string,
    birthday: Date,
    address: Address[]
}

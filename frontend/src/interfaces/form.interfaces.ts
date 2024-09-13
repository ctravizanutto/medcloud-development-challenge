import dayjs from "dayjs";

export interface FormData {
    name: string;
    email: string;
    birthday: dayjs.Dayjs | null;
    street: string;
    number: string;
    city: string;
    state: string;
    cep: string;
    neighborhood: string;
}

export interface FormErrors {
    name?: string;
    email?: string;
    birthday?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    cep?: string;
    neighborhood?: string;
}
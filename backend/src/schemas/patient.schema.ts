import Joi from "joi";
import {AddressParams, addressSchema} from "./address.schema.js";
import {Patient} from "@prisma/client";

export type PatientParams = Omit<Patient, "id" | "createdAt" | "updatedAt"> & {
    address: AddressParams
}
const createPramsFields = ["name", "email", "birthday", "address"]

export const patientSchema = Joi.object<PatientParams>({
    name: Joi.string(),
    email: Joi.string().email(),
    birthday: Joi.string().isoDate(),
    address: addressSchema
})

export const createPatientSchema = patientSchema.fork(createPramsFields, field => field.required())
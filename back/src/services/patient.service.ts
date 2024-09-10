import {Address, Patient} from "@prisma/client";
import patientRepository from "../repositories/patient.repository.js";
import {duplicatedEmailError} from "../errors/duplicate-email.error.js";
import {exclude} from "../utils/prisma.utils.js";

async function createPatient(params: CreatePatientParams) {
    await validateUniqueEmail(params.email)

    const { address, ...patientData } = params;

    await patientRepository.create({
        name: patientData.name,
        email: patientData.email,
        birthday: new Date(patientData.birthday),
        address: {
            create: address,
        },
    })
}

async function validateUniqueEmail(email: string) {
    const patient = await patientRepository.findByEmail(email)
    if (patient) {
        throw duplicatedEmailError()
    }
}

type CreateAddressParams = Omit<Address, "id" | "createdAt" | "updatedAt">
export type CreatePatientParams = Omit<Patient, "id" | "createdAt" | "updatedAt"> & {
    address: CreateAddressParams
}

const patientService = {
    createPatient
}

export default patientService
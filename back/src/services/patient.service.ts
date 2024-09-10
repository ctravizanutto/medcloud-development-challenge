import {Address, Patient} from "@prisma/client";
import patientRepository from "../repositories/patient.repository.js";
import {duplicatedEmailError} from "../errors/duplicate-email.error.js";

async function createPatient(params: CreatePatientParams): Promise<Patient>  {
    await validateUniqueEmail(params.email)

    const { address, ...patientData } = params;

    return await patientRepository.create({
        name: patientData.name,
        email: patientData.email,
        birthday: new Date(patientData.birthday),
        // @ts-ignore
        address: {
            create: address,
        },
    })
}

async function listAllPatients(): Promise<Patient[]> {
    return await patientRepository.listAll();
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
    createPatient,
    listAllPatients
}

export default patientService
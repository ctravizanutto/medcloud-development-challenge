import {Patient} from "@prisma/client";
import patientRepository from "../repositories/patient.repository.js";
import {duplicatedEmailError} from "../errors/duplicate-email.error.js";
import {PatientParams} from "../schemas/patient.schema.js";
import addressRepository from "../repositories/address.repository.js";
import {patientNotExistsError} from "../errors/patient-not-exists.error.js";

async function createPatient(params: PatientParams): Promise<Patient> {
    await validateUniqueEmail(params.email)

    const {address, ...patientData} = params;

    return await patientRepository.create({
        name: patientData.name,
        email: patientData.email,
        birthday: new Date(patientData.birthday),
        address: {
            create: address,
        },
    })
}

async function listAllPatients(pageNumber: number, limit: number): Promise<Patient[]> {
    return await patientRepository.listAll(pageNumber, limit);
}

async function getPatientCount(): Promise<number> {
    return await patientRepository.count()
}

async function detailPatient(id: string): Promise<Patient> {
    await validateExists(id)

    return await patientRepository.findById(id)
}

async function update(id: string, params: PatientParams): Promise<Patient> {
    await validateExists(id)

    const {address, ...patientData} = params;

    if (address) {
        await addressRepository.update(id, address)
    }
    if (params.email) {
        await validateEmailById(params.email, id)
        await patientRepository.update(id, patientData)
    }

    return await patientRepository.findById(id)
}

async function disable(id: string) {
    await validateExists(id)

    return await patientRepository.disable(id)
}

async function validateUniqueEmail(email: string) {
    const patient = await patientRepository.findByEmail(email)
    if (patient) {
        throw duplicatedEmailError()
    }
}

async function validateEmailById(email: string, id: string) {
    const patient = await patientRepository.findByEmail(email)
    if (patient && patient.id !== id) {
        throw duplicatedEmailError()
    }
}

async function validateExists(id: string) {
    const patient = await patientRepository.findById(id)
    if (!patient) {
        throw patientNotExistsError()
    }
}

const patientService = {
    createPatient,          // C
    listAllPatients,        // R
    getPatientCount,
    detailPatient,
    update,                 // U
    disable                 // D
}

export default patientService
import {prisma} from "../config/database.js";
import {Patient, Prisma} from "@prisma/client";

async function create(data: Prisma.PatientUncheckedCreateInput) {
    return prisma.patient.create({
        data
    })
}

async function listAll(): Promise<Patient[]> {
    return prisma.patient.findMany();
}

async function findByEmail(email: string) {
    return prisma.patient.findUnique({
        where: {
            email
        }
    });
}

const patientRepository = {
    create,
    listAll,
    findByEmail,
}

export default patientRepository
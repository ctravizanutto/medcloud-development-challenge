import {prisma} from "../config/database.js";
import {Prisma} from "@prisma/client";

async function create(data: Prisma.PatientUncheckedCreateInput) {
    return prisma.patient.create({
        data
    })
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
    findByEmail,
}

export default patientRepository
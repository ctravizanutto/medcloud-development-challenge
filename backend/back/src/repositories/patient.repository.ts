import {prisma} from "../config/database.js";
import {Patient, Prisma} from "@prisma/client";
import PatientUncheckedUpdateInput = Prisma.PatientUncheckedUpdateInput;

const include = {
    updatedAt: false,
    createdAt: false,
    deleted: false,
    address: {
        include: {
            patientId: false,
            updatedAt: false,
            createdAt: false,
        }
    }
}

async function create(data: Prisma.PatientUncheckedCreateInput) {
    return prisma.patient.create({
        data,
        // @ts-ignore
        include
    })
}

async function listAll(pageNumber: number, limit: number): Promise<Patient[]> {
    return prisma.patient.findMany({
        skip: pageNumber * limit,
        take: limit,
        // @ts-ignore
        include,
        where: {
            deleted: false
        }
    })
}

async function count(): Promise<number> {
    return prisma.patient.count({
        where: {
            deleted: false
        }
    })
}

async function findById(id: string): Promise<Patient> {
    return prisma.patient.findUnique({
        where: {
            id,
            deleted: false
        },
        // @ts-ignore
        include
    })
}

async function findByEmail(email: string): Promise<Patient> {
    return prisma.patient.findUnique({
        where: {
            email,
            deleted: false
        },
    });
}

async function update(id: string, data: PatientUncheckedUpdateInput): Promise<Patient> {
    return prisma.patient.update({
        where: {
            id,
            deleted: false
        },
        data
    })
}

async function disable(id: string) {
    return prisma.patient.update({
        where: {
            id,
            deleted: false
        },
        data: {
            deleted: true
        }
    })
}

const patientRepository = {
    create,
    listAll,
    count,
    findById,
    findByEmail,
    update,
    disable
}

export default patientRepository
import {Request, Response} from "express";
import httpStatus from "http-status";
import patientService from "../services/patient.service.js";
import {Patient} from "@prisma/client";

export async function createPatient(req: Request, res: Response) {
    try {
        const patient = await patientService.createPatient({...req.body})
        return res.status(httpStatus.CREATED).json(patient)
    } catch (e) {
        return res.status(httpStatus.BAD_REQUEST).send(e.message)

    }
}

export async function listAllPatients(req: Request, res: Response) {
    const page = +req.query.page || 0
    const limit = +req.query.limit || 10

    const patients = await patientService.listAllPatients(page, limit)
    return res.json({
        page: page,
        totalPages: await totalPages(limit),
        patients
    }).status(httpStatus.OK)
}

async function totalPages(limit: number): Promise<number> {
    const total = await patientService.getPatientCount()

    return Math.ceil(total / limit)
}

export async function detailPatient(req: Request, res: Response) {
    const patientId = req.params.patientId;
    if (!patientId) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    let patient: Patient
    try {
        patient = await patientService.detailPatient(patientId)
        if (!patient) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return res.status(httpStatus.BAD_REQUEST).send(e.message)
    }

    return res.status(httpStatus.OK).json(patient)
}

/*
* Only updates patient email or/and address
*/
export async function updatePatient(req: Request, res: Response) {
    const patientId = req.params.patientId;
    if (!patientId) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    const params = {...req.body}

    try {
        const patient = patientService.update(patientId, params)
        return res.json(patient).status(httpStatus.ACCEPTED)
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).send(e.message)
    }
}

export async function deletePatient(req: Request, res: Response) {
    const patientId = req.params.patientId;
    if (!patientId) {
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try {
        await patientService.disable(patientId)
        return res.sendStatus(httpStatus.OK)
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).send(e.message)
    }
}
import {Request, Response} from "express";
import httpStatus from "http-status";
import patientService from "../services/patient.service.js";
import patientRepository from "../repositories/patient.repository.js";

export async function listAllPatients(req: Request, res: Response) {
    const patients = await patientRepository.listAll()
    return res.json(patients)
}

export async function createPatient(req: Request, res: Response) {
    try {
        const patient = await patientService.createPatient({...req.body})
        return res.status(httpStatus.CREATED).json(patient)
    } catch (e) {
        return res.send(e.message).status(httpStatus.BAD_REQUEST)

    }
}
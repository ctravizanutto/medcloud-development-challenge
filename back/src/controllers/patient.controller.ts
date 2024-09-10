import {Request, Response} from "express";
import httpStatus from "http-status";
import patientService from "../services/patient.service.js";

export async function listPatient(req: Request, res: Response) {

}

export async function createPatient(req: Request, res: Response) {
    try {
        await patientService.createPatient({...req.body})
        return res.sendStatus(httpStatus.CREATED)
    } catch (e) {
        return res.send(e.message).status(httpStatus.BAD_REQUEST)

    }
}
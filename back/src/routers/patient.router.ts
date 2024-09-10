import {Router} from "express";
import {createPatient, listAllPatients} from "../controllers/patient.controller.js";
import {validateBody} from "../middlewares/validation.middleware.js";
import {createPatientSchema} from "../schemas/patient.schema.js";

const patientRouter = Router()

patientRouter
    .post("/", validateBody(createPatientSchema), createPatient)
    .get("/", listAllPatients)

export {patientRouter}
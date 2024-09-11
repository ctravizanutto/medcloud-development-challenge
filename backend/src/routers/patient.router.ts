import {Router} from "express";
import {validateBody} from "../middlewares/validation.middleware.js";
import {createPatientSchema, patientSchema} from "../schemas/patient.schema.js";
import {
    createPatient,
    deletePatient,
    detailPatient,
    listAllPatients,
    updatePatient
} from "../controllers/patient.controller.js";

const patientRouter = Router()

patientRouter
    .post("/", validateBody(createPatientSchema), createPatient)            // C
    .get("/", listAllPatients)                                              // R
    .get("/:patientId", detailPatient)
    .put("/:patientId", updatePatient)                                      // U
    .delete("/:patientId", validateBody(patientSchema), deletePatient)      // D

export {patientRouter}
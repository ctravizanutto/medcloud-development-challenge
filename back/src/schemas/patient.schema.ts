import Joi from "joi";
import {CreatePatientParams} from "../services/patient.service.js";
import {addressSchema} from "./address.schema.js";


export const createPatientSchema = Joi.object<CreatePatientParams>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    birthday: Joi.string().isoDate().required(),
    address: addressSchema.required()
})
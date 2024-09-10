import Joi from "joi";
import {getStates, isValidCEP} from "@brazilian-utils/brazilian-utils";

const cepValidationSchema = Joi.string().length(9).custom(JoiCepValidation).required();
export const addressSchema = Joi.object({
    cep: cepValidationSchema,
    street: Joi.string().required(),
    city: Joi.string().required(),
    number: Joi.string().required(),
    state: Joi.string()
        .length(2)
        .valid(...getStates().map((s) => s.code))
        .required(),
    neighborhood: Joi.string().required(),
    addressDetail: Joi.string().allow(null, ""),
})

function JoiCepValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;

    if (!isValidCEP(value)) {
        return helpers.error("any.invalid");
    }

    return value;
}
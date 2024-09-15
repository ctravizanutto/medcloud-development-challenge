import { describe, it, expect, vi } from "vitest";
import { createPatient, listAllPatients, detailPatient, updatePatient, deletePatient } from "../src/controllers/patient.controller.js";
import httpStatus from "http-status";
import patientService from "../src/services/patient.service.js";

// Mock patientService methods
const mockCreatePatient = vi.spyOn(patientService, "createPatient");
const mockListAllPatients = vi.spyOn(patientService, "listAllPatients");
const mockDetailPatient = vi.spyOn(patientService, "detailPatient");
const mockUpdatePatient = vi.spyOn(patientService, "update");
const mockDisablePatient = vi.spyOn(patientService, "disable");
const mockGetPatientCount = vi.spyOn(patientService, "getPatientCount");

describe("Patient Controller", () => {

    describe("createPatient", () => {
        it("should create a patient and return 201 status", async () => {
            const req = {
                body: {
                    name: "name",
                    email: "cainantravizanutto@gmail.com",
                    birthday: "2022-09-27 18:00:00.000",
                    address: {
                        cep: "14091-150",
                        street: "R Marisa",
                        city: "Ribeirão Preto",
                        number: "422",
                        neighborhood: "Jd. Macedo",
                        state: "SP",
                    },
                },
            };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
                send: vi.fn(),
            };

            const patient = { id: 1, ...req.body };
            // @ts-ignore
            mockCreatePatient.mockResolvedValue(patient);

            await createPatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith(patient);
        });

        it("should return 400 if there is an error", async () => {
            const req = { body: {} };
            const res = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn(),
            };

            mockCreatePatient.mockRejectedValue(new Error("Invalid data"));

            await createPatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith("Invalid data");
        });
    });

    describe("listAllPatients", () => {
        it("should return a list of patients with pagination info", async () => {
            const req = { query: { page: "1", limit: "10" } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };

            const patients = [{ id: 1, name: "John Doe" }];
            // @ts-ignore
            mockListAllPatients.mockResolvedValue(patients);
            mockGetPatientCount.mockResolvedValue(20);

            await listAllPatients(req as any, res as any);

            expect(res.json).toHaveBeenCalledWith({
                page: 1,
                totalPages: 2,
                patients,
            });
            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
        });
    });

    describe("detailPatient", () => {
        it("should return a patient's details", async () => {
            const req = { params: { patientId: "1" } };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
                sendStatus: vi.fn(),
                send: vi.fn(),
            };

            const patient = { id: 1, name: "John Doe" };
            // @ts-ignore
            mockDetailPatient.mockResolvedValue(patient);

            await detailPatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
            expect(res.json).toHaveBeenCalledWith(patient);
        });

        it("should return 404 if the patient is not found", async () => {
            const req = { params: { patientId: "1" } };
            const res = {
                sendStatus: vi.fn(),
            };

            mockDetailPatient.mockResolvedValue(null);

            await detailPatient(req as any, res as any);

            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.NOT_FOUND);
        });
    });

    describe("updatePatient", () => {
        it("should update patient data and return 202 status", async () => {
            const req = {
                params: { patientId: "1" },
                body: { email: "newemail@example.com" },
            };
            const res = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn(),
            };

            const updatedPatient = { id: 1, email: "newemail@example.com" };
            // @ts-ignore
            mockUpdatePatient.mockResolvedValue(updatedPatient);

            await updatePatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.ACCEPTED);
            expect(res.json).toHaveBeenCalledWith(updatedPatient);
        });

        it("should return 400 if update fails", async () => {
            const req = {
                params: { patientId: "1" },
                body: {},
            };
            const res = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn(),
            };

            mockUpdatePatient.mockRejectedValue(new Error("Update failed"));

            await updatePatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith("Update failed");
        });
    });

    describe("deletePatient", () => {
        it("should disable a patient and return 200 status", async () => {
            const req = { params: { patientId: "1" } };
            const res = {
                sendStatus: vi.fn(),
            };

            // @ts-ignore
            mockDisablePatient.mockResolvedValue();

            await deletePatient(req as any, res as any);

            expect(res.sendStatus).toHaveBeenCalledWith(httpStatus.OK);
        });

        it("should return 400 if deletion fails", async () => {
            const req = { params: { patientId: "1" } };
            const res = {
                status: vi.fn().mockReturnThis(),
                send: vi.fn(),
            };

            mockDisablePatient.mockRejectedValue(new Error("Deletion failed"));

            await deletePatient(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
            expect(res.send).toHaveBeenCalledWith("Deletion failed");
        });
    });
});

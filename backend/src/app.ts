import express, {Express} from "express"
import {patientRouter} from "./routers/patient.router.js";
import cors from "cors";
import {connectDB} from "./config/database.js";

const app = express()

app
    .use(cors())
    .use(express.json())
    .use("/", patientRouter)

export function init(): Promise<Express> {
    connectDB()
    return Promise.resolve(app)
}

export default app

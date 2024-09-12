import * as axios from "axios";

export const http = axios.default.create({
    baseURL: 'http://localhost:8080/patient'
})
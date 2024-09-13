import * as axios from "axios";

export const http = axios.default.create({
    baseURL: 'http://localhost:8080/patient/'
})

export const viaCep = axios.default.create({
    baseURL: 'https://viacep.com.br/ws/'
})
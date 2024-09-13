import * as axios from "axios";

export const http = axios.default.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export const viaCep = axios.default.create({
    baseURL: 'https://viacep.com.br/ws/'
})
import axios from "axios";
// require('dotenv').config()
// import { getEnvVariables } from "../helpers";

// const {VITE_API_URL} = getEnvVariables()

const nutricionApi = axios.create({
    baseURL: process.env.VITE_API_URL
});

//CONFIGURAR INTERCEPTORES
nutricionApi.interceptors.request.use(config=>{
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config
})


export default nutricionApi;